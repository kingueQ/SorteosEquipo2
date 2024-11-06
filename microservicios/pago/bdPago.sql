CREATE DATABASE IF NOT EXISTS db_pagos;
USE db_pagos;

CREATE TABLE IF NOT EXISTS pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idSorteo INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fechaPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'completado', 'cancelado') DEFAULT 'pendiente'
);