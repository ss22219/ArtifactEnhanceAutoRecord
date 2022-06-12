let iridium = require('./index.js');
const goodTransform = require("./plugins/good-transform/index")
function processGoodTransform(packetName, packetObject){
	if(goodTransform[packetName]) {
		const good = goodTransform[packetName](packetObject);
		if(good) packetObject.goodTransform = good;
	}
}

iridium.startFrontend();
setTimeout(()=> {
	
let packetObject = require('./Bins/1654984564797_PlayerStoreNotify')
processGoodTransform("PlayerStoreNotify", packetObject)
iridium.displayPacket({
	source: 1,
	packetID: 0,
	protoName: 'PlayerStoreNotify',
	object: packetObject
})

packetObject = {
	"targetReliquaryGuid": "922123852044117462",
	"foodReliquaryGuidList": [
		"922123852044105307",
		"922123852044089242",
		"922123852044097436"
	]
}
processGoodTransform("ReliquaryUpgradeReq", packetObject)
iridium.displayPacket({
	source: 1,
	packetID: 0,
	protoName: 'ReliquaryUpgradeReq',
	object: packetObject
})

packetObject = {
	"powerUpRate": 1,
	"oldLevel": 2,
	"curLevel": 5,
	"curAppendPropList": [
		401063
	]
}
processGoodTransform("ReliquaryUpgradeRsp", packetObject)
iridium.displayPacket({
	source: 1,
	packetID: 0,
	protoName: 'ReliquaryUpgradeRsp',
	object: packetObject
})

}, 2000)