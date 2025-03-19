-- Oracle SQL Script para crear la base de datos y tablas

-- Eliminar restricciones antes de recrear las tablas
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE detalleordenes CASCADE CONSTRAINTS';
    EXECUTE IMMEDIATE 'DROP TABLE productos CASCADE CONSTRAINTS';
    EXECUTE IMMEDIATE 'DROP TABLE ordenes CASCADE CONSTRAINTS';
    EXECUTE IMMEDIATE 'DROP TABLE categorias CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN NULL;
END;
/

-- Crear esquema (en Oracle no se usa CREATE SCHEMA directamente)
-- Se debe crear un usuario y asignarle permisos en lugar de un esquema explícito
-- CREATE USER cafeteria IDENTIFIED BY password;
-- GRANT CONNECT, RESOURCE TO cafeteria;

-- Crear tabla categorias
CREATE TABLE categorias (
    id NUMBER(10) PRIMARY KEY,
    nombre VARCHAR2(145) NOT NULL
);

-- Crear tabla ordenes
CREATE TABLE ordenes (
    id NUMBER(10) PRIMARY KEY,
    fecha DATE NOT NULL,
    total NUMBER(8,2) DEFAULT 0.00 NOT NULL
);

-- Crear tabla productos
CREATE TABLE productos (
    id NUMBER(10) PRIMARY KEY,
    nombre VARCHAR2(145) NOT NULL,
    precio NUMBER(8,2) DEFAULT 0.00,
    idCategoria NUMBER(10) NOT NULL,
    CONSTRAINT fkcategoria FOREIGN KEY (idCategoria) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Crear tabla detalleordenes
CREATE TABLE detalleordenes (
    idorden NUMBER(10) NOT NULL,
    idproducto NUMBER(10) NOT NULL,
    cantidad NUMBER(10) NOT NULL,
    precio NUMBER(8,2) NOT NULL,
    PRIMARY KEY (idorden, idproducto),
    CONSTRAINT fkordenes FOREIGN KEY (idorden) REFERENCES ordenes(id) ON DELETE CASCADE,
    CONSTRAINT fkproductos FOREIGN KEY (idproducto) REFERENCES productos(id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX fkcategoria_idx ON productos (idCategoria);
CREATE INDEX fkproductos_idx ON detalleordenes (idproducto);
