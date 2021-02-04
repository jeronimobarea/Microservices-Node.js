const auth = require('../../../auth')

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        if (action === 'update') {
            const owner = req.body.id
            auth.check.own(req, owner)
        }
        next()
    }

    return middleware
}