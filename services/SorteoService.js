// Contiene la lógica de negocio de Sorteo
// Ejemplo: Crear, actualizar, y validar sorteos

const SorteoRepository = require('./repositories/SorteoRepository');

class SorteoService {
    static async crearSorteo(datosSorteo) {
        
        const {
            idOrganizador,
            cantNumeros,
            precio,
            fechaInicio,
            fechaFin,
            duracionApartado,
            imagen,
            estado
        } = datosSorteo;

        if (!idOrganizador || !cantNumeros || !precio || !fechaInicio || !fechaFin) {
            throw new Error('Todos los campos obligatorios deben estar presentes');
        }

        if (!Number.isInteger(idOrganizador) || idOrganizador <= 0) {
            throw new Error('El idOrganizador debe ser un número entero positivo');
        }

        if (!Number.isInteger(cantNumeros) || cantNumeros <= 0) {
            throw new Error('La cantidad de números debe ser un número entero positivo');
        }

        
        if (typeof precio !== 'number' || precio <= 0) {
            throw new Error('El precio debe ser un número decimal positivo');
        }

        const hoy = new Date();
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);

        if (isNaN(fechaInicioObj.getTime()) || fechaInicioObj <= hoy) {
            throw new Error('La fecha de inicio debe ser una fecha válida posterior a la fecha actual');
        }

        if (isNaN(fechaFinObj.getTime()) || fechaFinObj <= fechaInicioObj) {
            throw new Error('La fecha de fin debe ser una fecha válida posterior a la fecha de inicio');
        }

        if (duracionApartado !== undefined && (!Number.isInteger(duracionApartado) || duracionApartado < 0)) {
            throw new Error('La duración del apartado debe ser un número entero positivo o cero');
        }

        if (imagen !== undefined && (typeof imagen !== 'string' || imagen.trim() === '')) {
            throw new Error('La imagen debe ser una cadena no vacía que contenga la ruta de la imagen');
        }

        const estadosPermitidos = ['activo', 'finalizado', 'cancelado'];
        if (estado !== undefined && !estadosPermitidos.includes(estado)) {
            throw new Error(`El estado debe ser uno de los siguientes: ${estadosPermitidos.join(', ')}`);
        }

        const sorteoCreado = await SorteoRepository.crearSorteo(datosSorteo);
        return sorteoCreado;
    }
}

module.exports = SorteoService;

