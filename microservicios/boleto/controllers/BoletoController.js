const BoletoService = require('../services/BoletoService');

class BoletoController {
    // Método para crear un nuevo boleto
    static async crearBoleto(req, res) {
        try {
            const nuevoBoleto = await BoletoService.crearBoleto(req.body);
            res.status(201).json(nuevoBoleto); // Devuelve el boleto recién creado
        } catch (error) {
            console.error('Error en crearBoleto:', error.message);

            // Enviar detalles de validación de vuelta al frontend
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Método para modificar un boleto existente
    static async modificarBoleto(req, res) {
        const { id } = req.params; // Obtener el ID desde la ruta
        const datosActualizados = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

        try {
            const resultado = await BoletoService.modificarBoleto(id, datosActualizados);

            if (resultado) {
                res.status(200).json({ message: 'Boleto actualizado con éxito', resultado });
            } else {
                res.status(404).json({ message: 'Boleto no encontrado' });
            }
        } catch (error) {
            console.error('Error en modificarBoleto:', error.message);

            // Manejo de errores similar al de crearBoleto
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Método para consultar un boleto por su ID
    static async consultarBoleto(req, res) {
        const { id } = req.params; // Obtiene el ID del boleto de los parámetros de la URL
    
        try {
            // Llama al servicio para consultar el boleto
            const boleto = await BoletoService.consultarBoleto(id);
    
            if (!boleto) {
                // Si no se encuentra el boleto, devuelve un error 404
                return res.status(404).json({ error: 'Boleto no encontrado' });
            }
    
            res.status(200).json(boleto); // Devuelve los datos del boleto encontrado
        } catch (error) {
            console.error('Error en consultarBoleto:', error.message);
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Método para consultar todos los boletos
    static async consultarBoletos(req, res) {
        const { idSorteo } = req.params; // Obtiene el ID del boleto de los parámetros de la URL

        try {
            // Llama al servicio para obtener todos los boletos
            const boletos = await BoletoService.consultarBoletos(idSorteo);
            res.status(200).json(boletos); // Devuelve la lista de boletos
        } catch (error) {
            console.error('Error en consultarTodos:', error.message);
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = BoletoController;
