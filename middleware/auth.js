  const jwt = require('jsonwebtoken');
  const User = require('../models/User'); // Asegúrate de importar el modelo User
  
  const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener una variable de entorno JWT_SECRET
      req.user = await User.findByPk(verified.id); // Buscar usuario en la base de datos
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token no válido.' });
    }
  };
  
  module.exports = authenticate;
  