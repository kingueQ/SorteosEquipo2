const BoletoRepository = require('../repositories/BoletoRepository');

class BoletoService {
    // Método para crear un nuevo boleto
    static async crearBoleto(datosBoleto) {
        const { idSorteo, id_cliente, numero, estado } = datosBoleto;

        // Objeto para almacenar errores de validación
        const errores = {};

        // Validaciones
        if (!idSorteo || !numero || !estado) {
            errores.campoObligatorio = 'Todos los campos obligatorios deben estar presentes';
        }

        if (idSorteo && (!Number.isInteger(idSorteo) || idSorteo <= 0)) {
            errores.idSorteo = 'El idSorteo debe ser un número entero positivo';
        }

        if (numero && (!Number.isInteger(numero) || numero <= 0)) {
            errores.numero = 'El número debe ser un número entero positivo';
        }

        const estadosPermitidos = ['disponible', 'apartado', 'vendido'];
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

        // Asignación automática de fechas basado en el estado
        const fechaActual = new Date();
        let fechaApartado = null;
        let fechaVenta = null;

        if (estado === 'apartado') {
            fechaApartado = fechaActual;
        } else if (estado === 'vendido') {
            fechaVenta = fechaActual;
        }

        // Crear el objeto de boleto con las fechas asignadas
        const boletoCreado = await BoletoRepository.crearBoleto({
            idSorteo,
            id_cliente,
            numero,
            estado,
            fechaApartado,
            fechaVenta
        });

        return boletoCreado;
    }

    // Método para modificar un boleto existente
    static async modificarBoleto(idBoleto, datosBoleto) {
        const { idSorteo, id_cliente, numero, estado } = datosBoleto;

        // Objeto para almacenar errores de validación
        const errores = {};

        // Validaciones
        if (!idSorteo || !numero || !estado) {
            errores.campoObligatorio = 'Todos los campos obligatorios deben estar presentes';
        }

        if (idSorteo && (!Number.isInteger(idSorteo) || idSorteo <= 0)) {
            errores.idSorteo = 'El idSorteo debe ser un número entero positivo';
        }

        if (numero && (!Number.isInteger(numero) || numero <= 0)) {
            errores.numero = 'El número debe ser un número entero positivo';
        }

        const estadosPermitidos = ['disponible', 'apartado', 'vendido'];
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

        // Asignación automática de fechas basado en el estado
        const fechaActual = new Date();
        let fechaApartado = null;
        let fechaVenta = null;

        if (estado === 'apartado') {
            fechaApartado = fechaActual;
        } else if (estado === 'vendido') {
            fechaVenta = fechaActual;
        }

        // Modificar el boleto con las fechas asignadas
        const boletoModificado = await BoletoRepository.modificarBoleto(idBoleto, {
            idSorteo,
            id_cliente,
            numero,
            estado,
            fechaApartado,
            fechaVenta
        });

        return boletoModificado;
    }

    static async consultarBoleto(id) {
        if (!id || isNaN(id) || id <= 0) {
            const error = new Error('El ID del boleto debe ser un número entero positivo');
            error.status = 400;
            throw error;
        }

        try {
            const boleto = await BoletoRepository.consultarBoletoPorId(id);
            if (!boleto) {
                const error = new Error('Boleto no encontrado');
                error.status = 404;
                throw error;
            }

            return boleto;
        } catch (error) {
            console.error('Error en consultarBoleto:', error.message);
            throw error;
        }
    }

    static async consultarBoletos(idSorteo) {
        if (!idSorteo || isNaN(idSorteo) || idSorteo <= 0) {
            const error = new Error('El ID del sorteo debe ser un número entero positivo');
            error.status = 400;
            throw error;
        }

        try {
            // Llama al repositorio para obtener todos los boletos
            const boletos = await BoletoRepository.consultarBoletos(idSorteo);
            return boletos;
        } catch (error) {
            console.error('Error en consultarBoletos:', error.message);
            throw new Error('Error al consultar los boletos');
        }
    }
}

module.exports = BoletoService;
