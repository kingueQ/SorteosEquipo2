const { pool } = require('../config/dbConfig'); // Importar el pool de conexiones

class BoletoRepository {
  // Método para crear un nuevo boleto
  static async crearBoleto(datosBoleto) {
    const { idSorteo, id_cliente, numero, estado } = datosBoleto;
    const query = `
      INSERT INTO boletos (idSorteo, id_cliente, numero, estado, fechaApartado, fechaVenta)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    // Asignar las fechas según el estado
    const fechaApartado = estado === 'apartado' ? new Date() : null;
    const fechaVenta = estado === 'vendido' ? new Date() : null;
    
    const valores = [idSorteo, id_cliente, numero, estado, fechaApartado, fechaVenta];

    try {
      const [result] = await pool.execute(query, valores); // Ejecutar la consulta
      return { id: result.insertId, ...datosBoleto, fechaApartado, fechaVenta };
    } catch (error) {
      throw new Error('Error al crear el boleto: ' + error.message);
    }
  }

  // Método para modificar un boleto existente
  static async modificarBoleto(id, datosBoleto) {
    const { id_cliente, numero, estado } = datosBoleto;

    const query = `
      UPDATE boletos
      SET 
        id_cliente = ?, 
        numero = ?, 
        estado = ?, 
        fechaApartado = ?, 
        fechaVenta = ?
      WHERE id = ?
    `;

    // Asignar fechas basadas en el estado
    const fechaApartado = estado === 'apartado' ? new Date() : null;
    const fechaVenta = estado === 'vendido' ? new Date() : null;

    const valores = [id_cliente, numero, estado, fechaApartado, fechaVenta, id];

    try {
      const [result] = await pool.execute(query, valores);
      if (result.affectedRows > 0) {
        return { id, ...datosBoleto, fechaApartado, fechaVenta };
      } else {
        throw new Error('Boleto no encontrado o no modificado');
      }
    } catch (error) {
      throw new Error('Error al modificar el boleto: ' + error.message);
    }
  }

  // Método para consultar un boleto por su ID
  static async consultarBoletoPorId(id) {
    const query = `
      SELECT id, idSorteo, id_cliente, numero, estado, fechaApartado, fechaVenta
      FROM boletos
      WHERE id = ?
    `;

    try {
      const [rows] = await pool.execute(query, [id]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      throw new Error('Error al consultar el boleto: ' + error.message);
    }
  }

  // Método para consultar todos los boletos
  static async consultarBoletos(idSorteo) {
    const query = `
      SELECT id, idSorteo, id_cliente, numero, estado, fechaApartado, fechaVenta
      FROM boletos
      WHERE idSorteo = ?
    `;

    try {
      const [rows] = await pool.execute(query, [idSorteo]);
      return rows;
    } catch (error) {
      throw new Error('Error al consultar los boletos: ' + error.message);
    }
  }
}

module.exports = BoletoRepository;
