const path = require('path');
const { Sequelize } = require('sequelize');

const storage = path.resolve(__dirname, '../../data/database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storage,
});

module.exports = sequelize;
