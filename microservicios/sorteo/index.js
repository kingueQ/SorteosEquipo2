const express = require('express');
const { initializeDatabase } = require('./config/dbConfig'); // Importa la función de inicialización
const bodyParser = require('body-parser');
const cors = require('cors');
const sorteosRoutes = require('./routes/sorteoRoutes'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas
app.use('/api/v1/sorteos', sorteosRoutes);

// Inicializa la base de datos y luego inicia el servidor del microservicio de Sorteos
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Microservicio de Sorteos corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("No se pudo inicializar la base de datos:", error);
});
