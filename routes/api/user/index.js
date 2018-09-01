const router = require('express').Router()
const controller = require('./user.controller')

router.get('/list', controller.list)
router.put('/update', controller.update)
router.delete('/delete', controller.delete)

// update 가 있어서 필요 없을 것 같다
router.post('/assign/:email', controller.assignAdmin)

module.exports = router