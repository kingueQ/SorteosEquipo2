// Contiene métodos de acceso a datos para Sorteo
// Ejemplo: Consultas a la base de datos para Sorteo

const { pool } = require('../config/dbConfig'); // Importar el pool de conexiones

class SorteoRepository {
  static async crearSorteo(datosSorteo) {
    const { idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, fechaFinApartado, imagen, estado } = datosSorteo;

    // Consulta SQL para insertar un nuevo sorteo
    const query = `
      INSERT INTO Sorteos (id_organizador, cantNumeros, precio, fechaInicio, fechaFin, fechaLimiteApartado, imagen, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, fechaFinApartado, imagen, estado || 'activo'];

    try {
      const [result] = await pool.execute(query, valores); // Usar el pool para ejecutar la consulta
      return { id: result.insertId, ...datosSorteo };
    } catch (error) {
      throw new Error('Error al crear el sorteo: ' + error.message);
    }
  }

  static async modificarSorteo(id, datosSorteo) {
    // Consulta SQL para actualizar un sorteo
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
      id // ID del sorteo a modificar
    ];

    try {
      const [result] = await pool.execute(query, valores); // Ejecuta la consulta de actualización
      if (result.affectedRows > 0) {
        return { id, ...datosSorteo }; // Si la actualización fue exitosa, devuelve los datos modificados
      } else {
        throw new Error('Sorteo no encontrado o no modificado');
      }
    } catch (error) {
      throw new Error('Error al modificar el sorteo: ' + error.message);
    }
  }
}

module.exports = SorteoRepository;

