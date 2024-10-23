const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  tableName: 'roles'
});

module.exports = Role;
