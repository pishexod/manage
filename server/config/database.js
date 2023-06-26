module.exports = {
    database: process.env.MYSQL_DB,
    username: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    options: {
        host: process.env.HOST,
        dialect: 'mysql',
        logging: false
    }
}