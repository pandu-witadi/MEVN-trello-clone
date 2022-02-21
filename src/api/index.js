//
//
//
const router = require('express').Router()


const {
    test_get,
    test_post
} = require('./test')
router.get('/test', test_get)
router.post('/test', test_post)

const { login } = require('./authentication')
router.post('/authentication', login)

const { signup } = require('./users')
router.post('/users', signup)


module.exports = router
