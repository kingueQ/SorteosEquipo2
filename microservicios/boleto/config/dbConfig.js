const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // Esto asegura que se use la base de datos correcta
});

async function initializeDatabase() {
    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();

        // Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);

        // Cargar y ejecutar el script SQL para crear la tabla si no existe
        const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'bdBoleto.sql'), 'utf8');
        await connection.query(sqlScript);

        console.log("Base de datos y tabla inicializadas correctamente.");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    } finally {
        // Liberar la conexión si es necesario
        if (connection) {
            await connection.release();
        }
    }
}

// Asegurarse de cerrar el pool cuando no se use más
process.on('exit', () => {
    pool.end();
});

module.exports = { initializeDatabase, pool }; // Exportar también el pool para usarlo en el repositorio
