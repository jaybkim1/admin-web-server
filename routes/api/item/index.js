const router = require('express').Router()
const controller = require('./item.controller')

router.get('/list', controller.list)
router.post('/new', controller.new)
router.post('/update/:id', controller.update)
router.delete('/delete/:id', controller.delete)

module.exports = router


