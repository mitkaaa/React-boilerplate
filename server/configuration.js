const fs = require('fs')
const path = require('path')
let configls
const configuration = (config = 'config.json') => {
    if (configls) {
        return configls
    }
    const configPath = path.join(process.cwd(), config)
    configls = Object.assign({},
        require(path.join(__dirname, config)),
        fs.existsSync(configPath) ? require(configPath) : {}
    )
    return configls
}

module.exports = configls ? configls : configuration()
