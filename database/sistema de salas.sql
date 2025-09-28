CREATE TABLE `Usuarios` (
	`id_usuario` INTEGER AUTO_INCREMENT,
	`nombre` VARCHAR(100) NOT NULL,
	`usuario` VARCHAR(50) NOT NULL UNIQUE,
	`contrasena` VARCHAR(100) NOT NULL,
	`rol` ENUM('ADMIN', 'CAJERO') NOT NULL,
	`fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id_usuario`)
);

CREATE TABLE `Clientes` (
	`id_cliente` INTEGER AUTO_INCREMENT,
	`nombre` VARCHAR(100) NOT NULL,
	`email` VARCHAR(100) UNIQUE,
	`telefono` VARCHAR(20),
	`tipo` ENUM('NORMAL', 'VIP') DEFAULT 'NORMAL',
	`fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id_cliente`)
);

CREATE TABLE `Salas` (
	`id_sala` INTEGER AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`capacidad` INTEGER NOT NULL,
	`tipo` ENUM('2D', '3D', '4DX', 'VIP') DEFAULT '2D',
	`estado` ENUM('ACTIVA', 'INACTIVA') DEFAULT 'ACTIVA',
	PRIMARY KEY(`id_sala`)
);

CREATE TABLE `Peliculas` (
	`id_pelicula` INTEGER AUTO_INCREMENT,
	`titulo` VARCHAR(200) NOT NULL,
	`genero` VARCHAR(50),
	`duracion` INTEGER,
	`clasificacion` VARCHAR(10),
	`estado` ENUM('EN_CARTELERA', 'RETIRADA') DEFAULT 'EN_CARTELERA',
	PRIMARY KEY(`id_pelicula`)
);

CREATE TABLE `Funciones` (
	`id_funcion` INTEGER AUTO_INCREMENT,
	`id_pelicula` INTEGER NOT NULL,
	`id_sala` INTEGER NOT NULL,
	`fecha` DATE NOT NULL,
	`hora` TIME NOT NULL,
	`precio` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY(`id_funcion`)
);

CREATE TABLE `Sillas` (
	`id_silla` INTEGER AUTO_INCREMENT,
	`id_sala` INTEGER NOT NULL,
	`bloque` ENUM('B1', 'B2') NOT NULL,
	-- Para fila: permitimos solo letras de la A a la M con regex o IN
	`fila` CHAR(1) NOT NULL CHECK (`fila` REGEXP '^[A-M]$'),
	-- Para numero: entre 1 y 10
	`numero` INTEGER NOT NULL CHECK (`numero` >= 1 AND `numero` <= 10),
	`tipo` ENUM('NORMAL', 'VIP') DEFAULT 'NORMAL',
	PRIMARY KEY(`id_silla`)
);

CREATE TABLE `Ventas` (
	`id_venta` INTEGER AUTO_INCREMENT,
	`id_cliente` INTEGER NOT NULL,
	`id_usuario` INTEGER NOT NULL,
	`fecha_venta` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`total` DECIMAL(10,2) NOT NULL,
	`estado` ENUM('RESERVADA', 'PAGADA') DEFAULT 'RESERVADA',
	PRIMARY KEY(`id_venta`)
);

CREATE TABLE `Detalle_Venta` (
	`id_detalle` INTEGER AUTO_INCREMENT,
	`id_venta` INTEGER NOT NULL,
	`id_funcion` INTEGER NOT NULL,
	`id_silla` INTEGER NOT NULL,
	`precio_unitario` DECIMAL(10,2) NOT NULL,
	`estado_silla` ENUM('OCUPADA', 'RESERVADA') DEFAULT 'RESERVADA',
	PRIMARY KEY(`id_detalle`)
);

CREATE TABLE `Log_Usuarios` (
	`id_log` INTEGER AUTO_INCREMENT,
	`id_usuario` INTEGER NOT NULL,
	`accion` VARCHAR(200),
	`fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`duracion_segundos` INTEGER,
	PRIMARY KEY(`id_log`)
);

-- Llaves foráneas
ALTER TABLE `Funciones`
ADD FOREIGN KEY(`id_pelicula`) REFERENCES `Peliculas`(`id_pelicula`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Funciones`
ADD FOREIGN KEY(`id_sala`) REFERENCES `Salas`(`id_sala`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Sillas`
ADD FOREIGN KEY(`id_sala`) REFERENCES `Salas`(`id_sala`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Ventas`
ADD FOREIGN KEY(`id_cliente`) REFERENCES `Clientes`(`id_cliente`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Ventas`
ADD FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Detalle_Venta`
ADD FOREIGN KEY(`id_venta`) REFERENCES `Ventas`(`id_venta`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Detalle_Venta`
ADD FOREIGN KEY(`id_funcion`) REFERENCES `Funciones`(`id_funcion`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Detalle_Venta`
ADD FOREIGN KEY(`id_silla`) REFERENCES `Sillas`(`id_silla`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `Log_Usuarios`
ADD FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`)
ON UPDATE NO ACTION ON DELETE NO ACTION;


insert into Clientes(nombre, email, telefono) values('Jorge', 'jorge123@gmail.com','123456');
select * from Clientes;