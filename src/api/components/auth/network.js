const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.use(express.json())

router.post('/login', (req, res) => {
    Controller.login(req.body.username, req.body.password).then(token => {
        response.success(req, res, token, 200)
    }).catch(error => {
        response.error(req, res, 'Invalid data', 400)
    })
})

module.exports = router