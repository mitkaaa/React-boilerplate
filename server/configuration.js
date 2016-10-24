const fs = require('fs')
const path = require('path')
const configuration = (config = 'config.json') => {
    const configPath = path.join(process.cwd(), config)
    return Object.assign({},
        require(path.join(__dirname, config)),
        fs.existsSync(configPath) ? require(configPath) : {}
    )
}

module.exports = configuration
