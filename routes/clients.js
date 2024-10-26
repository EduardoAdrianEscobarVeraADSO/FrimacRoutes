// Importa el módulo express para crear el enrutador
const express = require('express');

// Importa el modelo Client para interactuar con la base de datos
const Client = require('../models/Client');

// Crea un nuevo enrutador
const router = express.Router();

// Ruta para crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    // Crea un nuevo cliente usando los datos proporcionados en el cuerpo de la solicitud
    const client = await Client.create(req.body);
    // Responde con el cliente creado y un código de estado 201 (Creado)
    res.status(201).json(client);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400 (Solicitud incorrecta)
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    // Recupera todos los clientes de la base de datos
    const clients = await Client.findAll();
    // Responde con la lista de clientes
    res.json(clients);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    // Busca un cliente por su ID
    const client = await Client.findByPk(req.params.id);
    if (client) {
      // Si se encuentra el cliente, responde con sus datos
      res.json(client);
    } else {
      // Si no se encuentra el cliente, responde con un mensaje de error 404
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    // Actualiza el cliente con los nuevos datos proporcionados en el cuerpo de la solicitud
    const [updated] = await Client.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      // Si se actualiza el cliente, recupera y responde con los nuevos datos
      const updatedClient = await Client.findByPk(req.params.id);
      res.json(updatedClient);
    } else {
      // Si no se encuentra el cliente, responde con un mensaje de error 404
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    // Elimina el cliente correspondiente al ID proporcionado
    const deleted = await Client.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      // Si se elimina el cliente, responde con un código de estado 204 (Sin contenido)
      res.status(204).send();
    } else {
      // Si no se encuentra el cliente, responde con un mensaje de error 404
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Exporta el enrutador para su uso en otros módulos de la aplicación
module.exports = router;
