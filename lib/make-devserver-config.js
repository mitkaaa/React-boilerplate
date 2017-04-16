const { merge } = require('lodash')

module.exports = ({ port, devServer, serverPath, targetPath }) => merge({
    port,
    stats: {
        chunks: false,
        colors: true
    },
    hot: true,
    historyApiFallback: true,
}, devServer)
