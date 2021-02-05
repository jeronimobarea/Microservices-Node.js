const request = require('request')

function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port

    function list(table) {
        return req('GET', table)
    }

    function get(table, id) {
        return req('GET', table, id)
    }

    function insert(table, data) {
        return req('POST', table, data)
    }

    function update(table, data) {
        return req('PUT', table, data)
    }

    function upsert(table, data) {
        if (data.id) {
            return update(table, data)
        }

        return insert(table, data)
    }

    function query(table, q, join) {
        return req('POST', table + '/query', {q, join});
    }

    function req(method, table, data) {
        let url = URL + '/' + table
        let body = ''

        if (method === 'GET' && data) {
            url += '/' + data
        } else if (data) {
            body = JSON.stringify(data)
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error with the remote Database', err)
                    return reject(err.message)
                }

                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }

    return {
        get,
        list,
        upsert,
        query,
    }
}

module.exports = createRemoteDB