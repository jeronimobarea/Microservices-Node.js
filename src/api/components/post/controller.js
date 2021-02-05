const {nanoid} = require('nanoid');
const error = require('../../../utils/error');

const COLLECTION = 'post';


module.exports = function (store = require('../../../store/dummy')) {

    function list() {
        return store.list(COLLECTION)
    }

    async function get(id) {
        const post = await store.get(COLLECTION, id)

        if (!post) {
            throw error('Not found', 404)
        }
        return post
    }

    async function upsert(data, user) {
        const post = {
            id: data.id ?? nanoid(),
            user: user,
            text: data.text,
        }
        return store.upsert(COLLECTION, post).then(() => post)
    }

    async function like(post, user) {
        return await store.upsert(COLLECTION + '_like', {
            post: post,
            user: user,
        })
    }

    async function postsLiked(user, post) {
        return await store.query(COLLECTION + '_like', {user: user}, {post: post})
    }

    async function postLikers(post) {
        return await store.query(COLLECTION + '_like', {post: post}, {post: post})
    }

    return {
        list,
        get,
        upsert,
        like,
        postsLiked,
        postLikers,
    }
}