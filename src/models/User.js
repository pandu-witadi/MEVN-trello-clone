//
//
//
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'enter valid password']
    },
    token: String,
    displayName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    versionKey: false
})

module.exports = mongoose.model('user', userSchema)
