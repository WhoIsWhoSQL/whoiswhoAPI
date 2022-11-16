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
	error varchar(2048),
	result INT NOT NULL,
	date DATETIME NOT NULL,
	FOREIGN KEY (studentId) REFERENCES whoiswho.students(studentId),
	FOREIGN KEY (gameId) REFERENCES whoiswho.games(gameId),
	PRIMARY KEY(moveId)
);


CREATE TABLE whoiswho.classroomexercise(
exerciseId int not null,
classId int not null,
	FOREIGN KEY (exerciseId) REFERENCES whoiswho.exercises(exerciseId),
		FOREIGN KEY (classId) REFERENCES whoiswho.classrooms(classId),
		PRIMARY KEY(exerciseId,classId)
)

)
