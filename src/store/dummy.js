const db = {
    'user': [
        {
            id: '1',
            name: 'Carlos',
        }
    ]
}

async function query(table, param) {
    let col = await list(table)
    let keys = Object.keys(param)
    let key = keys[0]
    return col.find(item => item[key] === param[key]) || null
}

async function get(table, id) {
    let col = await list(table)
    return col.find(item => item.id === id) || null
}

async function list(table) {
    return db[table] || []
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = []
    }

    db[table].push(data)
}

async function remove(table, id) {
    return true
}

module.exports = {
    query,
    get,
    list,
    upsert,
    remove
}