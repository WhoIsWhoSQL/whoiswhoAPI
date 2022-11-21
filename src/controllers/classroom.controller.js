
const Classroom = require("../models/classroom.model.js");

// Create and Save a new Classroom
exports.create = (req, res) => {

    console.log("voy a crear una clase");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.user);
    const pin = (Math.random() + 1).toString(36).substring(7);

    const classroom = new Classroom({
        name: req.body.name,
        pin: pin,
        teacherId: req.user.teacherId
    });

    // Save User in the database
    Classroom.create(classroom, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Classroom."
            });
        else res.send(data);
    });

};

// Retrieve all class from the database (with condition).
exports.findAll = (req, res) => {
    if (req.user.isTeacher == 1) {
       // console.log("find all my classrooms by teacher:" + req.user.teacherId);
        Classroom.getAllOwned(req.user.teacherId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving User."
                });
            else res.send(data);
        });
    } else {
        try {
         //   console.log("find all my classrooms by student:" + req.user.studentId);
            Classroom.getAllClassStudent(req.user.studentId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:"error al obtener las clases de un alumno"
                    });
                else res.send(data);
            });}
        catch (err) {
            res.status(500).send({
                message:
                   "error al obtener las clases de un alumno"
            });
        }
        
    }
};


exports.findOne = (req, res) => {
   
    Classroom.findById(req.params.id,req.user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Classroom with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Classroom with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
exports.join = (req, res) => {


    if (!req.params) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
    const studentId = req.user.studentId;
    if (studentId == undefined) {
        res.status(403).send({ message: "teacher not join to class." });
    }
    const pin = req.params.pin;
 //   console.log("añadiendo el alumno id" + studentId + " a la clase: " + pin);
    Classroom.join(pin, studentId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while join the Classroom."
            });
        else {
            Classroom.findByPin(pin, (err, data2) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while join the Classroom."
                    });
                else res.send(data2);
            });
        }   
    });

}




// Delete a classroom with the specified id in the request
exports.delete = (req, res) => {
    Classroom.remove(req.params.id,req.user.teacherId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete classroom with id " + req.params.id
                });
            }
        } else res.send({ message: `classroom was deleted successfully!` });
    });
};

