const Sequelize = require("sequelize");

const sequelize = new Sequelize("vinhaca_1_1", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
