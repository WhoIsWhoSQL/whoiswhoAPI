const Exercise = require("../models/exercise.model.js");

// Retrieve all levels from the database (with condition).
exports.findAll = (req, res) => {
    console.log("find all Exercise ");
    if (req.user.isTeacher) {
        Exercise.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Exercise."
                });
            else res.send(data);
        });
    }
    else {
        res.status(403).send({ message: "your user not autorized" });
    }
};



// Find a single User by Id
exports.findOne = (req, res) => {
    Exercise.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };