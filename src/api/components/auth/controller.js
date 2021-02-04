const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLE = 'auth'

module.exports = (store = require('../../../store/dummy')) => {
    return {
        login: async (username, password) => {
            const data = await store.query(TABLE, {username: username})

            if (!bcrypt.compare(password, data.password)) {
                throw new Error('Invalid data')
            }
            return auth.sign(data)
        },
        upsert: async (data) => {
            const authData = {
                id: data.id,
            }

            if (data.username) {
                authData.username = data.username
            }
            if (data.password) {
                authData.password = await bcrypt.hash(data.password, 5)
            }
            return store.upsert(TABLE, authData)
        }
    }
}