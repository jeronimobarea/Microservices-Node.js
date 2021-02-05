module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || '3306',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '1234',
        database: process.env.MYSQL_DATABASE || 'platzi_social',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
}