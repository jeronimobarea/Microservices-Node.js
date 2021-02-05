const express = require('express')

const config = require('../config')
const router = require('./network')

const app = express()

router.use(express.json())

// Routes
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('MySQL service listening on', config.mysqlService.port)
})