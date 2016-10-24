/* eslint-disable */

'use strict'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const webServerPort = 4242

const moduleConfigUtil = require('./utils/module-config.js')

const postcss = {
    nested: require('postcss-nested'),
    autoprefixer: require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 9']
    }),
    palette: require('postcss-palette')({
        palette: require('../src/js/config/palette.js')
    }),
    vars: require('postcss-simple-vars')({
        variables: require('../src/js/config/vars.js')
    }),
    for: require('postcss-for')
}

module.exports = function (profile, applications) {
    if (!applications) {
        throw new Error('You should specify at least one application')
    }

    const config = {
        context: path.join(__dirname, '../src'),
        entry: {
            vendor: [
                'axios',
                'classnames',
                'history',
                'moment',
                'raphael/raphael',
                'react',
                'react-bootstrap',
                'react-dom',
                'react-modal',
                'react-router',
                'react-redux',
                'redux',
                'redux-thunk',
                'reselect',
                'immutable',
            ]
        },
        output: {
            path: path.join(__dirname, '../target/assets/'),
            filename: '[name].js',
            outputPath: path.join(__dirname, '../target/assets/')
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loaders: profile.processJSX
                },
                // Global styles for PFM until refactor
                {
                    test: /modules[\\\/]alf[\\\/].*\.css$/,
                    loaders: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.css$/,
                    loaders: profile.processCSS,
                    exclude: /modules[\\\/]alf[\\\/].*\.css$/
                },
                {
                    test: /\.svg$/,
                    loaders: ['svg-inline-loader?removeTags=true&removingTags[]=title&removingTags[]=desc&removeSVGTagAttrs=false']
                },
                // Usage:
                // import imageSrc from './img/image.png'
                // <img src={imageSrc} />
                {
                    test: /\.(?:jpg|png|gif)$/,
                    loaders: ['file-loader?name=img/[name]--[hash:base64:5].[ext]']
                }
            ]
        },
        resolve: {
            modulesDirectories: ['node_modules', 'sbtsbol-frontend-core/components', 'sbtsbol-frontend-core/redux-common', 'core_modules'],
            extensions: ['', '.jsx', '.js'],
            alias: {
                app: path.resolve(__dirname, '../src/js/application.js'),
                images: path.resolve(__dirname, '../src/images/')
            }
        },
        postcss: function () {
            return {
                defaults: [
                    postcss.for,
                    postcss.palette,
                    postcss.vars,
                    postcss.nested,
                    postcss.autoprefixer
                ]
            }
        },
        node: {
            fs: 'empty'
        },

        externals: [
            { './cptable': 'var cptable' },
            { './jszip': 'jszip' }
        ],
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru|en-gb)$/),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),

            new CopyWebpackPlugin([
                { from: 'images/favicon.ico' },
                { from: 'images/', to: 'images', ignore: 'favicon.ico' },

                { from: '../node_modules/flexibility/dist/flexibility.js', to: 'utils' },
                { from: '../node_modules/es5-shim/es5-shim.min.js', to: 'utils' },
                { from: '../node_modules/es5-shim/es5-sham.min.js', to: 'utils' },
                { from: '../node_modules/bluebird/js/browser/bluebird.min.js', to: 'utils' },

                { from: 'js/compatibility.js' },

                { from: 'js/utils', to: 'utils' },
                { from: 'fonts', to: 'fonts' }
            ]),

            new webpack.DefinePlugin({
                DEBUG: profile.DEBUG,
                'process.env': JSON.stringify(profile.env)
            })
        ]
    }

    moduleConfigUtil(config, applications, path.resolve(__dirname, '..'))

    switch (profile.id) {
        case 'development': {
            config.output.publicPath = `http://localhost:${webServerPort}/`
            config.watch = true

            config.plugins = config.plugins.concat([
                new webpack.SourceMapDevToolPlugin()
            ])

            if(profile.hot) {
                config.entry.vendor = config.entry.vendor.concat([`webpack-dev-server/client?http://localhost:${webServerPort}/`, 'webpack/hot/dev-server'])
                config.plugins = config.plugins.concat([
                    // еще один компонент для того, чтобы горячая замена работала
                    new webpack.HotModuleReplacementPlugin()
                ])
            }


            config.devtool = 'eval'
            // allows to see function source when profiling inside large concated js file
            // uncomment below when profiling:
            //config.devtool = 'source-map'

            const bundler = webpack(config)

            const serverInstance = new WebpackDevServer(bundler, {
                contentBase: './target/assets/',
                stats: {
                    chunks: false,
                    colors: true
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'RSA-Token',
                    'Expires': '-1',
                    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                },
                hot: profile.hot
            })

            return serverInstance.listen(webServerPort, 'localhost', function (err) {
                if (err) {
                    throw Error(err)
                }

                console.log(`server avaliable at http://localhost:${webServerPort}/`)
            })
        }
        case 'production': {
            config.plugins = config.plugins.concat([
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false,
                        dead_code: true // eslint-disable-line camelcase
                    }
                })
            ])

            return webpack(config, function (err, stats) {
                if (err) {
                    throw new Error('Webpack', err)
                }
                console.log('Output:\n' + stats.toString({
                        chunks: false
                    }))
            })
        }
        case 'testing':
            config.devtool = 'inline-source-map' // we inline source maps for remap to use
            config.module.loaders.push({
                test: /\.json$/, loader: 'json'
            })
            config.resolve.extensions.push('.json')

            config.watch = true
            if(profile.withCoverage) {
                config.module.preLoaders = [
                    {
                        test: /\.(t|j)s(x?)$/, // .js, .ts, .tsx and .jsx
                        loader: 'isparta',
                        exclude: [/node_modules/, /tests/, /\.spec\./]
                    }
                ]
                config.isparta = {
                    embedSource: true,
                    noAutoWrap: true
                }
            }
            config.plugins.splice(1, 1) // remove common chunks optimization

            config.externals.push({ 'react/addons': true })
            config.externals.push({ 'react/lib/ExecutionEnvironment': true })
            config.externals.push({ 'react/lib/ReactContext': true })

            return config
        default: {
            return webpack(config, function (err, stats) {
                if (err) {
                    throw new Error('Webpack', err)
                }
                console.log('Output:\n' + stats.toString({
                        chunks: false
                    }))
            })
        }
    }
}
