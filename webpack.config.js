'use strict'
const path = require('path')

module.exports = (config) => {
    return ({
        entry: path.join(process.cwd(), config.clientPath, 'index.jsx'),
        output: {
            // path: path.join(process.cwd(), config.targetPath),
            filename: 'js/[name].js',
            chunkFilename : 'js/[name]-[id].js'
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
        // plugins: [new webpack.DllReferencePlugin({
        //     context: '.',
        //     manifest: require(path.join(process.cwd(), './target/vendor/vendor-manifest.json')),
        // })],
        devtool: void 0,// 'eval',
        stats: 'normal'
    })
}
