const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");

// si es teacher, obtiene todos los games que has creado, si es alumno.
exports.findMyGames = (req, res) => {
    console.log("find all Exercise ");
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
        res.status(403).send({ message: "your user not autorized" });
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
        start_date: new Date(),
        end_date: new Date(),
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

//obtiene la lista de personajes que quedan para escoger
exports.getPlayGame = (req, res) => {
    console.log("getPlayGame");
    Game.findByPin(req.params.pin, (err, game) => {
        //  console.log("exerciseID = "+ game.ExerciseId);   
        Exercise.findById(game.ExerciseId, (err0, exercise) => {
            req.body.Game = exercise;
            console.log("exercise : " + exercise);
            Move.getLastMove(req.user.studentId, game.gameId, (err3, data3) => {

                Move.getCharacters(data3[0].query, exercise, (err2, data2) => {
                    res.send(data2);
                });
            });
        });
    });
};

//Añade un movimiento de un studiante a un game dado por el PIN., devuelve lista de caras disponibles y error.
exports.addMove = (req, res) => {
    Game.findByPin(req.body.pin, (err, game) => {
        Exercise.findById(game.ExerciseId, (err0, exercise) => {
            req.body.Game = exercise;
            // lanzar consulta a la bbdd de prueba
            Move.getCharacters(req.body.query + " and Id = " + game.selectedCharacterId, exercise, (err2, listperso) => {
                const move = null;
                if (err2) {
                    move = new Move({
                        gameId: data.gameId,
                        studentId: req.user.studentId,
                        query: req.body.query,
                        failed: 1,
                        error: err2.message,
                        result: -1,
                        date: new Date()
                    });
                };
                if (listperso.lengh) {
                    move = new Move({
                        gameId: data.gameId,
                        studentId: req.user.studentId,
                        query: req.body.query,
                        failed: 1,
                        error : '',
                        result: 0,
                        date: new Date()
                    });
                    Move.create(move, (err2, data3) => {
                        if (err2)
                            res.status(500).send({
                                message:
                                    err2.message || "Some error occurred while creating the game."
                            });
                        res.send(move);
                    });
                } else {
                    Move.getCharacters(req.body.query, exercise, (err2, listpersodef) => {

                        move = new Move({
                            gameId: data.gameId,
                            studentId: req.user.studentId,
                            query: req.body.query,
                            failed: 0,
                            error: '',
                            result: listpersodef.lengh,
                            date: new Date()
                        });

                        Move.create(move, (err2, data3) => {
                            if (err2)
                                res.status(500).send({
                                    message:
                                        err2.message || "Some error occurred while creating the game."
                                });
                            res.send(move);
                        });
                    });
                }

            });
        });   
    });
};

//Ver como va la clase en tiempo real
exports.getResults = (req, res) => {
    res.send("ToDo");
};
