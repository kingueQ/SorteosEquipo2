const SorteoRepository = require('../repositories/SorteoRepository');

class SorteoService2 {

    // Método para validar el id del organizador
    static validarIdOrganizador(idOrganizador) {
        if (!idOrganizador || !Number.isInteger(idOrganizador) || idOrganizador <= 0) {
            return 'El idOrganizador debe ser un número entero positivo';
        }
        return null;
    }

    // Método para validar la cantidad de números
    static validarCantidadNumeros(cantNumeros) {
        if (!cantNumeros || !Number.isInteger(cantNumeros) || cantNumeros <= 0) {
            return 'La cantidad de números debe ser un número entero positivo';
        }
        return null;
    }

    // Método para validar el precio
    static validarPrecio(precio) {
        if (typeof precio !== 'number' || precio <= 0 || precio >= 3000) {
            return 'El precio debe ser un número decimal positivo y no debe ser mayor a 2999';
        }
        return null;
    }

    // Método para validar la fecha de inicio
    static validarFechaInicio(fechaInicio) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const [year, month, day] = fechaInicio.split('-').map(Number);
        const fechaInicioObj = new Date(year, month - 1, day);
        fechaInicioObj.setHours(0, 0, 0, 0);

        if (isNaN(fechaInicioObj.getTime()) || fechaInicioObj < hoy) {
            return 'La fecha de inicio debe ser una fecha válida igual o posterior a la fecha actual';
        }
        return null;
    }

    // Método para validar la fecha de fin
    static validarFechaFin(fechaInicio, fechaFin) {
        const [year1, month1, day1] = fechaInicio.split('-').map(Number);
        const fechaInicioObj = new Date(year1, month1 - 1, day1);

        const [year2, month2, day2] = fechaFin.split('-').map(Number);
        const fechaFinObj = new Date(year2, month2 - 1, day2);

        if (isNaN(fechaFinObj.getTime()) || fechaFinObj <= fechaInicioObj) {
            return 'La fecha de fin debe ser una fecha válida posterior a la fecha de inicio';
        }
        return null;
    }

    // Método para validar la fecha de fin de apartado
    static validarFechaFinApartado(fechaInicio, fechaFin, fechaFinApartado) {
        const [year1, month1, day1] = fechaInicio.split('-').map(Number);
        const fechaInicioObj = new Date(year1, month1 - 1, day1);

        const [year2, month2, day2] = fechaFin.split('-').map(Number);
        const fechaFinObj = new Date(year2, month2 - 1, day2);

        const [year3, month3, day3] = fechaFinApartado.split('-').map(Number);
        const fechaFinApartadoObj = new Date(year3, month3 - 1, day3);

        if (isNaN(fechaFinApartadoObj.getTime()) || fechaFinApartadoObj <= fechaInicioObj || fechaFinApartadoObj >= fechaFinObj) {
            return 'La fecha límite de apartado debe ser posterior a la fecha de inicio y anterior a la fecha fin del sorteo';
        }
        return null;
    }

    // Método para validar la imagen
    static validarImagen(imagen) {
        if (imagen !== undefined) {
            if (typeof imagen !== 'string' || imagen.trim() === '') {
                return 'La imagen debe ser una cadena no vacía que contenga la ruta de la imagen';
            } else {
                const extensionValida = /\.(jpg|png)$/i;
                if (!extensionValida.test(imagen.trim())) {
                    return 'La imagen debe tener una extensión válida (.jpg o .png)';
                }
            }
        }
        return null;
    }

    // Método para validar el estado
    static validarEstado(estado) {
        const estadosPermitidos = ['activo', 'finalizado', 'cancelado'];
        if (estado && !estadosPermitidos.includes(estado)) {
            return `El estado debe ser uno de los siguientes: ${estadosPermitidos.join(', ')}`;
        }
        return null;
    }

    // Método para crear un nuevo sorteo
    static async crearSorteo(datosSorteo) {
        const errores = {};

        // Validaciones individuales
        errores.idOrganizador = SorteoService2.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.cantNumeros = SorteoService2.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService2.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService2.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService2.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService2.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService2.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService2.validarEstado(datosSorteo.estado);

        // Filtramos los errores nulos
        Object.keys(errores).forEach(key => errores[key] === null && delete errores[key]);

        if (Object.keys(errores).length > 0) {
            const error = new Error(JSON.stringify(errores));
            error.message = errores;
            error.status = 400;
            throw error;
        }

        // Si no hay errores, crear el sorteo
        const sorteoCreado = await SorteoRepository.crearSorteo(datosSorteo);
        return sorteoCreado;
    }

    // Método para modificar un sorteo existente
    static async modificarSorteo(idSorteo, datosSorteo) {
        const errores = {};

        // Validaciones individuales
        errores.idOrganizador = SorteoService2.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.cantNumeros = SorteoService2.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService2.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService2.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService2.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService2.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService2.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService2.validarEstado(datosSorteo.estado);

        // Filtramos los errores nulos
        Object.keys(errores).forEach(key => errores[key] === null && delete errores[key]);

        if (Object.keys(errores).length > 0) {
            const error = new Error(JSON.stringify(errores));
            error.message = errores;
            error.status = 400;
            throw error;
        }

        // Si no hay errores, modificar el sorteo
        const sorteoModificado = await SorteoRepository.modificarSorteo(idSorteo, datosSorteo);
        return sorteoModificado;
    }

    static async actualizarSorteo(idSorteo, datosSorteo) {
        const errores = {};

        // Validaciones individuales
        errores.idOrganizador = SorteoService2.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.cantNumeros = SorteoService2.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService2.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService2.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService2.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService2.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService2.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService2.validarEstado(datosSorteo.estado);

        // Filtramos los errores nulos
        Object.keys(errores).forEach(key => errores[key] === null && delete errores[key]);

        if (Object.keys(errores).length > 0) {
            const error = new Error(JSON.stringify(errores));
            error.message = errores;
            error.status = 400;
            throw error;
        }

        // Si no hay errores, modificar el sorteo
        const sorteoModificado = await SorteoRepository.modificarSorteo(idSorteo, datosSorteo);
        return sorteoModificado;
    }

    static async consultarSorteo(id) {
        // Validación del ID para asegurarse de que es un número válido y positivo
        if (!id || isNaN(id) || id <= 0) {
            const error = new Error('El ID del sorteo debe ser un número entero positivo');
            error.status = 400; // Código de estado 400 para indicar un error de solicitud incorrecta
            throw error;
        }
    
        try {
            // Llama al repositorio para buscar el sorteo por ID
            const sorteo = await SorteoRepository.consultarSorteoPorId(id);
    
            // Si no se encuentra el sorteo, lanza un error
            if (!sorteo) {
                const error = new Error('Sorteo no encontrado');
                error.status = 404; // Código de estado 404 para indicar que no se encontró el sorteo
                throw error;
            }
    
            return sorteo; // Devuelve el sorteo encontrado
        } catch (error) {
            console.error('Error en service al consultarSorteo:', error.message);
            throw error; // Re-lanza el error para que sea manejado por el controlador
        }
    }
}

module.exports = SorteoService2;
