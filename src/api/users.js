//
//
//
const User = require('../models/User')

const {
    hashPassword,
    comparePassword,
    createToken,
    checkToken
} = require('../util/authentication')


const signup = async (req, res) => {
    let { email, password, displayName, imageUrl } = req.body

    if ( !(email && password && displayName && imageUrl) )
        return res.json({ errors: "parameters incomplete" })

    let user = await User.findOne({email: email})
    if (user)
        return res.json({ errors: "email already register" })
    else {
        try {
            password = await hashPassword(password)
            let user = await User.create({ email, password,  displayName, imageUrl })
            return res.status(200).json(user)
        } catch (err) {
            return res.json({ errors: "error in signup" })
        }
    }
}

const checkUser = async (req, res) => {
    let user = await User.findById( req.userId )
    if (!user)
        return res.status(401).json({ errors: "email not register" })

    return res.status(200).json(user)
}


module.exports = {
    signup,
    checkUser
}
