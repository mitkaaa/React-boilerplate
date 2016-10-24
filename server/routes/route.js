import express from 'express'
import io from '../socket'
import models from '../models'

export default class Route{

    constructor () {
        this.app = express.Router()
        this.models = models
        this.io = io
        return this.init()
    }

    initialize () {}

    init () {
        this.initialize()
        return this.app
    }
}
