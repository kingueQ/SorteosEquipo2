const UsuarioRepository = require('../repositories/UsuarioRepository');
const bcrypt = require('bcrypt');

class UsuarioService {
  // Método principal para crear usuario
  async createUsuario(usuario) {
    const errores = {};

    // Validaciones
    errores.nombre = this.validateNombre(usuario.nombre);
    errores.correo = this.validateCorreo(usuario.correo);
    errores.telefono = this.validateTelefono(usuario.telefono);
    errores.contrasena = this.validateContrasena(usuario.contrasena);
    errores.tipo = this.validateTipo(usuario.tipo);

    // Eliminar errores nulos (validaciones exitosas)
    Object.keys(errores).forEach(key => errores[key] === null && delete errores[key]);

    if (Object.keys(errores).length > 0) {
      const error = new Error(JSON.stringify(errores));
      error.message = errores;
      error.status = 400;
      throw error;
    }

    // Hash de la contraseña antes de guardarla
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
    return UsuarioRepository.create(usuario);
  }

  // Validación de nombre
  validateNombre(nombre) {
    if (!nombre || nombre.trim().length === 0) {
      return 'El nombre es obligatorio.';
    }

    nombre = nombre.trim();

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!nombreRegex.test(nombre)) {
      return 'El nombre solo puede contener letras y espacios. Ejemplo: "Juan Pérez".';
    }

    if (nombre.length < 3 || nombre.length > 30) {
      return 'El nombre debe tener entre 3 y 30 caracteres.';
    }

    return null; // No hay errores
  }

  // Validación de correo
  validateCorreo(correo) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correo) {
      return 'El correo es obligatorio.';
    }
    if (!correoRegex.test(correo)) {
      return 'El correo debe tener un formato válido. Ejemplo: "usuario@dominio.com".';
    }
    return null;
  }

  // Validación de teléfono
  validateTelefono(telefono) {
    const telefonoRegex = /^\d{10}$/;
    if (!telefono) {
      return 'El teléfono es obligatorio.';
    }
    if (!telefonoRegex.test(telefono)) {
      return 'El teléfono debe contener exactamente 10 dígitos. Ejemplo: "1234567890".';
    }
    return null;
  }

  // Validación de contraseña
  validateContrasena(contrasena) {
    if (!contrasena) {
      return 'La contraseña es obligatoria.';
    }
    if (contrasena.length < 8 || contrasena.length > 15) {
      return 'La contraseña debe tener entre 8 y 15 caracteres.';
    }
    if (!/[A-Z]/.test(contrasena)) {
      return 'La contraseña debe incluir al menos una letra mayúscula.';
    }
    if (!/[a-z]/.test(contrasena)) {
      return 'La contraseña debe incluir al menos una letra minúscula.';
    }
    if (!/[0-9]/.test(contrasena)) {
      return 'La contraseña debe incluir al menos un número.';
    }
    return null;
  }

  // Validación de tipo
  validateTipo(tipo) {
    const tiposValidos = ['cliente', 'organizador'];
    if (!tipo) {
      return 'El tipo es obligatorio.';
    }
    if (!tiposValidos.includes(tipo)) {
      return `El tipo debe ser uno de los siguientes: ${tiposValidos.join(', ')}.`;
    }
    return null;
  }

  // Métodos adicionales
  async getUsuarioById(id) {
    return UsuarioRepository.findById(id);
  }

  async getAllUsuarios() {
    return UsuarioRepository.findAll();
  }

  async getUsuarioByEmail(correo) {
    return UsuarioRepository.findByEmail(correo);
  }

  async getUsuarioByTelefono(telefono) {
    return UsuarioRepository.findByTelefono(telefono);
  }
}

module.exports = new UsuarioService();
