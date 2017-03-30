'use strict'
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        vendor: [path.join(process.cwd(), './example/client/vendor/index.js')],
    },
    output: {
        path: path.join(process.cwd(), './target'),
        filename: 'vendor/vendor.js',
        library: 'vendor_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendor_lib',
            path: path.join(process.cwd(), './target/vendor/vendor-manifest.json'),
        })
    ]
}
