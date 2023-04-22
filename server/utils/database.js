const Sequelize = require('sequelize')

const sequelize = new Sequelize('vinhaca', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
});

module.exports= sequelize;
