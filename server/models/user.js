const Sequelize = require('sequelize')

const sequelize = require('../utils/database.js')
const User = sequelize.define('Utilizadore', {
   Utilizadorid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   nomeUtilizador: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

module.exports= User;