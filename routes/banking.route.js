const express = require('express')

const router = express.Router()

const controller = require('../controllers/banking.controller')


router.post('/create',controller.create)
router.post('/login',controller.login)
router.get('/getAll',controller.getAll)
router.get('/getById/:id',controller.getById)
router.put('/updateById/:id',controller.updateById)
router.delete('/deleteById/:id',controller.deleteById)
router.post('/getByEmail',controller.getByEmail)


module.exports = router