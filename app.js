require('dotenv').config();

const express = require('express');
const { initializeDatabase } = require('./config/dbConfig');
const sorteoRoutes = require('./routes/SorteoRoutes'); // Importa las rutas de sorteo

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor Express.');
});

// Agrega las rutas de sorteo
app.use('/api/v1/sorteos', sorteoRoutes);

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo inicializar la base de datos:', error);
  });

module.exports = app;
