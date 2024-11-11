const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para inicializar la base de datos (solo una vez)
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // Cargar y ejecutar el script SQL para crear la tabla si no existe
    const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'bdSorteo.sql'), 'utf8');
    await connection.query(sqlScript);

    console.log("Base de datos y tablas inicializadas correctamente.");
    connection.release();  // Liberar la conexión para que el pool siga disponible

  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}

module.exports = { pool, initializeDatabase };
