const express = require('express');
const Route = require('../models/Route');

const router = express.Router();

// Crear una nueva ruta
router.post('/', async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las rutas
router.get('/', async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una ruta por ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.id);
    if (route) {
      res.json(route);
    } else {
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una ruta
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Route.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRoute = await Route.findByPk(req.params.id);
      res.json(updatedRoute);
    } else {
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una ruta
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Route.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
