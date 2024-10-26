// Importa el módulo express para crear el enrutador
const express = require('express');

// Importa el modelo Route para interactuar con la base de datos
const Route = require('../models/Route');

// Crea un nuevo enrutador
const router = express.Router();

// Ruta para crear una nueva ruta
router.post('/', async (req, res) => {
  try {
    // Crea una nueva ruta usando los datos proporcionados en el cuerpo de la solicitud
    const route = await Route.create(req.body);
    // Responde con la ruta creada y un código de estado 201 (Creado)
    res.status(201).json(route);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400 (Solicitud incorrecta)
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todas las rutas
router.get('/', async (req, res) => {
  try {
    // Recupera todas las rutas de la base de datos
    const routes = await Route.findAll();
    // Responde con la lista de rutas
    res.json(routes);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener una ruta por ID
router.get('/:id', async (req, res) => {
  try {
    // Busca una ruta por su ID
    const route = await Route.findByPk(req.params.id);
    if (route) {
      // Si se encuentra la ruta, responde con sus datos
      res.json(route);
    } else {
      // Si no se encuentra la ruta, responde con un mensaje de error 404
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar una ruta
router.put('/:id', async (req, res) => {
  try {
    // Actualiza la ruta con los nuevos datos proporcionados en el cuerpo de la solicitud
    const [updated] = await Route.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      // Si se actualiza la ruta, recupera y responde con los nuevos datos
      const updatedRoute = await Route.findByPk(req.params.id);
      res.json(updatedRoute);
    } else {
      // Si no se encuentra la ruta, responde con un mensaje de error 404
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar una ruta
router.delete('/:id', async (req, res) => {
  try {
    // Elimina la ruta correspondiente al ID proporcionado
    const deleted = await Route.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      // Si se elimina la ruta, responde con un código de estado 204 (Sin contenido)
      res.status(204).send();
    } else {
      // Si no se encuentra la ruta, responde con un mensaje de error 404
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Exporta el enrutador para su uso en otros módulos de la aplicación
module.exports = router;
