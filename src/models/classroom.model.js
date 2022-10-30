const sql = require("./db.js");

// constructor
const Classroom = function(classroom) {
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


module.exports = Classroom;
