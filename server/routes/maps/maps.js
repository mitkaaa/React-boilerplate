import Route from '../route'
import Hashids from 'hashids'
import path from 'path'
import _ from 'lodash'

export default class Maps extends Route {

    initialize () {
        this.app.get('/', this.mapsIndexRenderGET.bind(this))
        this.app.get('/:id', this.mapsMiddle.bind(this))
        this.app.post('/:id', this.mapsFetchPOST.bind(this))
        this.app.post('/:id/markers', this.mapsMarkersCreatePOST.bind(this))
        this.app.put('/:id/markers', this.mapsMarkerUpdatePUT.bind(this))
        this.app.delete('/:id/markers', this.mapsMarkerDELETE.bind(this))

        this.app.param('id', this.getParamId.bind(this))
    }

    mapsIndexRenderGET (req, res) {
        const id = new Hashids().encode(Date.now())
        const userID = this.getUserID(req, res)

        this.models.Maps.findOrCreate({ id, userID }, () => {
            res.redirect(path.join(req.baseUrl, id))
        })
    }

    mapsFetchPOST (req, res) {
        // console.log(this);
        // this.io.on('connection', function (socket) {
        //
        // })
        // this.io.sockets.emit('news', { msg: 'ОПА' })

        res.send(req.param.Map)
    }

    mapsMarkersCreatePOST (req, res) {
        const markers = req.body.data

        // req.param.Map.markers.push(markers)
        // req.param.Map.markers = [...req.param.Map.markers, markers]
        req.param.Map.update({ $push: { markers } }, (err) => {
            if (err) {
                return  console.error(err)
            }
            this.models.Maps.findOne({ id: req.params.id }, (errors, data) => {
                res.send(data)
            })
        })
    }

    mapsMarkerUpdatePUT (req, res) {
        const marker = req.body.data
        // this.models.Maps.update({ id: req.params.id, 'markers._id': marker._id }, { $set: { 'markers.$': marker } }, (err) => {
        //     if (err) {
        //         console.error(err)
        //     }
        // })
        req.param.Map.markers.pull(marker._id).push(marker)
        req.param.Map.save()
        res.send(marker)
    }

    mapsMarkerDELETE (req, res) {
        req.param.Map.markers.pull(req.query.idMarker)
        req.param.Map.save()

        res.send({})
    }

    handler (req, res) {
        res.send({ status: 200 })
    }

    mapsMiddle (req, res, next) {
        if (!req.param.Map) {
            return res.sendStatus(404)
        }
        return next()
    }

    getUserID (req, res) {
        const user = _.get(req, 'cookies.user_id', new Hashids('_user_salt').encode(Date.now()))
        res.cookie('user_id', user, { expires: new Date(Date.now() + 900000) })

        return user
    }

    getParamId (req, res, next, id) {
        this.models.Maps.findOne({ id }, (err, data) => {
            if (!data) {
                return res.sendStatus(404)
            }
            data.date = Date.now()
            data.save()
            req.param.Map = data
            next()
        })
    }

}
