const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

// Crear un nuevo usuario (solo administradores)
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el usuario
    const user = await User.create({ email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios (solo administradores)
router.get('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un usuario por ID (solo administradores)
router.get('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un usuario (solo administradores y el propio usuario)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Solo permite al usuario actualizar su propia información o a un administrador
    if (req.user.id !== userToUpdate.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }

    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedUser[0] === 1) {
      const updatedUserData = await User.findByPk(req.params.id);
      res.json(updatedUserData);
    } else {
      res.status(400).json({ message: 'No se pudo actualizar el usuario.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deshabilitar un usuario (solo administradores)
router.patch('/:id/disable', authenticate, authorizeAdmin, async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Deshabilitar el usuario
      user.isActive = false;
      await user.save();
  
      res.json({ message: 'Usuario deshabilitado correctamente.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar el usuario
      const user = await User.findOne({ where: { email, isActive: true } });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas o usuario deshabilitado.' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales incorrectas.' });
      }
  
      // Crear y firmar el token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Actualizar la propia información del usuario (solo el propio usuario)
router.put('/me', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.user.id },
    });

    if (updatedUser[0] === 1) {
      const updatedUserData = await User.findByPk(req.user.id);
      res.json(updatedUserData);
    } else {
      res.status(400).json({ message: 'No se pudo actualizar el usuario.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
