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

    function follow(from, to) {
        return store.upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to,
        })
    }

    async function following(user) {
        const join = {}
        join[TABLE] = 'user_to'
        const query = {user_from: user}
        return await store.query(TABLE + '_follow', query, join)
    }

    return {
        get,
        list,
        upsert,
        follow,
        following,
    }
}