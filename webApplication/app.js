require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Puerto específico para el front-end

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que devuelve el archivo de inicio del front-end
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio.html')); // Asegúrate de que 'index.html' esté en la carpeta 'public'
});

// Rutas adicionales para otras páginas o funcionalidades del front-end
// app.get('/otra-pagina', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'otra-pagina.html'));
// });

app.listen(PORT, () => {
  console.log(`Front-end corriendo en http://localhost:${PORT}`);
});

module.exports = app;
