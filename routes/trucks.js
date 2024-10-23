const express = require('express');
const Truck = require('../models/Truck');

const router = express.Router();

// Crear un nuevo camión
router.post('/', async (req, res) => {
  try {
    const truck = await Truck.create(req.body);
    res.status(201).json(truck);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los camiones
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.findAll();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un camión por ID
router.get('/:id', async (req, res) => {
  try {
    const truck = await Truck.findByPk(req.params.id);
    if (truck) {
      res.json(truck);
    } else {
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un camión
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Truck.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTruck = await Truck.findByPk(req.params.id);
      res.json(updatedTruck);
    } else {
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un camión
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Truck.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
