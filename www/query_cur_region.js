const protobuf = require("protobufjs");
// const mhyBUF = require("../backend/MHYbuf");
const sniffer = require('../backend/sniffer');
const frontend = require('../backend/frontend-server');
const {
	forceDNS
} = require("../util/forceDNS");
const log = new (require("../util/log"))('Dispatach', 'yellow');

async function query_cur_region_protobuffer(req) {
    const splitUrl = req.url.split("?")
    const host = splitUrl[0].split("/")[2]
    const noQueryRequest = splitUrl[1] === undefined
    const query = noQueryRequest ? "" : `?${splitUrl[1]}`
	
	log.log('Making online request to', `https://${host}/query_cur_region${query}`);
	let query_region_list = await forceDNS(`https://${host}/query_cur_region${query}`);

	const root = await protobuf.load("./data/proto/QueryCurrRegionHttpRsp.proto");
	const cur = root.lookup("QueryCurrRegionHttpRsp");
	//const queryList14 = cur.decode(Buffer.from(query_region_list, 'base64'));
	const decodedCur = cur.decode(Buffer.from(query_region_list, 'base64'));

	frontend.queuePacket({
		source: 0,
		packetID: '---',
		protoName: 'QueryCurrRegionHttpRsp',
		object: JSON.parse(JSON.stringify(decodedCur))
	})
	sniffer.updateProxyIP(decodedCur.regionInfo.gateserverIp, decodedCur.regionInfo.gateserverPort);

	decodedCur.regionInfo.gateserverIp = "127.0.0.1";
	const encoded = cur.encode(decodedCur).finish();
	return encoded;
}

module.exports = {
	async execute(req, res) {
		var ret = await query_cur_region_protobuffer(req);
		res.end(Buffer.from(ret).toString('base64'));
	}
}

