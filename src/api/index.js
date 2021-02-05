const express = require('express')

const config = require('../config.js')

const auth = require('./components/auth/network')
const user = require('./components/user/network')
const post = require('./components/post/network')

const errors = require('../network/errors')

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Router
app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/posts', post)

app.use(errors)

app.listen(config.api.port, () => {
    console.log('Api listening on port: ', config.api.port)
})