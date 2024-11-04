// Define las rutas API REST para Sorteo
// Ejemplo: GET /sorteos, POST /sorteos, etc.

const express = require('express');
const router = express.Router();
const SorteoController = require('../controllers/SorteoController');

// Ruta para crear un nuevo sorteo
router.post('/crear', SorteoController.crearSorteo);

module.exports = router;
