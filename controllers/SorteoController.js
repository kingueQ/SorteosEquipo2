// Controlador para manejar la lógica de las rutas relacionadas con Sorteo
// Aquí se definirán los métodos de los endpoints para manejar sorteos

const SorteoService = require('./services/SorteoService');

class SorteoController {
    static async crearSorteo(req, res) {
        try {
            const nuevoSorteo = await SorteoService.crearSorteo(req.body);
            res.status(201).json(nuevoSorteo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SorteoController;
