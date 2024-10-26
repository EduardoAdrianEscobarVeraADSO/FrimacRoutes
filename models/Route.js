// Importa el tipo de datos DataTypes desde Sequelize, para definir los tipos de las columnas en el modelo
const { DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js
const sequelize = require('../config/database');

// Importa el modelo Truck para establecer la relación con el modelo Route
const Truck = require('./Truck');

// Define el modelo 'Route' usando Sequelize para gestionar las rutas de entrega en la aplicación
const Route = sequelize.define('Route', {
  // Define el campo 'vehicleWeight' para almacenar el peso del vehículo en la ruta
  vehicleWeight: {
    type: DataTypes.FLOAT,     // Define el tipo de datos como FLOAT (número decimal)
    allowNull: false           // No permite valores nulos, es decir, este campo es obligatorio
  },
  // Define el campo 'deliveryTime' para almacenar la fecha y hora de entrega
  deliveryTime: {
    type: DataTypes.DATE,      // Define el tipo de datos como DATE (fecha)
    allowNull: false           // No permite valores nulos, es decir, este campo es obligatorio
  },
  // Define el campo 'deliveryPointLat' para almacenar la latitud del punto de entrega
  deliveryPointLat: {
    type: DataTypes.FLOAT,     // Define el tipo de datos como FLOAT (número decimal)
    allowNull: false           // No permite valores nulos, este campo es obligatorio
  },
  // Define el campo 'deliveryPointLng' para almacenar la longitud del punto de entrega
  deliveryPointLng: {
    type: DataTypes.FLOAT,     // Define el tipo de datos como FLOAT (número decimal)
    allowNull: false           // No permite valores nulos, este campo es obligatorio
  }
}, {
  // Configuración adicional del modelo
  timestamps: true,            // Incluye automáticamente las columnas 'createdAt' y 'updatedAt' para rastrear la creación y actualización de cada registro
  tableName: 'routes'          // Especifica que el nombre de la tabla en la base de datos será 'routes'
});

// Define la relación de 'Route' con el modelo 'Truck'
Route.belongsTo(Truck, {
  foreignKey: 'truckId',       // Define 'truckId' como la clave foránea en la tabla 'routes'
  onDelete: 'CASCADE'          // Al eliminar un registro en la tabla 'Truck', se eliminan las rutas asociadas en 'routes'
});

// Exporta el modelo Route para su uso en otros módulos de la aplicación
module.exports = Route;
