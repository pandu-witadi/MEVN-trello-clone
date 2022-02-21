//
//
//
const jwt = require('jsonwebtoken')
const cfApp = require('../../config')
const User = require('../models/User')


// create json web token
const createToken = (email) => {
    return jwt.sign(
        { email: email },
        cfApp.secret_str, {
            expiresIn: cfApp.refresh_token_time
        })
}


const login = async (req, res) => {
    const { email, password } = req.body
    console.log('login', email, password)
    try {
        var tmp = await User.login( email, password )
        var accessToken = createToken(tmp.email)
        var user = JSON.parse(JSON.stringify(tmp))
        delete user.password
        return res.status(200).json({
            accessToken: accessToken,
            payload: jwt.decode(accessToken),
            user: user
        })
    } catch (err) {
        return res.json({ errors: err })
    }
}

module.exports = {
    login
    // logout
}
