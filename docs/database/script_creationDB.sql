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


 SELECT name,email,password  FROM users u
 left join teacher t on t.userId =u.userId 
 left join students s on s.userId =u.userId 
 WHERE email ='bernat'

-- INSERT INTO users (name, email,password) VALUES('bernat','bernat@whoiswhosql.org','dfsfsdfsd')
 
  -- alter table users add column password varchar(100)
-- delete from users
-- SELECT * FROM users where email='bernat@whoiswhosql.org'