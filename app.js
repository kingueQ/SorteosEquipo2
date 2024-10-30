require('dotenv').config();

const express = require('express');
const { initializeDatabase } = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor Express.');
});

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
