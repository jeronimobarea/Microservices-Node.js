const express = require('express')
const config = require('../config.js')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

app.use(express.json())

// ROUTER
app.use('/api/posts', post)

app.use(errors)

app.listen(config.post.port, () => {
    console.log('Post service listening on ', config.post.port)
})