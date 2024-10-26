// Importa el módulo express para crear el enrutador
const express = require('express');

// Importa el modelo Truck para interactuar con la base de datos
const Truck = require('../models/Truck');

// Crea un nuevo enrutador
const router = express.Router();

// Ruta para crear un nuevo camión
router.post('/', async (req, res) => {
  try {
    // Crea un nuevo camión usando los datos proporcionados en el cuerpo de la solicitud
    const truck = await Truck.create(req.body);
    // Responde con el camión creado y un código de estado 201 (Creado)
    res.status(201).json(truck);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400 (Solicitud incorrecta)
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los camiones
router.get('/', async (req, res) => {
  try {
    // Recupera todos los camiones de la base de datos
    const trucks = await Truck.findAll();
    // Responde con la lista de camiones
    res.json(trucks);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un camión por ID
router.get('/:id', async (req, res) => {
  try {
    // Busca un camión por su ID
    const truck = await Truck.findByPk(req.params.id);
    if (truck) {
      // Si se encuentra el camión, responde con sus datos
      res.json(truck);
    } else {
      // Si no se encuentra el camión, responde con un mensaje de error 404
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un camión
router.put('/:id', async (req, res) => {
  try {
    // Actualiza el camión con los nuevos datos proporcionados en el cuerpo de la solicitud
    const [updated] = await Truck.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      // Si se actualiza el camión, recupera y responde con los nuevos datos
      const updatedTruck = await Truck.findByPk(req.params.id);
      res.json(updatedTruck);
    } else {
      // Si no se encuentra el camión, responde con un mensaje de error 404
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un camión
router.delete('/:id', async (req, res) => {
  try {
    // Elimina el camión correspondiente al ID proporcionado
    const deleted = await Truck.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      // Si se elimina el camión, responde con un código de estado 204 (Sin contenido)
      res.status(204).send();
    } else {
      // Si no se encuentra el camión, responde con un mensaje de error 404
      res.status(404).json({ message: 'Camión no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Exporta el enrutador para su uso en otros módulos de la aplicación
module.exports = router;
