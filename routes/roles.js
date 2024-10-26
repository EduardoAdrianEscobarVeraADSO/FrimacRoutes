// Importa el módulo express para crear el enrutador
const express = require('express');

// Importa el modelo Role para interactuar con la base de datos
const Role = require('../models/role');

// Crea un nuevo enrutador
const router = express.Router();

// Ruta para crear un nuevo rol
router.post('/', async (req, res) => {
  try {
    // Crea un nuevo rol usando los datos proporcionados en el cuerpo de la solicitud
    const role = await Role.create(req.body);
    // Responde con el rol creado y un código de estado 201 (Creado)
    res.status(201).json(role);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400 (Solicitud incorrecta)
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los roles
router.get('/', async (req, res) => {
  try {
    // Recupera todos los roles de la base de datos
    const roles = await Role.findAll();
    // Responde con la lista de roles
    res.json(roles);
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500 (Error interno del servidor)
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un rol por ID
router.get('/:id', async (req, res) => {
  try {
    // Busca un rol por su ID
    const role = await Role.findByPk(req.params.id);
    if (role) {
      // Si se encuentra el rol, responde con sus datos
      res.json(role);
    } else {
      // Si no se encuentra el rol, responde con un mensaje de error 404
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un rol
router.put('/:id', async (req, res) => {
  try {
    // Actualiza el rol con los nuevos datos proporcionados en el cuerpo de la solicitud
    const [updated] = await Role.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      // Si se actualiza el rol, recupera y responde con los nuevos datos
      const updatedRole = await Role.findByPk(req.params.id);
      res.json(updatedRole);
    } else {
      // Si no se encuentra el rol, responde con un mensaje de error 404
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 400
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un rol
router.delete('/:id', async (req, res) => {
  try {
    // Elimina el rol correspondiente al ID proporcionado
    const deleted = await Role.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      // Si se elimina el rol, responde con un código de estado 204 (Sin contenido)
      res.status(204).send();
    } else {
      // Si no se encuentra el rol, responde con un mensaje de error 404
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    // Manejo de errores: responde con un código de estado 500
    res.status(500).json({ error: error.message });
  }
});

// Exporta el enrutador para su uso en otros módulos de la aplicación
module.exports = router;
