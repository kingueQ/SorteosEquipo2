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

  // Validaciones simples en el API Gateway
  if (!datosSorteo || !datosSorteo.idOrganizador || !datosSorteo.cantNumeros || !datosSorteo.precio) {
      return res.status(400).json({ error: 'Faltan campos obligatorios en el cuerpo de la solicitud' });
  }

  try {
      // Llama al microservicio o a la API interna
      const response = await axios.post('http://localhost:3001/api/v1/sorteos/crear', datosSorteo);

      // Si todo está bien, responde con los datos del sorteo creado y estado 201 (creado)
      res.status(201).json(response.data);
  } catch (error) {
      console.error('Error al crear sorteo:', error.message);

      if (error.response) {
        console.error('Error tiene response:', error.response.data.message);
          // Si el microservicio responde con error, propaga el estado y mensaje intactos
          res.status(error.response.status || 500).json({ message: error.response.data.message || 'Error en el servidor' });
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

// Redirige la solicitud POST a la ruta de creación del sorteo al microservicio
app.put('/api/v1/sorteos/modificar/:id', async (req, res) => {
  const { id } = req.params;  // Obtiene el ID del sorteo de los parámetros de la URL
  const datosSorteo = req.body;

  // Validaciones simples en el API Gateway
  if (!datosSorteo || !datosSorteo.idOrganizador || !datosSorteo.cantNumeros || !datosSorteo.precio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios en el cuerpo de la solicitud' });
  }

  // Validación adicional del ID (asegúrate de que es un número válido)
  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'El ID del sorteo debe ser un número entero positivo' });
  }

  try {
    // Llama al microservicio o a la API interna para modificar el sorteo
    const response = await axios.put(`http://localhost:3001/api/v1/sorteos/modificar/${id}`, datosSorteo);

    // Si todo está bien, responde con los datos del sorteo actualizado
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al modificar sorteo:', error.message);

    if (error.response) {
      console.error('Error tiene response:', error.response.data.message);
      // Si el microservicio responde con error, propaga el estado y mensaje intactos
      res.status(error.response.status || 500).json({ message: error.response.data.message || 'Error en el servidor' });
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
