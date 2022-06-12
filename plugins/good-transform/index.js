const Materials = require('../../GenshinData/ExcelBinOutput/MaterialExcelConfigData.json')
const Weapons = require('../../GenshinData/ExcelBinOutput/WeaponExcelConfigData.json')
const EqAffix = require('../../GenshinData/ExcelBinOutput/EquipAffixExcelConfigData.json')
const Rel = require('../../GenshinData/ExcelBinOutput/ReliquaryExcelConfigData.json')
const RelSet = require('../../GenshinData/ExcelBinOutput/ReliquarySetExcelConfigData.json')
const RelMP = require('../../GenshinData/ExcelBinOutput/ReliquaryMainPropExcelConfigData.json')
const RelAffix = require('../../GenshinData/ExcelBinOutput/ReliquaryAffixExcelConfigData.json')
const ManualText = require('../../GenshinData/ExcelBinOutput/ManualTextMapConfigData.json')
const TextMap = require('../../GenshinData/TextMap/TextMapCHS.json')
const fs = require('fs')

ManualTextMap = {};
ManualText.forEach(text => {
	ManualTextMap[text.TextMapId] = text.TextMapContentTextMapHash;
})

const FRZ = {
	goodize: (string) => {
		function toTitleCase(str) {
			return str.replace(/-/g, ' ').replace(
				/\w\S*/g,
				function (txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				}
			);
		}
		return toTitleCase(string || '').replace(/[^A-Za-z]/g, '');
	},
	rels: {
		EQUIP_BRACER: '花',
		EQUIP_NECKLACE: '羽毛',
		EQUIP_SHOES: '沙漏',
		EQUIP_RING: '杯',
		EQUIP_DRESS: '头'
	},
	stats: {
		FIGHT_PROP_HP: '小生',
		FIGHT_PROP_HP_PERCENT: '大生',
		FIGHT_PROP_ATTACK: '小攻击',
		FIGHT_PROP_ATTACK_PERCENT: '大攻击',
		FIGHT_PROP_DEFENSE: '小防',
		FIGHT_PROP_DEFENSE_PERCENT: '大防',
		FIGHT_PROP_CHARGE_EFFICIENCY: '充能',
		FIGHT_PROP_ELEMENT_MASTERY: '精通',
		FIGHT_PROP_CRITICAL: '暴击',
		FIGHT_PROP_CRITICAL_HURT: '暴伤',
		FIGHT_PROP_HEAL_ADD: '治疗',
		FIGHT_PROP_FIRE_ADD_HURT: '火伤',
		FIGHT_PROP_ELEC_ADD_HURT: '雷伤',
		FIGHT_PROP_ICE_ADD_HURT: '冰伤',
		FIGHT_PROP_WATER_ADD_HURT: '水伤',
		FIGHT_PROP_WIND_ADD_HURT: '风伤',
		FIGHT_PROP_ROCK_ADD_HURT: '岩伤',
		FIGHT_PROP_GRASS_ADD_HURT: '草伤',
		FIGHT_PROP_PHYSICAL_ADD_HURT: '物伤'
	},
	rarities: { 1: 1, 5: 2, 13: 3, 17: 4, 21: 5 }
}


const G = {
	Items: {},
	EqAffix: {},
	RelSet: {},
	RelMP: {},
	RelAffix: {},
};

