// Define las rutas API REST para Sorteo
// Ejemplo: GET /sorteos, POST /sorteos, etc.

const express = require('express');
const router = express.Router();
const BoletoController = require('../controllers/BoletoController');

// Ruta para crear un nuevo sorteo
router.post('/crear', BoletoController.crearBoleto);
// Ruta para modificar un sorteo ya existente
router.put('/modificar/:id', BoletoController.modificarBoleto);

router.get('/consultar/:id', BoletoController.consultarBoleto);

router.get('/consultarTodos/:idSorteo', BoletoController.consultarBoletos);

module.exports = router;
