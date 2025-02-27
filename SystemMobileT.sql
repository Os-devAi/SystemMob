CREATE DATABASE system_mobile;

USE system_mobile;

-- Crear la tabla 'estados'
CREATE TABLE estados(
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(20)
);

-- Insertar datos en la tabla 'estados'
INSERT INTO estados (estado) VALUES ('Activo');
INSERT INTO estados(estado) VALUES ('Inactivo');
INSERT INTO estados(estado) VALUES ('Pendiente');
INSERT INTO estados(estado) VALUES ('Reparando');
INSERT INTO estados(estado) VALUES ('Finalizado');
INSERT INTO estados(estado) VALUES ('Abandonado');

-- Crear la tabla 'categorias'
CREATE TABLE categorias(
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(50)
);

-- Insertar datos en la tabla 'categorias'
INSERT INTO categorias(categoria) VALUES ('Baterías');
INSERT INTO categorias(categoria) VALUES ('Pantallas');
INSERT INTO categorias(categoria) VALUES ('Tapas');
INSERT INTO categorias(categoria) VALUES ('Otros');

-- Crear la tabla 'usuarios'
CREATE TABLE usuarios(
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(50),
    usuario VARCHAR(50),
    email VARCHAR(50),
    clave VARCHAR(50),
    estado INT NOT NULL,
    FOREIGN KEY (estado) REFERENCES estados(status_id)
);

-- Crear la tabla 'productos' con corrección en las claves foráneas
CREATE TABLE productos(
    producto_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion VARCHAR(500),
    imagen VARCHAR(500),
    marca VARCHAR(50),
    stock INT,
    stock_min INT,
    categoria INT NOT NULL,
    estado INT NOT NULL,
    costo DECIMAL(10,2),
    precio DECIMAL(10,2),
    proveedor VARCHAR(100),
    fecha_actualizado DATETIME,
    FOREIGN KEY (categoria) REFERENCES categorias(categoria_id),
    FOREIGN KEY (estado) REFERENCES estados(status_id)
);

-- Crear tabla para ventas 
CREATE TABLE ventas(
	venta_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cliente VARCHAR(50),
    apellido_cliente VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(50),
    producto_id INT, 
    cantidad INT, 
    precio_venta DECIMAL(10,2),
    fecha_venta DATETIME,
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);

CREATE TABLE reparaciones(
	reparacion_id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(500),
    nombre_cliente VARCHAR(50),
    apellido_cliente VARCHAR(50),
    telefono VARCHAR(20),
    direccion VARCHAR(50),
    marca_telefono VARCHAR(50),
    modelo_telefono VARCHAR(100),
    tipo_reparacion VARCHAR(100),
    producto_id INT,
    estado_id INT,
    costo DECIMAL(10,2),
    precio DECIMAL(10,2),
    fecha_ingreaso DATETIME, 
    fecha_salida DATETIME, 
    hora_ingreso VARCHAR(10),
    hora_salida VARCHAR(10),
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id),
    FOREIGN KEY (estado_id) REFERENCES estados(status_id)
);