const path = require('path')
const Router = require('react-router')
const config = require('../configuration')
const routes = require(path.join(process.cwd(), config.PATH.APPFRONT, 'route.jsx'))

const development = 'development'

module.exports = (req, res) => {
    const location = req.url
    Router.match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error || !(error || redirectLocation || renderProps)) {
            res.status(500).send(error)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            return res.status(200).render('index', {
                production: process.env.NODE_ENV !== development,
                dev: process.env.NODE_ENV === development ? 'http://localhost:' + config.PORTWEBPACKDEVSERVER : ''
            })
        }
    })
}
