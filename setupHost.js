const fs = require("fs")

const conf = {
	isOversea: false
};
conf.dispatchUrl = `dispatch${conf.isOversea ? "os" : "cn"}global.yuanshen.com`;
let hostsContent = undefined

const setupHost = (restore = false) => {
    if (restore && hostsContent === undefined) return
    const path = `${process.env.windir}\\System32\\drivers\\etc\\hosts`
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "")
    }
    fs.chmodSync(path, 0o777)
    if (restore) {
        fs.writeFileSync(path, hostsContent)
    } else {
        hostsContent = fs.readFileSync(path, "utf-8")
        const requireHosts = new Map()
        requireHosts.set(conf.dispatchUrl, "127.0.0.1")
        requireHosts.set("cngfdispatch.yuanshen.com", "127.0.0.1")
        const currentHosts = new Map()
        hostsContent.split("\n").map(l => l.trim()).filter(l => !l.startsWith("#") && l.length > 0).forEach(value => {
            const pair = value.trim().split(" ").filter(v => v.trim().length !== 0)
            currentHosts.set(pair[1], pair[0])
        })
        requireHosts.forEach((value, key) => {
            if (currentHosts.has(key)) {
                if (currentHosts.get(key) === value) {
                    requireHosts.delete(key)
                } else {
                    currentHosts.delete(key)
                }
            }
        })
        requireHosts.forEach((ip, host) => {
            currentHosts.set(host, ip)
        })
        const newContent = Array.from(currentHosts.entries()).map(pair => {
            return `${pair[1]} ${pair[0]}`
        }).join("\n")
        fs.writeFileSync(path, newContent)
    }
    process.on("exit", () => {
        fs.writeFileSync(path, hostsContent)
    })
}

module.exports = setupHost;