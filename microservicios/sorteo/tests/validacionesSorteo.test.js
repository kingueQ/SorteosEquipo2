const SorteoService = require('../services/SorteoService2');

describe('Validaciones de SorteoService', () => {
    it('Debe validar correctamente el idOrganizador', () => {
        expect(SorteoService.validarIdOrganizador(1)).toBeNull();
        expect(SorteoService.validarIdOrganizador(0)).toBe('El idOrganizador debe ser un número entero positivo');
        expect(SorteoService.validarIdOrganizador(-1)).toBe('El idOrganizador debe ser un número entero positivo');
        expect(SorteoService.validarIdOrganizador('abc')).toBe('El idOrganizador debe ser un número entero positivo');
    });

    it('Debe validar correctamente la cantidad de números', () => {
        expect(SorteoService.validarCantidadNumeros(10)).toBeNull();
        expect(SorteoService.validarCantidadNumeros(0)).toBe('La cantidad de números debe ser un número entero positivo');
        expect(SorteoService.validarCantidadNumeros(-5)).toBe('La cantidad de números debe ser un número entero positivo');
        expect(SorteoService.validarCantidadNumeros('abc')).toBe('La cantidad de números debe ser un número entero positivo');
    });

    it('Debe validar correctamente el precio', () => {
        expect(SorteoService.validarPrecio(100)).toBeNull();
        expect(SorteoService.validarPrecio(0)).toBe('El precio debe ser un número decimal positivo y no debe ser mayor a 2999');
        expect(SorteoService.validarPrecio(3000)).toBe('El precio debe ser un número decimal positivo y no debe ser mayor a 2999');
        expect(SorteoService.validarPrecio('abc')).toBe('El precio debe ser un número decimal positivo y no debe ser mayor a 2999');
    });

    it('Debe validar correctamente la fecha de inicio', () => {
        expect(SorteoService.validarFechaInicio('2024-12-01')).toBeNull();
        expect(SorteoService.validarFechaInicio('2020-01-01')).toBe('La fecha de inicio debe ser una fecha válida igual o posterior a la fecha actual');
    });

    it('Debe validar correctamente la fecha de fin', () => {
        expect(SorteoService.validarFechaFin('2024-11-01', '2024-11-02')).toBeNull();
        expect(SorteoService.validarFechaFin('2024-11-01', '2024-10-31')).toBe('La fecha de fin debe ser una fecha válida posterior a la fecha de inicio');
    });

    it('Debe validar correctamente la fecha de fin de apartado', () => {
        expect(SorteoService.validarFechaFinApartado('2024-11-01', '2024-11-03', '2024-11-02')).toBeNull();
        expect(SorteoService.validarFechaFinApartado('2024-11-01', '2024-11-02', '2024-11-03')).toBe('La fecha límite de apartado debe ser posterior a la fecha de inicio y anterior a la fecha fin del sorteo');
    });

    it('Debe validar correctamente la imagen', () => {
        expect(SorteoService.validarImagen('imagen.jpg')).toBeNull();
        expect(SorteoService.validarImagen('imagen.bmp')).toBe('La imagen debe tener una extensión válida (.jpg o .png)');
        expect(SorteoService.validarImagen('')).toBe('La imagen debe ser una cadena no vacía que contenga la ruta de la imagen');
    });

    it('Debe validar correctamente el estado', () => {
        expect(SorteoService.validarEstado('activo')).toBeNull();
        expect(SorteoService.validarEstado('inactivo')).toBe('El estado debe ser uno de los siguientes: activo, finalizado, cancelado');
    });
});