const express = require('express');
const Client = require('../models/Client');

const router = express.Router();

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Client.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedClient = await Client.findByPk(req.params.id);
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Client.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
