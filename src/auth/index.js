const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret)
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No token provided')
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Invalid token format', 400)
    }
    return auth.replace('Bearer ', '').trim()
}

function verify(token) {
    return jwt.verify(token, secret)
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded
    return decoded
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req)
        console.log(decoded)

        if (decoded.id !== owner) {
            throw error('Permission denied', 401)
        }
    }
}

module.exports = {
    sign,
    check,
}