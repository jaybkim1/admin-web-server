const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const item = require('./item')

router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/item', item)

module.exports = router