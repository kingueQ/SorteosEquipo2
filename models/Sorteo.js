class Sorteo {
    constructor(id, cantNumeros, precio, fechaInicio, fechaFin, duracionApartado, imagen, estado) {
        this.id = id; // tipo int
        this.cantNumeros = cantNumeros; // tipo int
        this.precio = precio; // tipo float
        this.fechaInicio = fechaInicio; // tipo Date
        this.fechaFin = fechaFin; // tipo Date
        this.duracionApartado = duracionApartado; // tipo int
        this.imagen = imagen; // tipo string
        this.estado = estado; // tipo string
    }
}