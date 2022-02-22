//
//
//
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const CF = require('../../config')
const {
    comparePassword,
    createToken
} = require('../util/authentication')



const login = async (req, res) => {
    let { email, password } = req.body

    if (!(email && password))
        return res.json({ errors: "parameters incomplete" })

    let user = await User.findOne({email: email})
    if (!user)
        return res.status(401).json({ errors: "email not register" })

    let isPassword = await comparePassword(password, user.password)
    if (isPassword) {
        let accessToken = createToken(user._id, CF.token_exp)
        let tmp = JSON.parse(JSON.stringify(user))
        delete tmp.password
        return res.status(200).json({
            accessToken: accessToken,
            payload: jwt.decode(accessToken),
            user: tmp
        })
    } else
        return res.json({ errors: "error in login" })

}

module.exports = {
    login
    // logout
}
