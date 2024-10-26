// Importa el tipo de datos DataTypes desde Sequelize, para definir los tipos de las columnas en el modelo
const { DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js
const sequelize = require('../config/database');

// Define el modelo 'Role' usando Sequelize para gestionar los roles de usuario en la aplicación
const Role = sequelize.define('Role', {
  // Define el campo 'name' para almacenar el nombre del rol
  name: {
    type: DataTypes.STRING,    // Define el tipo de datos como STRING (cadena de texto)
    allowNull: false,          // No permite valores nulos, lo que significa que este campo es obligatorio
    unique: true               // Establece el valor de este campo como único, evitando valores duplicados en la columna 'name'
  }
}, {
  // Configuración adicional del modelo
  timestamps: true,            // Incluye automáticamente las columnas 'createdAt' y 'updatedAt' para rastrear la creación y actualización de cada registro
  tableName: 'roles'           // Especifica que el nombre de la tabla en la base de datos será 'roles'
});

// Exporta el modelo Role para su uso en otros módulos de la aplicación
module.exports = Role;
