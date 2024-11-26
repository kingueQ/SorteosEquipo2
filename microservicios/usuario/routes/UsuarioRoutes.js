const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rutas
app.post('/crear', UsuarioController.createUsuario);
app.get('/listarUsuario', UsuarioController.getAllUsuarios);
app.get('/consultar/:id', UsuarioController.getUsuarioById);
app.get('/buscar/:email', UsuarioController.getUsuarioByEmail);

module.exports = router;
