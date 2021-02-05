const {nanoid} = require("nanoid");
const auth = require('../auth')

const TABLE = 'user'


module.exports = (store = require('../../../store/dummy')) => {
    async function get(id) {
        return store.get(TABLE, id)
    }

    async function list() {
        return store.list(TABLE)
    }

    async function upsert(body) {
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
    }

    return {
        get,
        list,
        upsert,
    }
}