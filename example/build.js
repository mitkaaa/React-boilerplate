const reactBasis = require('../')

module.exports = reactBasis({
    clientPath: '',
    serverPath: '',
    targetPath: '',
    templatePath: '',
    port: '',

    // webpackConfig: require('weback.config'),
    // dangerouslyUpdateWebpackConfig: (cw, env) => ({
    //     entry: './client/main.jsx'
    // }),

    // expressRoute: require('./server'),
    // TODO:
    // 1. Изморфоное приложение
    // 2. Роуты из реакт-роутера
    // 3. Рендеринг реакт компонентов на сервере

})
