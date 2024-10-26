// Importa el tipo de datos DataTypes desde Sequelize, que permite definir los tipos de las columnas del modelo
const { DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js para conectar con la base de datos
const sequelize = require('../config/database');

// Define el modelo 'Client' usando la instancia de Sequelize
const Client = sequelize.define('Client', {
  // Define el campo 'clientName' como una cadena de texto obligatoria
  clientName: {
    type: DataTypes.STRING,  // Especifica el tipo de datos como STRING (cadena de texto)
    allowNull: false         // No permite valores nulos, lo que significa que este campo es obligatorio
  },
  // Define el campo 'address' también como una cadena de texto obligatoria
  address: {
    type: DataTypes.STRING,  // Especifica el tipo de datos como STRING (cadena de texto)
    allowNull: false         // No permite valores nulos, es decir, el campo es obligatorio
  }
}, {
  // Configuración adicional del modelo
  timestamps: true,          // Incluye automáticamente las columnas 'createdAt' y 'updatedAt' para rastrear la creación y actualización de cada registro
  tableName: 'clients'       // Especifica que el nombre de la tabla en la base de datos será 'clients'
});

// Exporta el modelo Client para que pueda ser utilizado en otros módulos de la aplicación
module.exports = Client;
