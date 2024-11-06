const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Redirige la solicitud POST a la ruta de creación del sorteo al microservicio
app.post('/api/v1/sorteos/crear', async (req, res) => {
  const datosSorteo = req.body;

  // Validaciones simples en el API Gateway (si se necesitan más validaciones, implementarlas aquí)
  if (!datosSorteo || !datosSorteo.idOrganizador || !datosSorteo.cantNumeros || !datosSorteo.precio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios en el cuerpo de la solicitud' });
  }

  try {
    const response = await axios.post('http://localhost:3001/api/v1/sorteos/crear', datosSorteo);

    // Si todo está bien, responde con los datos del sorteo creado y estado 201 (creado)
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al crear sorteo:', error.message);

    if (error.response) {
      // Si el microservicio responde con error
      const detallesError = error.response.data;
      res.status(error.response.status).json(detallesError);
    } else if (error.request) {
      // Si no hubo respuesta del microservicio
      console.error('No se recibió respuesta del servidor:', error.request);
      res.status(500).json({ error: 'No se recibió respuesta del servidor' });
    } else {
      // Error en la configuración de la solicitud
      console.error('Error al configurar la solicitud:', error.message);
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
});

// Levanta el servidor
app.listen(port, () => {
  console.log(`API Gateway corriendo en http://localhost:${port}`);
});
