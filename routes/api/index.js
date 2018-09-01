const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const item = require('./item')

router.use('/auth', auth)
router.use('/user', authMiddleware) // 로그인 됬는지 권한 체크
router.use('/user', user)
router.use('/item', item)

module.exports = router