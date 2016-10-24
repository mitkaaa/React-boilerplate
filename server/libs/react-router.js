const config = require('../../config.js')

const path = require('path')
const Router = require('react-router')
const routes = require(path.join(config.PATH.FRONTSIDE, 'route.jsx')).default[0]

module.exports = (req, res) => {
    const location = req.url
    Router.match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error || !(error || redirectLocation || renderProps)) {
            res.status(500).send(error)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            return res.status(200).render('index', {
                production: process.env.NODE_ENV === 'production',
                dev: process.env.NODE_ENV !== 'production' ? 'http://localhost:' + config.portWebpackDevServer : ''
            })
        }
    })
}
