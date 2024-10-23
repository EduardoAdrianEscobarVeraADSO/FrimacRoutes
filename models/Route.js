const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Truck = require('./Truck');

const Route = sequelize.define('Route', {
  vehicleWeight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  deliveryTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deliveryPointLat: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  deliveryPointLng: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'routes'
});

// Relación con la tabla de camiones
Route.belongsTo(Truck, { foreignKey: 'truckId', onDelete: 'CASCADE' });

module.exports = Route;
