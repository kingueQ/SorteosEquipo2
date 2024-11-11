const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Crear conexión a la base de datos
async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        // Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);

        // Cargar y ejecutar el script SQL para crear la tabla si no existe
        const sqlScript = fs.readFileSync(path.join(__dirname, 'bdSorteo.sql'), 'utf8');
        await connection.query(sqlScript);

        console.log("Base de datos y tabla inicializadas correctamente.");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    } finally {
        await connection.end();
    }
}

module.exports = { initializeDatabase };

