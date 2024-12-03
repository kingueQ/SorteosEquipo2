CREATE TABLE IF NOT EXISTS sorteos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_organizador INT NOT NULL,
    nombre VARCHAR(50),
    cantNumeros INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fechaInicio DATETIME NOT NULL,
    fechaFin DATETIME NOT NULL,
    fechaLimiteApartado DATETIME NOT NULL,
    imagen VARCHAR(255),
    estado VARCHAR(50) NOT NULL,
    creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);