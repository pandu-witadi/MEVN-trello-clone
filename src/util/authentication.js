//
//
//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const CF = require('../../config')


const hashPassword = async(rawPassword) => {
    let salt = await bcrypt.genSalt(CF.saltLength)
    return await bcrypt.hash(rawPassword, salt)
}

const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}

const createToken = (obj, exp) => {
    return jwt.sign(
        {
            data: obj
        },
        CF.secret_str,
        {
            expiresIn: exp
        }
    )
}


const checkToken = (token) => {
    jwt.verify(token, CF.secret_str, (err, decodedToken) => {
        if (err) {
            return false
        } else {
            console.log(decodedToken)
            return true
        }
    })
}

const authRequired = (req, res, next) => {
    try {
        let accessToken = null

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            accessToken = req.headers.authorization.split(' ')[1]
        else
            accessToken = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token

        if(!accessToken)
            return res.json({ errors: "No authentication token, access denied" })

        const verified = jwt.verify(accessToken, CF.secret_str)
        if(!verified)
            return res.json({ errors: "Token verification failed, authorization denied" })

        req.userId = verified.data
        next()
    } catch (err) {
        res.json({ errors: err })
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    checkToken,
    authRequired
}
