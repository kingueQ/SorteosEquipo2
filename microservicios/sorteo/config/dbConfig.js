require('dotenv').config(); // Esto carga las variables del archivo .env

const mysql = require('mysql2/promise');

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Límite de conexiones en el pool
  queueLimit: 0
});

async function initializeDatabase() {
  try {
    // Probar la conexión inicial con el pool
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida con éxito.');
    connection.release(); // Liberar la conexión de vuelta al pool
  } catch (error) {
    console.error('Ocurrió un error al conectarse a la base de datos:', error);
    process.exit(1); // Terminar la aplicación si falla la conexión a la BD
  }
}

module.exports = {
  pool, // Exportar el pool para su uso en el repositorio
  initializeDatabase,
};
