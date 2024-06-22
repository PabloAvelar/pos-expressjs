const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'mariadb',
    port: process.env.PORT_DB,
    showWarnings: true,
    connectTimeout: 1000,
})

module.exports = sequelize;