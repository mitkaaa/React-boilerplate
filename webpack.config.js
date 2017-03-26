'use strict'
const path = require('path')

module.exports = {
    entry: path.join(process.cwd(), './example/client/index.jsx'),
    output: {
        path: path.join(process.cwd(), './target'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
