-- Base de datos
CREATE DATABASE IF NOT EXISTS sorteos;
USE sorteos;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    contrasena VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'organizador') NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Sorteos
CREATE TABLE Sorteos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_organizador INT NOT NULL,
    cantNumeros INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    duracionApartado INT, -- Duración en días que un número puede estar apartado
    imagen VARCHAR(255),
    estado ENUM('activo', 'finalizado', 'cancelado') DEFAULT 'activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_organizador) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabla de Boletos
CREATE TABLE Boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sorteo INT NOT NULL,
    id_cliente INT,
    numero INT NOT NULL,
    estado ENUM('libre', 'apartado', 'vendido') DEFAULT 'libre',
    apartado_en TIMESTAMP NULL,
    FOREIGN KEY (id_sorteo) REFERENCES Sorteos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES Usuarios(id) ON DELETE SET NULL,
    UNIQUE (id_sorteo, numero) -- Un número único por sorteo
);

-- Tabla de Pagos
CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_boleto INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fechaPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comprobantePago VARCHAR(255),
    FOREIGN KEY (id_boleto) REFERENCES Boletos(id) ON DELETE CASCADE
);

SELECT * FROM Usuarios;
SELECT * FROM Sorteos;
SELECT * FROM Boletos;
SELECT * FROM Pagos;
