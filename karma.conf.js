const webpackConfig = require('./webpack/testing.profile.js')
const CONFIG = require('./server/config.json')

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        port: 9876,
        colors: true,
        logLevel: 'INFO',
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        autoWatchBatchDelay: 300,

        files: [
            'example/**/tests/*.spec.js'
        ],

        preprocessors: {
            ['APP/**/*.js']: ['webpack'],
            ['APP/**/tests/*.spec.js']: ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        webpackServer: {
            noInfo: true // please don’t spam the console when running in karma!
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            // 'karma-junit-reporter',
            'karma-coverage',
            'karma-jasmine-diff-reporter'
        ],

        // junitReporter: {
        //     suite: 'suiteName',
        //     outputDir: CONFIG.PATH.STATIC + '/coverage'
        // },

        coverageReporter: {
            dir: CONFIG.PATH.STATIC + '/coverage',
            reporters: [
                {
                    type: 'lcov',
                    file: 'lcov.info',
                    subdir: './'
                },
                { type: 'html', subdir: 'report-html' }
            ]
        },
        reporters: ['progress', 'jasmine-diff', 'coverage']
    })
}
