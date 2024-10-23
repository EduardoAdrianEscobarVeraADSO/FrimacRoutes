const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');
const Route = require('./Route');

const ClientRoute = sequelize.define('ClientRoute', {
  deliveryTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'client_route'
});

// Relación con la tabla de clientes y rutas
ClientRoute.belongsTo(Client, { foreignKey: 'clientId', onDelete: 'CASCADE' });
ClientRoute.belongsTo(Route, { foreignKey: 'routeId', onDelete: 'CASCADE' });

module.exports = ClientRoute;