Materials.forEach((b) => {
	let a = G.Items[b.Id] = {};
	if (b.NameTextMapHash) {
		a.Name = TextMap[b.NameTextMapHash]
	}
	if (b.Icon) a.Icon = b.Icon;
	if (b.ParamList) a.ParamList = b.ParamList;
	if (b.PropType) {
		a.Name = TextMap[ManualTextMap[b.PropType]]
		a.PropType = b.PropType;
	}
	if (b.PropValue) a.PropValue = b.PropValue;
	if (b.DepotId) a.DepotId = b.DepotId;
	if (b.ItemType) a.ItemType = b.ItemType;
	if (b.SetId) a.SetId = b.SetId;
	if (b.EquipAffixId) a.EquipAffixId = b.EquipAffixId;
});
Weapons.forEach((b) => {
	let a = G.Items[b.Id] = {};
	if (b.NameTextMapHash) {
		a.Name = TextMap[b.NameTextMapHash]
	}
	if (b.Icon) a.Icon = b.Icon;
	if (b.ParamList) a.ParamList = b.ParamList;
});
Rel.forEach((b) => {
	let a = G.Items[b.Id] = {};
	if (b.NameTextMapHash) {
		a.Name = TextMap[b.NameTextMapHash]
	}
	if (b.Icon) a.Icon = b.Icon;
	if (b.ParamList) a.ParamList = b.ParamList;
	if (b.ItemType) a.ItemType = b.ItemType;
	if (b.EquipType) a.EquipType = b.EquipType;
	if (b.SetId) a.SetId = b.SetId;
	if (b.MaxLevel) a.MaxLevel = b.MaxLevel;
});
EqAffix.forEach((b) => {
	let a = G.EqAffix[b.Id] = {};
	if (b.NameTextMapHash) {
		a.Name = TextMap[b.NameTextMapHash]
	}
	if (b.ParamList) a.ParamList = b.ParamList;
	if (b.AffixId) a.AffixId = b.AffixId;
});
RelSet.forEach((b) => {
	let a = G.RelSet[b.SetId] = {};
	if (b.NameTextMapHash) {
		a.Name = TextMap[b.NameTextMapHash]
	}
	if (b.SetIcon) a.Icon = b.SetIcon;
	if (b.EquipAffixId) a.EquipAffixId = b.EquipAffixId;
});
RelMP.forEach((b) => {
	let a = G.RelMP[b.Id] = {};
	if (b.PropType) {
		a.Name = TextMap[ManualTextMap[b.PropType]]
		a.PropType = b.PropType;
	}
});
RelAffix.forEach((b) => {
	let a = G.RelAffix[b.Id] = {};
	if (b.DepotId) a.DepotId = b.DepotId;
	if (b.PropType) {
		a.Name = TextMap[ManualTextMap[b.PropType]]
		a.PropType = b.PropType;
	}
	if (b.PropValue) a.PropValue = b.PropValue;
});

function Pinyin(key) {
	if (key.indexOf('暴伤') != -1) return 'B'
	if (key.indexOf('伤') != -1) return 'y'
	if (key.indexOf('治') != -1) return 'z'
	if (key.indexOf('充能') != -1) return 'c'
	if (key.indexOf('精通') != -1) return 'j'
	if (key.indexOf('暴击') != -1) return 'b'
	let word;
	if (key.indexOf('攻') != -1) {
		word = 'g'
	}
	if (key.indexOf('生') != -1) {
		word = 's'
	}
	if (key.indexOf('防') != -1) {
		word = 'f'
	}

	if (key.indexOf('大') != -1) word = word.toUpperCase()
	return word
}

function getEnhanceStrength(prop){
	let prefix = (prop + '').slice(0, prop.length - 1);
	let maxIndex = 1;
	let curIndex = parseInt((prop + '').slice(prop.length - 1, prop.length));
	if (G.RelAffix[prefix + '2']) maxIndex = 2
	if (G.RelAffix[prefix + '3']) maxIndex = 3
	if (G.RelAffix[prefix + '4']) maxIndex = 4
	return maxIndex - curIndex + 1
}

