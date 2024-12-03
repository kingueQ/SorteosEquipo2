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

    static async actualizarSorteo(req, res) {
        const { id } = req.params; // Obtener el ID desde la ruta
        const datosActualizados = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

        try {
            const resultado = await SorteoService.actualizarSorteo(id, datosActualizados);

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

    static async consultarSorteo(req, res) {
        const { id } = req.params; // Obtiene el ID del sorteo de los parámetros de la URL
    
        try {
            // Llama al servicio para consultar el sorteo
            const sorteo = await SorteoService.consultarSorteo(id);
    
            if (!sorteo) {
                // Si no se encuentra el sorteo, devuelve un error 404
                return res.status(404).json({ error: 'Sorteo no encontrado' });
            }
    
            res.status(200).json(sorteo); // Devuelve los datos del sorteo encontrado
        } catch (error) {
            console.error('Error en controller al consultarSorteo:', error.message);
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    static async listarSorteos(req, res) { // Asegúrate de incluir los parámetros req, res
        try {
            // Llama al servicio para consultar el sorteo
            const sorteos = await SorteoService.listarSorteos();
    
            if (sorteos.length <= 0) {
                // Si no se encuentra el sorteo, devuelve un error 404
                return res.status(404).json({ error: 'Ningún sorteo fue encontrado' });
            }
    
            res.status(200).json(sorteos); // Devuelve los datos del sorteo encontrado
        } catch (error) {
            console.error('Error en controller al listar sorteos:', error.message);
            res.status(error.status || 500).json({ message: error.message });
        }
    }
    
    static async listarSorteosVigentes(req, res) { // Asegúrate de incluir los parámetros req, res
        try {
            // Llama al servicio para consultar el sorteo
            const sorteos = await SorteoService.listarSorteosVigentes();
    
            if (sorteos.length <= 0) {
                // Si no se encuentra el sorteo, devuelve un error 404
                return res.status(404).json({ error: 'Ningún sorteo fue encontrado' });
            }
    
            res.status(200).json(sorteos); // Devuelve los datos del sorteo encontrado
        } catch (error) {
            console.error('Error en controller al listar sorteos:', error.message);
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = SorteoController;
