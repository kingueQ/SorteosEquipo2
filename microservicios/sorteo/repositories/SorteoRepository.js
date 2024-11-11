const { pool } = require('../config/dbConfig'); // Asegúrate de que la ruta sea correcta

class SorteoRepository {
  static async crearSorteo(datosSorteo) {
    const { idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, fechaFinApartado, imagen, estado } = datosSorteo;

    const query = `
      INSERT INTO Sorteos (id_organizador, cantNumeros, precio, fechaInicio, fechaFin, fechaLimiteApartado, imagen, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, fechaFinApartado, imagen, estado || 'activo'];

    try {
      const [result] = await pool.execute(query, valores);
      return { id: result.insertId, ...datosSorteo };
    } catch (error) {
      throw new Error('Error al crear el sorteo: ' + error.message);
    }
  }

  static async modificarSorteo(id, datosSorteo) {
    const query = `
      UPDATE Sorteos
      SET 
        id_organizador = ?, 
        cantNumeros = ?, 
        precio = ?, 
        fechaInicio = ?, 
        fechaFin = ?, 
        fechaLimiteApartado = ?, 
        imagen = ?, 
        estado = ?
      WHERE id = ?
    `;

    const valores = [
      datosSorteo.idOrganizador,
      datosSorteo.cantNumeros,
      datosSorteo.precio,
      datosSorteo.fechaInicio,
      datosSorteo.fechaFin,
      datosSorteo.fechaFinApartado,
      datosSorteo.imagen,
      datosSorteo.estado || 'activo',
      id
    ];

    try {
      const [result] = await pool.execute(query, valores);
      if (result.affectedRows > 0) {
        return { id, ...datosSorteo };
      } else {
        throw new Error('Sorteo no encontrado o no modificado');
      }
    } catch (error) {
      throw new Error('Error al modificar el sorteo: ' + error.message);
    }
  }

  static async consultarSorteoPorId(id) {
    const query = `
      SELECT id, id_organizador AS idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, fechaLimiteApartado AS fechaFinApartado, imagen, estado
      FROM Sorteos
      WHERE id = ?
    `;

    try {
      const [rows] = await pool.execute(query, [id]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      throw new Error('Error en repository al consultar el sorteo: ' + error.message);
    }
  }
}

module.exports = SorteoRepository;
