
const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");


// Retrieve all levels from the database (with condition).
exports.findAll = (req, res) => {
 // console.log("find all Exercise ");
  if (req.user.isTeacher) {
    Exercise.getAllMinimize((err, data) => {
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

exports.addexercise = (req, res) => {

 // console.log("addexercise:" + JSON.stringify(req.body));
  Exercise.getExerciseByClass(req.body.classId, (err, data) => {

    let existe = data.filter(ex => ex.exerciseId === req.body.exerciseId);
  //  console.log("existe:" + JSON.stringify(existe));
    if (existe.length < 1) {
      Exercise.addExerciseToClass(req.body.classId, req.body.exerciseId, (err, data) => {
        if (err) {
          if (err.kind === "error al insertar") {
            res.status(404).send({
              message: `Error al insertar${req.body.exerciseId}.`
            });
          } else {
            res.status(500).send({
              message: "Error al insertar " + req.body.exerciseId
            });
          }
        } else res.send(data);
      });
    }
    else {
      res.status(404).send({
        message: `Ejercicio ya incluido ${req.body.exerciseId}.`
      });

    }
  });

};

exports.startexercise = (req, res) => {

  if (!req.params) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //console.log(req.user + req.body);
  const pin = (Math.random() + 1).toString(36).substring(7);
  const selectedCharacterId = Math.floor(Math.random() * (24 - 1)) + 1;

  const game = new Game({
    exerciseId: req.body.exerciseId,
    pin: pin,
    start_date: new Date(),
    end_date: new Date(),
    classId: req.body.classId,
    teacherId: null,
    selectedCharacterId: selectedCharacterId
  });
  //console.log("gameeeee:" + JSON.stringify(game));
  Game.create(game, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the game."
      });

    const move = new Move({
      gameId: data.id,
      studentId: req.user.studentId,
      query: "select * from Personajes",
      failed: 0,
      result: 24,
      date: new Date()
    });

    Move.create(move, (err2, data2) => {
      if (err2)
        res.status(500).send({
          message:
            err2.message || "Some error occurred while creating the game."
        });
    });



    res.send(data);
  });
};