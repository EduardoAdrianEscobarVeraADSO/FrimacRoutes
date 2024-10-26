// Importa el tipo de datos DataTypes desde Sequelize, para definir los tipos de las columnas en el modelo
const { DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js
const sequelize = require('../config/database');

// Define el modelo 'Truck' usando Sequelize para gestionar los datos de camiones en la aplicación
const Truck = sequelize.define('Truck', {
  // Define el campo 'maxCapacity' para almacenar la capacidad máxima del camión
  maxCapacity: {
    type: DataTypes.FLOAT,      // Define el tipo de datos como FLOAT (número decimal)
    allowNull: false            // No permite valores nulos, es decir, este campo es obligatorio
  },
  // Define el campo 'truckType' para especificar el tipo de camión
  truckType: {
    type: DataTypes.STRING,     // Define el tipo de datos como STRING (cadena de texto)
    allowNull: false            // No permite valores nulos, este campo es obligatorio
  }
}, {
  // Configuración adicional del modelo
  timestamps: true,             // Incluye automáticamente las columnas 'createdAt' y 'updatedAt' para rastrear la creación y actualización de cada registro
  tableName: 'trucks'           // Especifica que el nombre de la tabla en la base de datos será 'trucks'
});

// Exporta el modelo Truck para su uso en otros módulos de la aplicación
module.exports = Truck;
