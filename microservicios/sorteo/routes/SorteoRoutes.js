// Define las rutas API REST para Sorteo
// Ejemplo: GET /sorteos, POST /sorteos, etc.

const express = require('express');
const router = express.Router();
const SorteoController = require('../controllers/SorteoController');

// Ruta para crear un nuevo sorteo
router.post('/crear', SorteoController.crearSorteo);
// Ruta para modificar un sorteo ya existente
router.put('/modificar/:id', SorteoController.modificarSorteo);

router.get('/consultar/:id', SorteoController.consultarSorteo);

module.exports = router;
