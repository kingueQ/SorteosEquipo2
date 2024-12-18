const express = require('express');
const { initializeDatabase } = require('./config/dbConfig'); // Importa la función de inicialización
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarioRoutes'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas
app.use('/api/v1/usuarios', usuariosRoutes);

// Inicializa la base de datos y luego inicia el servidor del microservicio de Sorteos
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Microservicio de Usuarios corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("No se pudo inicializar la base de datos:", error);
});
