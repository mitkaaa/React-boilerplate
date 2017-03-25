'use strict'
require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const cwd = path.resolve(process.cwd())
const { NODE_ENV, TESTING, TESTING_COVERAGE, TARGET, APPFRONT, PORT } = process.env

const isDevelopment = NODE_ENV === 'development'
const isTesting = !!TESTING
const withCoverage = !!TESTING_COVERAGE

console.log(APPFRONT)

const entry = isDevelopment && !isTesting ? [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    APPFRONT
] : APPFRONT

module.exports = {
    context: cwd,
    entry,

    output: {
        path: path.resolve(cwd, APPFRONT),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [cwd, 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(cwd, APPFRONT),
                ],
                exclude: /\.spec\.jsx?$/,
                loader: 'babel-loader',
                options: getBabelOptions((isTesting && withCoverage), targetModernBrowsers)
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            camelCase: true,
                            localIdentName: isDevelopment ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:8]'
                        }
                    },
                    'postcss-loader'
                ]
            }, {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removingTags: [ 'title', 'desc' ],
                    removeSVGTagAttrs: false
                }
            }, {
                test: /\.(?:jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name]--[hash:base64:5].[ext]'
                }
            }, {
                test: /\.spec\.jsx?$/,
                include: isTesting ?
                    [path.join(cwd, APPFRONT)] : [],
                loader: 'babel-loader',
                options: getBabelOptions(false, targetModernBrowsers)
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru|en-gb)$/),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: !isDevelopment && !withCoverage,
            options: {
                context: __dirname,
                postcss: [
                    require('postcss-for'),
                    require('postcss-simple-vars'),
                    require('postcss-custom-properties'),
                    require('postcss-nested'),
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 11']
                    })
                ]
            }
        })
    ],
    //
    //
    // (new PluginList())
    //     .add([
    //         new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru|en-gb)$/),
    //         new webpack.LoaderOptionsPlugin({
    //             debug: true,
    //             minimize: !isDevelopment && !withCoverage,
    //             options: {
    //                 context: __dirname,
    //                 postcss: [
    //                     require('postcss-for'),
    //                     require('postcss-simple-vars'),
    //                     require('postcss-custom-properties'),
    //                     require('postcss-nested'),
    //                     require('autoprefixer')({
    //                         browsers: ['last 2 versions', 'ie >= 11']
    //                     })
    //                 ]
    //             }
    //         }),
    //         new webpack.DefinePlugin({
    //             DEBUG: isDevelopment,
    //             'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    //         }),
    //     ])
    //     .if(isDevelopment,
    //         [
    //             new webpack.SourceMapDevToolPlugin(),
    //             new webpack.HotModuleReplacementPlugin(),
    //             new webpack.NamedModulesPlugin()
    //         ]
    //     )
    //     .if(libVendorVersion && isDevelopment, [
    //         DllReferencePlugin,
    //         new CopyWebpackPlugin([{
    //             from: './node_modules/sbtsbol-lib-vendor/dist/vendor.dev.js',
    //             to: 'lib.vendor/dev/index.js'
    //         }]),
    //     ])
    //     .if(libVendorVersion && !isDevelopment, DllReferencePlugin)
    //     .if(!isDevelopment && !withCoverage,
    //         new webpack.optimize.UglifyJsPlugin({
    //             sourceMap: true,
    //             compress: {
    //                 warnings: false,
    //                 dead_code: true // eslint-disable-line camelcase
    //             }
    //         })
    //     )
    //     .if(!isDevelopment, new CompressionPlugin())
    //     .list,

    devServer: {
        contentBase: TARGET,
        port: PORT,
        stats: {
            chunks: false,
            colors: true
        },
        hot: true,
        historyApiFallback: true
    },

    cache: isDevelopment,
    devtool: isDevelopment ? 'eval' : void 0,

    stats: {
        chunks: false
    }
}
