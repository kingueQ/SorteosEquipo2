const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida con éxito.');
    await connection.end();
  } catch (error) {
    console.error('Ocurrió un error al conectarse a la base de datos:', error);
    process.exit(1); // Terminate the app if DB connection fails
  }
}

module.exports = {
  initializeDatabase,
};
