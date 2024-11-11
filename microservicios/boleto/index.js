require('dotenv').config();
const express = require('express');
const { initializeDatabase } = require('./config/dbConfig'); // Importa la función de inicialización
const bodyParser = require('body-parser');
const cors = require('cors');
const boletosRoutes = require('./routes/boletoRoutes'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas
app.use('/api/v1/boletos', boletosRoutes);

// Inicializa la base de datos y luego inicia el servidor del microservicio de Sorteos
initializeDatabase().then(() => {
    app.listen(port, () => {
    console.log(`Microservicio de Boletos corriendo en http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("No se pudo inicializar la base de datos:", error);
});
