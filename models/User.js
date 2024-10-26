// Importa las clases Model y DataTypes desde Sequelize
const { Model, DataTypes } = require('sequelize');

// Importa la instancia de Sequelize configurada en el archivo database.js
const sequelize = require('../config/database');

// Define la clase User que extiende de Model
class User extends Model {}

// Inicializa el modelo User con sus atributos y configuraciones
User.init({
  // Define el campo 'email' para almacenar el correo electrónico del usuario
  email: {
    type: DataTypes.STRING,     // Define el tipo de datos como STRING (cadena de texto)
    allowNull: false,           // No permite valores nulos, es decir, este campo es obligatorio
    unique: true,               // Establece que el valor de este campo debe ser único, evitando correos duplicados
  },
  // Define el campo 'password' para almacenar la contraseña del usuario
  password: {
    type: DataTypes.STRING,     // Define el tipo de datos como STRING (cadena de texto)
    allowNull: false,           // No permite valores nulos, es decir, este campo es obligatorio
  },
  // Define el campo 'role' para especificar el rol del usuario
  role: {
    type: DataTypes.ENUM('admin', 'user', 'analista'), // Define un tipo enumerado para roles específicos
    allowNull: false,           // No permite valores nulos, es decir, este campo es obligatorio
  },
  // Define el campo 'isActive' para indicar si el usuario está activo
  isActive: {
    type: DataTypes.BOOLEAN,    // Define el tipo de datos como BOOLEAN (verdadero/falso)
    defaultValue: true,         // Por defecto, el usuario está activo (true)
  },
}, {
  sequelize,                   // La instancia de Sequelize utilizada para este modelo
  modelName: 'User',          // Nombre del modelo, utilizado por Sequelize para referirse a este modelo
});

// Exporta el modelo User para su uso en otros módulos de la aplicación
module.exports = User;
