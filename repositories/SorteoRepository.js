// Contiene métodos de acceso a datos para Sorteo
// Ejemplo: Consultas a la base de datos para Sorteo

const { pool } = require('../config/dbConfig'); // Importar el pool de conexiones

class SorteoRepository {
  static async crearSorteo(datosSorteo) {
    const { idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, duracionApartado, imagen, estado } = datosSorteo;

    // Consulta SQL para insertar un nuevo sorteo
    const query = `
      INSERT INTO Sorteos (id_organizador, cantNumeros, precio, fechaInicio, fechaFin, duracionApartado, imagen, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [idOrganizador, cantNumeros, precio, fechaInicio, fechaFin, duracionApartado, imagen, estado || 'activo'];

    try {
      const [result] = await pool.execute(query, valores); // Usar el pool para ejecutar la consulta
      return { id: result.insertId, ...datosSorteo };
    } catch (error) {
      throw new Error('Error al crear el sorteo: ' + error.message);
    }
  }
}

module.exports = SorteoRepository;

