//
//
//
const User = require('../models/User')


const signup = async (req, res) => {
    const { email, password, displayName, imageUrl } = req.body
    if (email & password & displayName & imageUrl)
        return res.json({ errors: 'variable errors' })

    try {
        let user = await User.create({ email, password, displayName, imageUrl })
        return res.status(201).json(user)
    } catch (err) {
        return res.json({ errors: err })
    }
}



module.exports = {
    signup
}
