const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User
