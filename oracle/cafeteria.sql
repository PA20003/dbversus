-- Eliminar la parte del contenedor (no se aplica a Oracle XE 11g)
-- ALTER SESSION SET CONTAINER = cafeteria;

-- Crear el tablespace 'USERS' si no existe
BEGIN
  EXECUTE IMMEDIATE 'CREATE TABLESPACE USERS DATAFILE ''/opt/oracle/oradata/cafeteria/users01.dbf'' SIZE 100M AUTOEXTEND ON';
  EXCEPTION
    WHEN OTHERS THEN
      IF SQLCODE = -1543 THEN
        DBMS_OUTPUT.PUT_LINE('Tablespace USERS already exists.');
      ELSE
        RAISE;
      END IF;
END;
/

-- Crear usuario y asignar permisos
CREATE USER cafeteria IDENTIFIED BY oracle
DEFAULT TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;
ALTER USER cafeteria QUOTA UNLIMITED ON USERS;

GRANT CONNECT TO cafeteria;
GRANT RESOURCE TO cafeteria;
GRANT CREATE SESSION TO cafeteria;    

-- Cambiar al esquema de 'cafeteria'
ALTER SESSION SET CURRENT_SCHEMA = cafeteria;

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

-- Insertar datos de ejemplo en categorias
INSERT INTO categorias (id, nombre) VALUES (1, 'Bebidas');
INSERT INTO categorias (id, nombre) VALUES (2, 'Comidas');

-- Insertar datos de ejemplo en productos
INSERT INTO productos (id, nombre, precio, idCategoria) VALUES (1, 'Café', 25.00, 1);
INSERT INTO productos (id, nombre, precio, idCategoria) VALUES (2, 'Sandwich', 30.00, 2);

-- Insertar datos de ejemplo en ordenes
INSERT INTO ordenes (id, fecha, total) VALUES (1, TO_DATE('2025-03-22', 'yyyy-mm-dd'), 55.00);

-- Insertar datos de ejemplo en detalleordenes
INSERT INTO detalleordenes (idorden, idproducto, cantidad, precio) VALUES (1, 1, 2, 25.00);
INSERT INTO detalleordenes (idorden, idproducto, cantidad, precio) VALUES (1, 2, 1, 30.00);

COMMIT;

-- Otorgar permisos por tabla específica en lugar de en el esquema
GRANT SELECT, INSERT, UPDATE, DELETE ON categorias TO cafeteria;
GRANT SELECT, INSERT, UPDATE, DELETE ON ordenes TO cafeteria;
GRANT SELECT, INSERT, UPDATE, DELETE ON productos TO cafeteria;
GRANT SELECT, INSERT, UPDATE, DELETE ON detalleordenes TO cafeteria;

COMMIT;
