const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Truck = sequelize.define('Truck', {
  maxCapacity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  truckType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'trucks'
});

module.exports = Truck;
