const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('products_db', 'root', 'Atharv08112002', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;