function recordArtifactEnhance(upgrade, artifact, result){
	let remark = ''
	const stats = artifact.substats.length >= 1 ? artifact.substats.map(s => Pinyin(s.key)).reduce((a, b) => a + b) + ' ' : ''
	if (artifact.rarity == 4) {
		if (stats.indexOf('b') != -1 && stats.indexOf('B') != -1) remark = ' 【双暴】';
		else if (result.key.indexOf('暴') != -1 && (stats.indexOf('b') != -1 || stats.indexOf('B') != -1)) remark = ' 【补暴】';
	}
	const log = `${upgrade.powerUpRate == 1 ? '' : ('x' + upgrade.powerUpRate + ' ')}${Pinyin(artifact.mainStatKey)} ${stats}${result.value}${Pinyin(result.key)} ${result.strength}${remark}`;
	console.log(log)

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	fs.appendFileSync(`强化记录 ${yyyy}${mm}${dd}.txt`, log + "\r\n")
}

let artifacts = []
let guid;

module.exports = {
	ReliquaryUpgradeReq(req) {
		guid = req.targetReliquaryGuid.toString();
	},
	ReliquaryUpgradeRsp(upgrade) {
		const GOOD = {
			format: "GOOD",
			version: 1,
			source: "Iridium",
		}
		if (!upgrade.curAppendPropList || !upgrade.curAppendPropList.length) return
		const curAppendPropList = upgrade.curAppendPropList
		const oldAppendPropList = upgrade.oldAppendPropList || []
		if (curAppendPropList.length == oldAppendPropList.length)
			return
		let newAppendPropList = []

		for (let index = oldAppendPropList.length; index < curAppendPropList.length; index++) {
			const prop = curAppendPropList[index] + '';
			let key = FRZ.stats[G.RelAffix[prop].PropType];
			let value = G.RelAffix[prop].PropValue;
			if (value < 1 && value > 0)
				value = Math.round((value * 100 + Number.EPSILON + 0.0001) * 10) / 10;
			else
				value = Math.round(value).toFixed(0);

			var result = { key: key, value: value, prop: prop, strength: getEnhanceStrength(prop) };
			newAppendPropList.push(result);

			var artifact = artifacts.find(a => a.guid == guid);
			if (artifact) {
				recordArtifactEnhance(upgrade, artifact, result)
				if (!artifact.substats.find(s => s.key == result.key))
					artifact.substats.push(result)
			}
		}
		GOOD.newAppendPropList = newAppendPropList;

		return GOOD;
	},
	PlayerStoreNotify(store) {
		const Store = store;
		const GOOD = {
			format: "GOOD",
			version: 1,
			source: "Iridium",
		}
		GOOD.artifacts = Store.itemList.map(item => {
			let reference = G.Items[item.itemId];
			if (!reference) {
				item.NOTFOUND = true;
				return;
			}
			item.Name = reference.Name;
			let g = {};
			try {
				g.itemId = item.itemId
				g.guid = item.guid.toString()
				g.name = item.Name
				g.slotKey = FRZ.rels[reference.EquipType]
				if (!g.slotKey) return
				g.level = item.equip.reliquary.level - 1;
				g.rarity = FRZ.rarities[reference.MaxLevel];
				g.mainStatKey = FRZ.stats[G.RelMP[item.equip.reliquary.mainPropId].PropType];
				if (item.equip.reliquary.appendPropIdList) {
					let substats = new Map();
					item.equip.reliquary.appendPropIdList.forEach(prop => {
						let key = FRZ.stats[G.RelAffix[prop].PropType];
						if (substats.has(key))
							substats.set(key, substats.get(key) + G.RelAffix[prop].PropValue)
						else
							substats.set(key, G.RelAffix[prop].PropValue)
					})
					g.substats = Array.from(substats, ([key, value]) => {
						if (value < 1 && value > 0)
							value = Math.round((value * 100 + Number.EPSILON + 0.0001) * 10) / 10;
						else
							value = +Math.round(value).toFixed(1);

						return { key: key, value: value }
					});
				}
				g.setKey = G.EqAffix[G.RelSet[reference.SetId].EquipAffixId].Name
			} catch (e) { }
			return g;
		}).filter(_ => _).sort(g => g.rarity * -1)
		artifacts = GOOD.artifacts
		return GOOD;
	}
}