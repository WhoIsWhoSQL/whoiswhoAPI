//const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");

// si es teacher, obtiene todos los games que has creado, si es alumno.
exports.findMyGames = (req, res) => {
  //  console.log("find all my games! ");
    if (req.user.isTeacher) {
        Game.getAllOwned(req.user.teacherId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Exercise."
                });
            else res.send(data);
        });
    }
    else {

        Game.getAllStudentGames(req.user.studentId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Exercise."
                });
            else res.send(data);
        });

    }
};

exports.findOne = (req, res) => {
   // console.log("find all Exercise ");
    if (req.user.isTeacher) {
        Game.findByIdTeacher(req.params.id, req.user.teacherId, (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found game with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving game with id " + req.params.id
                    });
                }
            }
            else res.send(data);

        });
    } else {

        Game.findByIdStudent(req.params.id, req.user.studentId, (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found game with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving game with id " + req.params.id
                    });
                }
            }
            else res.send(data);

        });
    }
};

//añade el ejercico a la clase.
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
    const selectedCharacterId = Math.floor(Math.random() * (24 - 1)) + 1;
    const game = new Game({
        exerciseId: req.body.exerciseId,
        pin: pin,
        start_date: null,
        end_date: null,
        teacherId: req.user.teacherId,
        selectedCharacterId: selectedCharacterId
    });


    Game.create(game, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the game."
            });
        res.send(data);
    });


};


/*

    gameId INT NOT NULL,
    studentId INT NOT NULL,
    query varchar(2048),
    failed INT NOT NULL,
    result INT NOT NULL,
    date DATETIME NOT NULL,*/
//añade el ejercico a la clase.
exports.join = (req, res) => {
    console.log("voy a unierme a una clase");
    Game.findByPin(req.body.pin, (err, data) => {
        const move = new Move({
            gameId: data.gameId,
            studentId: req.user.studentId,
            query: "select * from Personajes",
            failed: 0,
            result: data.numcharacters,
            date: new Date()
        });

        Move.create(move, (err2, data2) => {
            if (err2)
                res.status(500).send({
                    message:
                        err2.message || "Some error occurred while creating the game."
                });
            res.send(data2);
        });
    });
}



//Ver como va la clase en tiempo real
exports.getResults = (req, res) => {
    if (req.user.isTeacher) {
        if (req.params.id === undefined) { 
            res.status(404).send({
                message: "You are not allowed to do this action"
            });

        } else {
            Game.getResults(req.params.id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found game with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving game with id " + req.params.id
                        });
                    }
                }
                else res.send(data);

            });
        }
    } else {
        res.status(403).send({
            message: "You are not allowed to do this action"
        });
    }
};



exports.delete = (req, res) => {
    if (req.user.isTeacher) {
        Game.remove(req.params.id, req.user.teacherId, (err, data) => {
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
    } else {
        es.status(404).send({
            message: `Not found User with id ${req.params.id}.`
        });
    }
};



exports.updateStartDate = (req, res) => {
    // Validate Request
   // console.log("UPDATE!!!!!!" + req.params.id);
    Game.updateStartDate(
        req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Game with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};



exports.updateEndDate = (req, res) => {
    // Validate Request
    console.log("UPDATE!!!!!!");
    Game.updateEndDate(
        req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Game with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};
