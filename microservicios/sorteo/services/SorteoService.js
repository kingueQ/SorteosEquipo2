const SorteoRepository = require('../repositories/SorteoRepository');

class SorteoService {

    // Método para validar el id del organizador
    static validarIdOrganizador(idOrganizador) {
        if (!idOrganizador || !Number.isInteger(idOrganizador) || idOrganizador <= 0) {
            return 'El idOrganizador debe ser un número entero positivo';
        }
        return null;
    }

    // Método para validar el nombre
    static validarNombre(nombre) {
        if (nombre !== undefined) {
            if (typeof nombre !== 'string' || nombre.trim() === '') {
                return 'El nombre no puede estar vacío';
            } else {
                if(nombre.length>50){
                    return 'El nombre debe tener 50 o menos caracteres';
                }
            }
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

        if (isNaN(fechaInicioObj.getTime())) {
            return 'La fecha de inicio debe ser una fecha válida';
        }

        // Validar rango de años (1900-2100)
        if (year < 2024 || year > 2100) {
            return 'El año de la fecha de inicio debe estar entre 2024 y 2100';
        }

        // Validar que la fecha no sea anterior a hoy
        if (fechaInicioObj < hoy) {
            return 'La fecha de inicio no debe ser anterior a la fecha actual';
        }

        return null;
    }

    // Método para validar la fecha de fin
    static validarFechaFin(fechaInicio, fechaFin) {
        const [year1, month1, day1] = fechaInicio.split('-').map(Number);
        const fechaInicioObj = new Date(year1, month1 - 1, day1);

        const [year2, month2, day2] = fechaFin.split('-').map(Number);
        const fechaFinObj = new Date(year2, month2 - 1, day2);

        if (isNaN(fechaFinObj.getTime())) {
            return 'La fecha de fin debe ser una fecha válida';
        }

        // Validar rango de años (1900-2100)
        if (year2 < 2024 || year2 > 2100) {
            return 'El año de la fecha de fin debe estar entre 2024 y 2100';
        }

        // Validar que la fecha de fin sea posterior a la fecha de inicio
        if (fechaFinObj <= fechaInicioObj) {
            return 'La fecha de fin debe ser posterior a la fecha de inicio';
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

        if (isNaN(fechaFinApartadoObj.getTime())) {
            return 'La fecha límite de apartado debe ser una fecha válida';
        }

        // Validar rango de años (1900-2100)
        if (year3 < 2024 || year3 > 2100) {
            return 'El año de la fecha límite de apartado debe estar entre 2024 y 2100';
        }

        // Validar que la fecha de fin de apartado sea posterior a la fecha de inicio
        if (fechaFinApartadoObj <= fechaInicioObj) {
            return 'La fecha límite de apartado debe ser posterior a la fecha de inicio';
        }

        // Validar que la fecha de fin de apartado sea anterior a la fecha de fin
        if (fechaFinApartadoObj >= fechaFinObj) {
            return 'La fecha límite de apartado debe ser anterior a la fecha de fin';
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
        errores.idOrganizador = SorteoService.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.nombre = SorteoService.validarNombre(datosSorteo.nombre);
        errores.cantNumeros = SorteoService.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService.validarEstado(datosSorteo.estado);

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
        errores.idOrganizador = SorteoService.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.nombre = SorteoService.validarNombre(datosSorteo.nombre);
        errores.cantNumeros = SorteoService.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService.validarEstado(datosSorteo.estado);

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
        errores.idOrganizador = SorteoService.validarIdOrganizador(datosSorteo.idOrganizador);
        errores.nombre = SorteoService.validarNombre(datosSorteo.nombre);
        errores.cantNumeros = SorteoService.validarCantidadNumeros(datosSorteo.cantNumeros);
        errores.precio = SorteoService.validarPrecio(datosSorteo.precio);
        errores.fechaInicio = SorteoService.validarFechaInicio(datosSorteo.fechaInicio);
        errores.fechaFin = SorteoService.validarFechaFin(datosSorteo.fechaInicio, datosSorteo.fechaFin);
        errores.fechaFinApartado = SorteoService.validarFechaFinApartado(datosSorteo.fechaInicio, datosSorteo.fechaFin, datosSorteo.fechaFinApartado);
        errores.imagen = SorteoService.validarImagen(datosSorteo.imagen);
        errores.estado = SorteoService.validarEstado(datosSorteo.estado);

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
  
    static async listarSorteos() {
        try {
            // Llama al repositorio para buscar el sorteo por ID
            const sorteos = await SorteoRepository.listarSorteos();

            // Si no se encuentra el sorteo, lanza un error
            if (sorteos.length <= 0) {
                const error = new Error('Ningún sorteo fue encontrado');
                error.status = 404; // Código de estado 404 para indicar que no se encontró el sorteo
                throw error;
            }

            return sorteos; // Devuelve el sorteo encontrado
        } catch (error) {
            console.error('Error en service al listar sorteos:', error.message);
            throw error; // Re-lanza el error para que sea manejado por el controlador
        }
    }

    static async listarSorteosVigentes() {
        try {
            // Llama al repositorio para buscar el sorteo por ID
            const sorteos = await SorteoRepository.listarSorteosVigentes();

            // Si no se encuentra el sorteo, lanza un error
            if (sorteos==null || sorteos.length <= 0) {
                const error = new Error('Ningún sorteo fue encontrado');
                error.status = 404; // Código de estado 404 para indicar que no se encontró el sorteo
                throw error;
            }

            return sorteos; // Devuelve el sorteo encontrado
        } catch (error) {
            console.error('Error en service al listar sorteos:', error.message);
            throw error; // Re-lanza el error para que sea manejado por el controlador
        }
    }
}

module.exports = SorteoService;
