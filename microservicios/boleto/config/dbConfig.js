const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Crear el pool de conexiones (sin especificar base de datos para crearla primero)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Función para inicializar la base de datos (solo una vez)
async function initializeDatabase() {
    let connection;
    try {
        // Paso 1: Conectarse al servidor MySQL sin especificar base de datos
        connection = await pool.getConnection();
        
        // Paso 2: Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' asegurada.`);
        
        // Paso 3: Liberar la conexión para que el pool esté disponible
        connection.release();

        // Paso 4: Ahora que la base de datos existe, volver a conectarse especificando la base de datos
        const newConnection = await pool.getConnection();
        await newConnection.query(`USE \`${process.env.DB_NAME}\`;`);
        
        // Paso 5: Cargar y ejecutar el script SQL para crear las tablas
        const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'bdBoleto.sql'), 'utf8');
        await newConnection.query(sqlScript);

        console.log("Base de datos y tablas inicializadas correctamente.");
        newConnection.release(); // Liberar la nueva conexión

    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        if (connection) connection.release(); // Liberar la conexión en caso de error
    }
}

// Asegurarse de cerrar el pool cuando no se use más
process.on('exit', () => {
    pool.end();
});

module.exports = { initializeDatabase, pool }; // Exportar también el pool para usarlo en el repositorio
