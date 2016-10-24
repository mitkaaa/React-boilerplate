import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'
// import async from 'async'

const mapsSchema = mongoose.Schema({
    id: String,
    date:  {
        type: Date,
        default: Date.now
    },
    userID: String,
    markers: [{
        title: String,
        text: String,
        key:  {
            type: Date,
            default: Date.now
        },
        position: {
            lat: Number,
            lng: Number
        }
    }],
    users: [{
        userID: String,
        online: Boolean
    }]
})

mapsSchema.plugin(findOrCreate)


export default mongoose.model('Maps', mapsSchema)
