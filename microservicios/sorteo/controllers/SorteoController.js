const SorteoService = require('../services/SorteoService');

class SorteoController {
    // Método para crear un nuevo sorteo
    static async crearSorteo(req, res) {
        try {
            const nuevoSorteo = await SorteoService.crearSorteo(req.body);
            res.status(201).json(nuevoSorteo); // Devuelve el sorteo recién creado
        } catch (error) {
            console.error('Error en crearSorteo:', error.message);

            // Enviar detalles de validación de vuelta al frontend
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Método para modificar un sorteo existente
    static async modificarSorteo(req, res) {
        const { id } = req.params; // Obtener el ID desde la ruta
        const datosActualizados = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

        try {
            const resultado = await SorteoService.modificarSorteo(id, datosActualizados);

            if (resultado) {
                res.status(200).json({ message: 'Sorteo actualizado con éxito', resultado });
            } else {
                res.status(404).json({ message: 'Sorteo no encontrado' });
            }
        } catch (error) {
            console.error('Error en modificarSorteo:', error.message);

            // Manejo de errores similar al de crearSorteo
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = SorteoController;