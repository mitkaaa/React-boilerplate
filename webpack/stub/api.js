/* eslint-disable */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const p = require('../../server/configuration')

module.exports = function (req, res) {
    const file = path.join(process.cwd(), p.PATH.STUB, 'api', req.path.replace(/^\/api\//g, '') + '.json')
    fs.readFile(file, 'utf8', function (err, file) {
      if (err) {
        return res.status(404).json({
          status: 3,
          errors: [{
            id: 'no.file.found',
            title: 'no file found at `' + path + '`'
          }],
          _debug: err.message
        })
      }

      const params = Object.assign({}, req.query, req.body)

      try {
          res.set('Content-Type', 'application/json')
          res.send(ejs.render(file, params))
      } catch (e) {
          res.status(500).json({
              status: 3,
              errors: [{
                  id: 'internal.error',
                  title: e.message
              }]
          })
      }
	})
}
