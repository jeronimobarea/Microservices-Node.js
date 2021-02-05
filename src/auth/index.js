const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret)
}

function _getToken(auth) {
    if (!auth) {
        throw error('No token provided', 400)
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Invalid token format', 400)
    }
    return auth.replace('Bearer ', '').trim()
}

function _verify(token) {
    return jwt.verify(token, secret)
}

function _decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = _getToken(authorization)
    const decoded = _verify(token)

    req.user = decoded
    return decoded
}

const check = {
    own: (req, owner) => {
        const decoded = _decodeHeader(req)
        console.log(decoded)

        if (decoded.id !== owner) {
            throw error('Permission denied', 401)
        }
    },
    logged: function (req, owner) {
        const decoded = _decodeHeader(req);
    },
}

module.exports = {
    sign,
    check,
}