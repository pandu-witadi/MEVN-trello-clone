//
//
//
const router = require('express').Router()

const { authRequired } = require('../util/authentication')

const {
    test_get,
    test_post
} = require('./test')
router.get('/test', test_get)
router.post('/test', test_post)

const { login } = require('./authentication')
router.post('/authentication', login)

const users = require('./users')
router.post('/users', users.signup)
router.get('/users/me', authRequired, users.checkUser)

const boards = require('./boards')
router.get('/boards', authRequired, boards.find)
router.post('/boards', authRequired, boards.create)


module.exports = router
