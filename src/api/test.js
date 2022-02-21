//
//  /api/test
//
const CF = require('../../config')


const test_get = async (req, res) => {
    try {
        curDate = new Date()
        return res.send({
            appName: CF.appName,
            port: CF.port,
            appVersion: CF.appVersion,
            serverDate: curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(),
            serverTime: curDate.toLocaleTimeString(),
            random_number: Math.random()
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}


const test_post = async (req, res) => {
    try {
        return res.send(req.body)
    } catch (err) {
        return res.status(500).send(err)
    }
}


module.exports = {
    test_get,
    test_post
}
