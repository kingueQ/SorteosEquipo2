const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
  async createUsuario(req, res) {
    try {
      const usuario = await UsuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Error al crear usuario." });
    }
  }

  async getUsuarioById(req, res) {
    try {
      const usuario = await UsuarioService.getUsuarioById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      res.json(usuario);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: "Error al obtener usuario." });
    }
  }

  async getAllUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.getAllUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ message: "Error al obtener usuarios." });
    }
  }

  async getUsuarioByEmail(req, res) {
    try {
      const usuario = await UsuarioService.getUsuarioByEmail(req.params.email);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      const pass = req.body.password;
      if(pass!=usuario.contrasena){
        return res.status(404).json({ message: "Las credenciales no son válidas." });
      }
      res.json(usuario);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: "Error al obtener usuario." });
    }
  }
}

module.exports = new UsuarioController();
