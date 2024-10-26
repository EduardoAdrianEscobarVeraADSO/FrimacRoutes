// Importa el tipo de datos DataTypes desde Sequelize, para definir los tipos de las columnas en el modelo
const { DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js
const sequelize = require('../config/database');

// Importa el modelo Client para establecer la relación con este modelo
const Client = require('./Client');

// Importa el modelo Route para establecer la relación con este modelo
const Route = require('./Route');

// Define el modelo 'ClientRoute' usando Sequelize para gestionar las relaciones entre clientes y rutas
const ClientRoute = sequelize.define('ClientRoute', {
  // Define el campo 'deliveryTime' como una fecha obligatoria
  deliveryTime: {
    type: DataTypes.DATE,      // Define el tipo de datos como DATE (fecha)
    allowNull: false           // No permite valores nulos, lo que significa que este campo es obligatorio
  }
}, {
  // Configuración adicional del modelo
  timestamps: true,            // Incluye automáticamente las columnas 'createdAt' y 'updatedAt' para rastrear la creación y actualización de cada registro
  tableName: 'client_route'    // Especifica que el nombre de la tabla en la base de datos será 'client_route'
});

// Define las relaciones del modelo 'ClientRoute' con los modelos 'Client' y 'Route'

// Relación con el modelo Client
ClientRoute.belongsTo(Client, {
  foreignKey: 'clientId',      // Define 'clientId' como la clave foránea en la tabla 'client_route'
  onDelete: 'CASCADE'          // Al eliminar un registro en la tabla 'Client', elimina los registros asociados en 'client_route'
});

// Relación con el modelo Route
ClientRoute.belongsTo(Route, {
  foreignKey: 'routeId',       // Define 'routeId' como la clave foránea en la tabla 'client_route'
  onDelete: 'CASCADE'          // Al eliminar un registro en la tabla 'Route', elimina los registros asociados en 'client_route'
});

// Exporta el modelo ClientRoute para su uso en otros módulos de la aplicación
module.exports = ClientRoute;
