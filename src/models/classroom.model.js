const sql = require("./db.js");
const Exercise = require("./exercise.model.js");
// constructor
const Classroom = function (classroom) {
    this.name = classroom.name;
    this.pin = classroom.pin;
    this.teacherId = classroom.teacherId;

};

Classroom.create = (newClassroom, result) => {

    console.log(newClassroom);
    sql.query("INSERT INTO classrooms SET ?", newClassroom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created classroom: ", { id: res.insertId, ...newClassroom });
        result(null, { id: res.insertId, ...newClassroom });
    });
};


Classroom.join = (pin, studentId, result) => {

    console.log("join to " + pin + ", studenitId:" + studentId);
    sql.query("INSERT INTO studentsclassroom SELECT classId ,? FROM classrooms WHERE pin = ?", [studentId, pin], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("joined classroom: ");
        result(null, "joined!");
    });
};

//  "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
//[user.title, user.description, user.published, id],
Classroom.getAllOwned = (teacherId, result) => {
    let query = "SELECT distinct c.* FROM classrooms c  LEFT JOIN games g on c.classId = g.classId WHERE c.teacherId=? order by c.classId desc";
   // console.log(query);


    sql.query(query, [teacherId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

     //   console.log("classrooms: ", res);
        result(null, res);
    });
};


Classroom.getAllClassStudent = (studentId, result) => {
    console.log("class for student:" + studentId);
    let query = "SELECT * FROM classrooms c INNER JOIN studentsclassroom sc ON sc.classId = c.classId WHERE studentId=? order by classId desc";
    console.log(query);

    sql.query(query, studentId, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("users: ", res);
        result(null, res);
    });
};




Classroom.findById = (id, user, result) => {
    console.log("find by id:" + id);
    sql.query(`SELECT * FROM classrooms WHERE classId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found classroom: ", res[0]);


            const myclass = res[0];
            Exercise.getExerciseByClass(myclass.classId, (err, data) => {

                console.log("lista:" + data);
                myclass.exercises = data;


                if (user.isTeacher) {
                    sql.query(`SELECT u.userId,u.name,u.email  FROM studentsclassroom sc 
                    INNER JOIN students s on s.studentId=sc.studentId
                    INNER JOIN users u ON u.userId=s.userId WHERE classId = ${id}`, (err, alumnos) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }

                        myclass.Students = alumnos;
                        console.log(myclass);
                        result(null, myclass);
                        return;
                    });


                } else {

                    console.log(myclass);
                    result(null, myclass);
                    return;
                }





            });
        } else {

            // not found classroom with the id
            result({ kind: "not_found" }, null);
        }
    });
};

Classroom.findByPin = (pin, result) => {
    console.log("find by pin:" + pin);
    sql.query(`SELECT * FROM classrooms WHERE pin = '${pin}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found classroom: ", res[0]);
            result(null, res[0]);
        } else {
            // not found classroom with the id
            result({ kind: "not_found" }, null);
        }
    });
};


Classroom.remove = (id, teacherId, result) => {
    sql.query(`DELETE FROM classrooms WHERE classId = ${id} and teacherId = ${teacherId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted class with id: ", id);
        result(null, res);
    });
};



module.exports = Classroom;
