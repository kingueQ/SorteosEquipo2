const UsuarioRepository = require('../repositories/UsuarioRepository');
const bcrypt = require('bcrypt');

class UsuarioService {
  async createUsuario(usuario) {
    // Hash de la contraseña antes de guardarla
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
    return UsuarioRepository.create(usuario);
  }

  async getUsuarioById(id) {
    return UsuarioRepository.findById(id);
  }

  async getAllUsuarios() {
    return UsuarioRepository.findAll();
  }

  async getUsuarioByEmail(correo) {
    return UsuarioRepository.findByEmail(correo);
  }
}

module.exports = new UsuarioService();
