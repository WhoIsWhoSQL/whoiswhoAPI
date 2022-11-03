DROP DATABASE IF EXISTS whoiswho;
CREATE DATABASE whoiswho;
USE whoiswho;
CREATE TABLE whoiswho.users (
	userId INT auto_increment NOT NULL,
	name nvarchar(100) NOT NULL,
	email varchar(100) NOT NULL UNIQUE,
	isTeacher int not null,
	password varchar(100) NOT NULL,
	PRIMARY KEY(userId)
);

CREATE TABLE whoiswho.teachers(
	teacherId INT auto_increment NOT NULL,
	userId int,
	FOREIGN KEY (userId)  REFERENCES whoiswho.users (userid),
	PRIMARY KEY (teacherId)
);

CREATE TABLE whoiswho.students(
	studentId INT auto_increment NOT NULL,
	userId int,
	FOREIGN KEY (userId)  REFERENCES whoiswho.users (userid),
	PRIMARY KEY (studentId)
);

CREATE TABLE whoiswho.classrooms (
	classId INT auto_increment NOT NULL,
	name nvarchar(100) NOT NULL,
	pin varchar(8) NOT NULL UNIQUE,
	teacherId int not null,
	FOREIGN KEY (teacherId) REFERENCES whoiswho.teachers(teacherId),
	PRIMARY KEY(classId)
);

CREATE TABLE whoiswho.studentsclassroom(
  	classId int not null,
   	studentId int not null,
   	FOREIGN KEY (classId) REFERENCES whoiswho.classrooms(classId),
   	FOREIGN KEY (studentId) REFERENCES whoiswho.students(studentId),
	PRIMARY KEY(classId,studentId)
);

CREATE TABLE whoiswho.exercises(
	exerciseId int auto_increment NOT NULL,
	name nvarchar(100) not null,
	level int not null,
	description nvarchar(2048),
	img_tableDiagram varchar(255),
	db_name varchar(100) not null,
	db_user varchar(50) not null,
	db_pass varchar(50)not null,
	PRIMARY KEY (exerciseId)
);

CREATE TABLE whoiswho.games(
	gameId INT AUTO_INCREMENT NOT NULL,
	pin VARCHAR(10),
	ExerciseId int not null,
	start_date DATETIME not null,
	end_date DATETIME not null,
	teacherId int,
	classId int,
	selectedCharacterId int not null,
	FOREIGN KEY (ExerciseId) REFERENCES whoiswho.exercises(ExerciseId),
	FOREIGN KEY (teacherId) REFERENCES whoiswho.teachers(teacherId),
	FOREIGN KEY (classId) REFERENCES whoiswho.classrooms(classId),
	PRIMARY KEY(gameId)
);

CREATE TABLE whoiswho.playmoves(
	moveId INT AUTO_INCREMENT NOT NULL,
	gameId INT NOT NULL,
	studentId INT NOT NULL,
	query varchar(2048),
	failed INT NOT NULL,
	result INT NOT NULL,
	date DATETIME NOT NULL,
	FOREIGN KEY (studentId) REFERENCES whoiswho.students(studentId),
	FOREIGN KEY (gameId) REFERENCES whoiswho.games(gameId),
	PRIMARY KEY(moveId)
);

insert into whoiswho.exercises  (name,level,description,img_tableDiagram,db_name,db_user,db_pass)
 select 'Classic 1 table',1,'WHERE game in Classic WhoIsWho',
 'http://whoiswhosql.com/img/level1tablediagram.jpg','classic1','whoiswholevel1','';
 
 
insert into whoiswho.exercises  (name,level,description,img_tableDiagram,db_name,db_user,db_pass)
 select 'Classic 2 table',2,'INNERJOIN game in Classic WhoIsWho','http://whoiswhosql.com/img/level2tablediagram.jpg','classic2','whoiswholevel1','';
 
 
 

