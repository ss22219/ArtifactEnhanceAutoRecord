const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {
	forceDNS
} = require("../util/forceDNS");
const log = new(require("../util/log"))('Dispatch', 'yellowBright');
let servers = [];

let requestListener = async function(req, res) {
	var url = new URL(req.url, `http${req.connection.localPort == 443 ? 's' : ''}://${req.headers.host}`).href;
	if (req.url != "/perf/dataUpload")
		log.log("URL", url);
	try {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		if(req.url.startsWith('/query_cur_region')){
			require('../www/query_cur_region').execute(req, res)
		}else if (req.url.startsWith('/query_region_list')){
			require('../www/query_region_list').execute(req, res)
		}
		else{
			res.end(await forceDNS(url));
		}
	} catch (e) {
		if(e) console.error(e)
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.end('');
	}
}
const httpsOptions = {
	key: fs.readFileSync("./cert/ys.key"),
	cert: fs.readFileSync("./cert/ys.crt")
};
module.exports = {
	execute() {
		servers.push(http.createServer(requestListener).listen(80, () => {
			log.start('HTTP:', 'localhost:80')
		}))
		servers.push(https.createServer(httpsOptions, requestListener).listen(443, () => {
			log.start('HTTPS:', 'localhost:443')
		}));
	},
	stop() {
		servers.forEach(server => server.close());
	}
}