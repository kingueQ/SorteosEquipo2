CREATE TABLE IF NOT EXISTS boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idSorteo INT NOT NULL,
    id_cliente INT,
    numero INT NOT NULL,
    estado ENUM('disponible', 'apartado', 'vendido') DEFAULT 'disponible',
    fechaApartado TIMESTAMP NULL,
    fechaVenta TIMESTAMP NULL
);