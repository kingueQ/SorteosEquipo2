const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rutas
router.post('/crear', UsuarioController.createUsuario);
router.post('/login', UsuarioController.loginUsuario);
router.get('/listarUsuario', UsuarioController.getAllUsuarios);
router.get('/consultar/:id', UsuarioController.getUsuarioById);
router.get('/buscar/:email', UsuarioController.getUsuarioByEmail);

module.exports = router;
