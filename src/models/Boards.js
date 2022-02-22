//
//
//
const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    memberIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
}, {
    collection: 'boards',
    versionKey: false
})


module.exports = mongoose.model('board', boardSchema)
