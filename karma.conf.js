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
            process.cwd() + '/**/tests/*.spec.js'
        ],

        preprocessors: {
            [process.cwd() + './**/tests/*.spec.js']: ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-jasmine-diff-reporter'
        ],
        //
        // junitReporter: {
        //     suite: 'suiteName',
        //     outputDir: 'reports/tests'
        // },
        coverageReporter: {
            dir: CONFIG.PATH.STATIC + '/coverage',
            reporters: [
                {
                    type: 'lcov',
                    file: 'lcov.info'
                },
                { type: 'html', subdir: 'report-html' }
            ]
        },
        reporters: ['progress', 'coverage']
    })
}
