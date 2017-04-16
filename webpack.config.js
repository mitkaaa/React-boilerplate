'use strict'
const path = require('path')
const webpack = require('webpack')
const babelRc = require('./.babelrc.json')
const babelOptions = Object.assign({ babelrc: true, cacheDirectory: true }, babelRc)
process.traceDeprecation = true

module.exports = (config) => {
    return ({
        entry: process.env.NODE_ENV === 'production' ?
            path.join(process.cwd(), config.clientPath, 'index.jsx') :
        [
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(process.cwd(), config.clientPath, 'index.jsx')
        ],
        output: {
            // path: path.join(process.cwd(), config.targetPath),
            filename: 'js/[name].js',
            chunkFilename : 'js/[name]-[id].js'
        },
        resolve: {
            extensions: ['.jsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: babelOptions
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
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEBUG: process.env.NODE_ENV === 'production',
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),
            new webpack.NoEmitOnErrorsPlugin()
            // new webpack.DllReferencePlugin({
            //     context: '.',
            //     manifest: require(path.join(process.cwd(), './target/vendor/vendor-manifest.json')),
            // })
        ],
        devtool: process.env.NODE_ENV === 'production' ? void 0 : 'eval',
        stats: 'normal'
    })
}
