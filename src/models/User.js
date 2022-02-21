//
//
//
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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


// mongoose hooks toJson
// userSchema.method("toJSON", function() {
//     const {
//         __v,
//         _id,
//         ...object
//     } = this.toObject()
//     object.id = _id
//     return object
// })

// mongoose hooks pre/before save
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// static method to login user
userSchema.statics.login = async function(email, password) {
    console.log('statics.login')
    const user = await this.findOne({ email: email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth)
            return user

        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


module.exports = mongoose.model('user', userSchema)
