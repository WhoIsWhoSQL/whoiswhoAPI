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
	gorro int not null,
	gafas int not null,
	calvo int not null,
	pendientes int not null,
	es_hombre int not null,
	es_mujer int not null,
	color_pelo varchar(100) not null,
	color_piel varchar(100) not null,
	PRIMARY KEY(Id) 
);


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Thomas','http://dfsfs/thomas.jpg',0,1,0,0,0,0,1,0,'marrón','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Max','http://dfsfs/max.jpg',1,0,0,0,0,0,1,0,'negro','negro')


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Sophie','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Lucas','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Philippe','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Joe','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Paul','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')


INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Peter','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Herman','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Charles','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Anne','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Bernard','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Michael','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Roger','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Maria','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Sarah','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Theo','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')
INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Eric','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Victor','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')
INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Stephen','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Hans','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Daniel','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')

INSERT INTO Personajes 
(name, img_picture, barba,bigote, gorro, gafas,calvo, pendientes, es_hombre, es_mujer, color_pelo, color_piel)
VALUES('Katrin','http://dfsfs/sophie.jpg',0,0,0,0,0,1,0,1,'negro','negro')



CREATE USER 'wiw_classic1'@'%' IDENTIFIED BY 'Av013k&3Wxk';

GRANT SELECT ON wiw_classic1.Personajes to 'wiw_classic1'@'%'
FLUSH PRIVILEGES ;

