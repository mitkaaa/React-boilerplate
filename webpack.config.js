'use strict'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const { PluginList, getBabelOptions, getEntry, getVendor } = require('./utils')
const cwd = path.resolve(process.cwd())
const pkg = require(path.resolve(cwd, 'package.json'))
const pkgSbtsbol = pkg['@sbtsbol']

const { NODE_ENV, TESTING, TESTING_COVERAGE, TARGET_MODERN_BROWSERS } = process.env

const isDevelopment = NODE_ENV === 'development'
const isTesting = !!TESTING
const withCoverage = !!TESTING_COVERAGE
const targetModernBrowsers = !!TARGET_MODERN_BROWSERS

const PORT = 4242

const { libVendorVersion, libVendorManifest } = getVendor(isDevelopment)
const DllReferencePlugin = new webpack.DllReferencePlugin({
    context: '.',
    manifest: libVendorManifest
})

module.exports = {
    context: cwd,
    entry: isDevelopment && !isTesting ? [
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        pkgSbtsbol.entry
    ] : pkgSbtsbol.entry,

    output: {
        path: path.resolve(cwd, './target'),
        filename: 'index.js',
    },

    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            src: path.resolve(cwd, 'src'),
            images: path.resolve(cwd, 'images'),
            locales: path.resolve(cwd, 'locales'),
        },
        modules: [
            cwd,
            'node_modules',
            'core_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(cwd, './src'),
                    /node_modules[\\\/]sbtsbol-.*(?!([\\\/]node_modules))/
                ],
                exclude: /\.spec\.jsx?$/,
                loader: 'babel-loader',
                options: getBabelOptions((isTesting && withCoverage), targetModernBrowsers)
            },
            {
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
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removingTags: [
                        'title',
                        'desc'
                    ],
                    removeSVGTagAttrs: false
                }
            },
            // Usage:
            // import imageSrc from './img/image.png'
            // <img src={imageSrc} />
            {
                test: /\.(?:jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name]--[hash:base64:5].[ext]'
                }
            },
            {
                test: /\.spec\.jsx?$/,
                include: isTesting ?
                    [path.join(cwd, './src')] : [],
                loader: 'babel-loader',
                options: getBabelOptions(false, targetModernBrowsers)
            }
        ]
    },

    plugins: (new PluginList())
        .add([
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
                            browsers: ['last 2 versions', 'ie >= 9']
                        })
                    ]
                }
            }),
            new webpack.DefinePlugin({
                DEBUG: isDevelopment,
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
            }),
        ])
        .if(isDevelopment,
            [
                new webpack.SourceMapDevToolPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NamedModulesPlugin()
            ]
        )
        .if(libVendorVersion && isDevelopment, [
            DllReferencePlugin,
            new CopyWebpackPlugin([{
                from: './node_modules/sbtsbol-lib-vendor/dist/vendor.dev.js',
                to: 'lib.vendor/dev/index.js'
            }]),
        ])
        .if(libVendorVersion && !isDevelopment, DllReferencePlugin)
        .if(!isDevelopment && !withCoverage,
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                    dead_code: true // eslint-disable-line camelcase
                }
            })
        )
        .if(!isDevelopment, new CompressionPlugin())
        .list,

    devServer: {
        contentBase: './target',
        port: PORT,
        stats: {
            chunks: false,
            colors: true
        },
        hot: true,
        historyApiFallback: true,
        setup: require('./stub')
    },

    cache: isDevelopment,
    devtool: isDevelopment ? 'eval' : void 0,

    stats: {
        chunks: false
    },

    externals: [
        {'react/addons': true},
        {'react/lib/ExecutionEnvironment': true},
        {'react/lib/ReactContext': true}
    ]
}
