'use strict'
const webpack = require('webpack')
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
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            camelCase: true,
                            localIdentName: '[path][name]--[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(path.join(process.cwd(), './target/vendor/vendor-manifest.json')),
    })],
    devtool: 'eval',
    stats: 'normal'
}
