import Maps from './maps'

export default (app) => {

    app.use('/maps', new Maps())
}
