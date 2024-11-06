const SorteoRepository = require('../repositories/SorteoRepository');

class SorteoService {
    // Método para crear un nuevo sorteo
    static async crearSorteo(datosSorteo) {
        const {
            idOrganizador,
            cantNumeros,
            precio,
            fechaInicio,
            fechaFin,
            fechaFinApartado,
            imagen,
            estado
        } = datosSorteo;

        // Objeto para almacenar errores de validación
        const errores = {};

        // Validaciones
        if (!idOrganizador || !cantNumeros || !precio || !fechaInicio || !fechaFin) {
            errores.campoObligatorio = 'Todos los campos obligatorios deben estar presentes';
        }

        if (idOrganizador && (!Number.isInteger(idOrganizador) || idOrganizador <= 0)) {
            errores.idOrganizador = 'El idOrganizador debe ser un número entero positivo';
        }

        if (cantNumeros && (!Number.isInteger(cantNumeros) || cantNumeros <= 0)) {
            errores.cantNumeros = 'La cantidad de números debe ser un número entero positivo';
        }

        if (precio && (typeof precio !== 'number' || precio <= 0 || precio > 1000)) {
            errores.precio = 'El precio debe ser un número decimal positivo y no debe ser mayor a 1000';
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const [year1, month1, day1] = fechaInicio.split('-').map(Number);
        const fechaInicioObj = new Date(year1, month1 - 1, day1);
        fechaInicioObj.setHours(0, 0, 0, 0);

        const [year2, month2, day2] = fechaFin.split('-').map(Number);
        const fechaFinObj = new Date(year2, month2 - 1, day2);
        fechaFinObj.setHours(0, 0, 0, 0);

        const [year3, month3, day3] = fechaFinApartado.split('-').map(Number);
        const fechaFinApartadoObj = new Date(year3, month3 - 1, day3);
        fechaFinApartadoObj.setHours(0, 0, 0, 0);

        if (isNaN(fechaInicioObj.getTime()) || fechaInicioObj < hoy) {
            errores.fechaInicio = 'La fecha de inicio debe ser una fecha válida posterior a la fecha actual';
        }

        if (isNaN(fechaInicioObj.getTime()) || fechaInicioObj < hoy) {
            errores.fechaInicio = 'La fecha de inicio debe ser una fecha válida posterior a la fecha actual';
        }

        if (isNaN(fechaFinObj.getTime()) || fechaFinObj <= fechaInicioObj) {
            errores.fechaFin = 'La fecha de fin debe ser una fecha válida posterior a la fecha de inicio';
        }

        if (isNaN(fechaFinApartadoObj.getTime()) || fechaFinApartadoObj <= fechaInicioObj || fechaFinApartadoObj >= fechaFinObj) {
            errores.fechaFinApartado = 'La fecha límite de apartado debe ser posterior a la fecha de inicio y anterior a la fecha fin del sorteo';
        }

        if (imagen !== undefined && (typeof imagen !== 'string' || imagen.trim() === '')) {
            errores.imagen = 'La imagen debe ser una cadena no vacía que contenga la ruta de la imagen';
        }

        const estadosPermitidos = ['activo', 'finalizado', 'cancelado'];
        if (estado && !estadosPermitidos.includes(estado)) {
            errores.estado = `El estado debe ser uno de los siguientes: ${estadosPermitidos.join(', ')}`;
        }

        // Si existen errores de validación, lanzamos un error con los detalles
        if (Object.keys(errores).length > 0) {
            const error = new Error(JSON.stringify(errores));
            error.message = errores;
            error.status = 400; // Se agrega el código de estado 400 para facilitar la gestión de errores
            throw error;
        }

        // Si no hay errores, crear el sorteo
        const sorteoCreado = await SorteoRepository.crearSorteo(datosSorteo);
        return sorteoCreado;
    }

    // Método para modificar un sorteo existente
    static async modificarSorteo(idSorteo, datosSorteo) {
        const {
            idOrganizador,
            cantNumeros,
            precio,
            fechaInicio,
            fechaFin,
            fechaFinApartado,
            imagen,
            estado
        } = datosSorteo;

        // Objeto para almacenar errores de validación
        const errores = {};

        // Validación del idSorteo
        if (!idSorteo || !Number.isInteger(idSorteo) || idSorteo <= 0) {
            errores.idSorteo = 'El idSorteo debe ser un número entero positivo';
        }

        // Validaciones para los datosSorteo
        if (idOrganizador !== undefined) {
            if (!Number.isInteger(idOrganizador) || idOrganizador <= 0) {
                errores.idOrganizador = 'El idOrganizador debe ser un número entero positivo';
            }
        }

        if (cantNumeros !== undefined) {
            if (!Number.isInteger(cantNumeros) || cantNumeros <= 0) {
                errores.cantNumeros = 'La cantidad de números debe ser un número entero positivo';
            }
        }

        if (precio !== undefined) {
            if (typeof precio !== 'number' || precio <= 0) {
                errores.precio = 'El precio debe ser un número decimal positivo';
            }
        }

        const hoy = new Date();
        const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : null;
        const fechaFinObj = fechaFin ? new Date(fechaFin) : null;
        const fechaFinApartadoObj = fechaFinApartado ? new Date(fechaFinApartado) : null;

        if (fechaInicioObj !== null) {
            if (isNaN(fechaInicioObj.getTime()) || fechaInicioObj <= hoy) {
                errores.fechaInicio = 'La fecha de inicio debe ser una fecha válida posterior a la fecha actual';
            }
        }

        if (fechaFinObj !== null) {
            if (isNaN(fechaFinObj.getTime()) || (fechaInicioObj && fechaFinObj <= fechaInicioObj)) {
                errores.fechaFin = 'La fecha de fin debe ser una fecha válida posterior a la fecha de inicio';
            }
        }

        if (fechaFinApartadoObj !== null) {
            if (isNaN(fechaFinApartadoObj.getTime()) ||
                (fechaInicioObj && fechaFinApartadoObj <= fechaInicioObj) ||
                (fechaFinObj && fechaFinApartadoObj >= fechaFinObj)) {
                errores.fechaFinApartado = 'La fecha límite de apartado debe ser posterior a la fecha de inicio y anterior a la fecha fin del sorteo';
            }
        }

        if (imagen !== undefined) {
            if (typeof imagen !== 'string' || imagen.trim() === '') {
                errores.imagen = 'La imagen debe ser una cadena no vacía que contenga la ruta de la imagen';
            }
        }

        const estadosPermitidos = ['activo', 'finalizado', 'cancelado'];
        if (estado !== undefined) {
            if (!estadosPermitidos.includes(estado)) {
                errores.estado = `El estado debe ser uno de los siguientes: ${estadosPermitidos.join(', ')}`;
            }
        }

        // Si existen errores de validación, lanzamos un error con los detalles
        if (Object.keys(errores).length > 0) {
            const error = new Error(JSON.stringify(errores));
            error.message = errores;
            error.status = 400; // Se agrega el código de estado 400 para facilitar la gestión de errores
            throw error;
        }

        // Si no hay errores, modificar el sorteo
        const sorteoModificado = await SorteoRepository.modificarSorteo(idSorteo, datosSorteo);
        return sorteoModificado;
    }

}

module.exports = SorteoService;
