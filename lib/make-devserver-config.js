const { merge } = require('lodash')

module.exports = ({ devServer, serverPath, targetPath }) => merge({
    contentBase: targetPath,
    stats: {
        chunks: false,
        colors: true
    },
    hot: true,
    historyApiFallback: true,
    // setup: require(serverPath)
}, devServer)
