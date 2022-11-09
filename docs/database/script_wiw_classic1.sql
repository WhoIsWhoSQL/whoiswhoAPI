DROP DATABASE IF EXISTS wiw_classic1;
CREATE DATABASE wiw_classic1;
USE wiw_classic1;
drop table if exists wiw_classic1.Personajes;
CREATE TABLE wiw_classic1.Personajes (
	Id INT auto_increment NOT NULL,
	name nvarchar(100) NOT NULL,
	img_picture varchar(255) NOT NULL,
	barba int not null,
	bigote int not null,
	gafas int not null,
	pendientes int not null,
	es_hombre int not null,
	es_mujer int not null,
	es_afroamericano int not null,
	color_pelo varchar(100) not null,
	color_camiseta varchar(100) not null,
	PRIMARY KEY(Id) 
);




CREATE USER 'wiw_classic1'@'%' IDENTIFIED BY 'Av013k&3Wxk';

GRANT SELECT ON wiw_classic1.Personajes to 'wiw_classic1'@'%'
FLUSH PRIVILEGES ;

