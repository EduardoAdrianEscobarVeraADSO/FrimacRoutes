const express = require('express');
const Role = require('../models/role');

const router = express.Router();

// Crear un nuevo rol
router.post('/', async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un rol por ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un rol
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Role.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRole = await Role.findByPk(req.params.id);
      res.json(updatedRole);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un rol
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
