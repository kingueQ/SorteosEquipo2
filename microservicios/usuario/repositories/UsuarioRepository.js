const { pool } = require('../config/dbConfig');

class UsuarioRepository {
  async create(usuario) {
    const query = `
      INSERT INTO usuarios (nombre, correo, telefono, contrasena, tipo)
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await pool.query(query, [
      usuario.nombre,
      usuario.correo,
      usuario.telefono,
      usuario.contrasena,
      usuario.tipo,
    ]);
    return { ...usuario, id: result.insertId };
  }

  async findById(id) {
    const query = `SELECT * FROM usuarios WHERE id = ?;`;
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async findAll() {
    const query = `SELECT * FROM usuarios;`;
    const [rows] = await pool.query(query);
    return rows;
  }

  async findByEmail(correo) {
    const query = `SELECT * FROM usuarios WHERE correo = ?;`;
    const [rows] = await pool.query(query, [correo]);
    return rows[0] || null;
  }

  async findByTelefono(telefono) {
    const query = `SELECT * FROM usuarios WHERE telefono = ?;`;
    const [rows] = await pool.query(query, [telefono]);
    return rows[0] || null;
  }
}

module.exports = new UsuarioRepository();
