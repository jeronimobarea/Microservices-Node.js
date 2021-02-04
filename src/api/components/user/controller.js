const {nanoid} = require("nanoid");
const auth = require('../auth')

const TABLE = 'user'

module.exports = (store = require('../../../store/dummy')) => {
    return {
        get: async (id) => store.get(TABLE, id),
        list: async () => store.list(TABLE),
        upsert: async (body) => {
            const user = {
                id: body.id ?? nanoid(),
                name: body.name,
                username: body.username,
            }

            if (body.password || body.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: body.password,
                })
            }

            return store.upsert(TABLE, user)
        },
    }
}