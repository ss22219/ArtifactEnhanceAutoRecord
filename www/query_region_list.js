const protobuf = require("protobufjs");
// const mhyBUF = require("../backend/MHYbuf");
const sniffer = require('../backend/sniffer');
const frontend = require('../backend/frontend-server');
const {
	forceDNS
} = require("../util/forceDNS");
const log = new (require("../util/log"))('Dispatach', 'yellow');

async function query_cur_region_protobuffer(req) {
	let query_region_list;
	if(req.headers.host == 'localhost' || req.headers.host == '127.0.0.1') {
		log.warn('If you are using fiddler, the proxy cannot make a request to the "real" cur. You will need to provide it yourself via a cur.json file in the www/ folder.');
		query_region_list = require('./cur.json');
	}else{
		log.log('Making online request to', new URL(req.url, `https://${req.headers.host}`).href);
		query_region_list = await forceDNS(new URL(req.url, `https://${req.headers.host}`).href);
	}

	const root = await protobuf.load("./data/proto/QueryRegionListHttpRsp.proto");
	const cur = root.lookup("QueryRegionListHttpRsp");
	//const queryList14 = cur.decode(Buffer.from(query_region_list, 'base64'));
	const decodedCur = cur.decode(Buffer.from(query_region_list, 'base64'));
	decodedCur.regionList = decodedCur.regionList.map(item => {
        const host = new URL(item.dispatchUrl).host
        item.dispatchUrl = `https://localdispatch.yuanshen.com/query_cur_region/${host}`
        return item
    })
	frontend.queuePacket({
		source: 0,
		packetID: '---',
		protoName: 'QueryRegionListHttpRsp',
		object: JSON.parse(JSON.stringify(decodedCur))
	})
	const encoded = cur.encode(decodedCur).finish();
	return encoded;
}

module.exports = {
	async execute(req, res) {
		var ret = await query_cur_region_protobuffer(req);
		res.end(Buffer.from(ret).toString('base64'));
	}
}

