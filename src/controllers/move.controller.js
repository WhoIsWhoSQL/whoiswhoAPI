const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");



//obtiene la lista de personajes que quedan para escoger


//obtiene la lista de tiradas de un juego
exports.getPlayGame = (req, res) => {
    console.log("ToDo: getPlayGame");

    console.log("find all my playmoves by pin and user:" + req.user.studentId);

    Game.findByPin(req.params.pin, (err, data) => {

        Move.getAll(data.gameId, req.user.studentId, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving User."
                });
            else res.send(data);
        });
    });
};

//Añade un movimiento de un studiante a un game dado por el PIN., devuelve lista de caras disponibles y error.
exports.addMove = (req, res) => {
    console.log("addMove");
    Game.findByPin(req.body.pin, (err, game) => {
        Exercise.findById(game.ExerciseId, (err0, exercise) => {
            console.log("exercise : " + exercise);
            req.body.Game = exercise;
            // lanzar consulta a la bbdd de prueba
            console.log("game.selectedCharacterId:" + game.selectedCharacterId);
            Move.getCharacters(req.body.query + " and Id = " + game.selectedCharacterId, exercise, (err2, listperso) => {
                if (err2) {
                    console.log("error en la consulta " + err2.message);
                    const move = new Move({
                        gameId: game.gameId,
                        studentId: req.user.studentId,
                        query: req.body.query,
                        failed: 1,
                        error: err2.message,
                        result: -1,
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
                    if (listperso.lengh == 0) {
                        console.log("la consulta está vacia");
                        const move = new Move({
                            gameId: game.gameId,
                            studentId: req.user.studentId,
                            query: req.body.query,
                            failed: 1,
                            error: '',
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
                        console.log("la consulta tiene datos");
                        Move.getCharacters(req.body.query, exercise, (err3, listpersodef) => {
                            if (err2)
                                res.status(500).send({
                                    message:
                                        err2.message || "Some error occurred while creating the game."
                                });

                            
                            const move = new Move({
                                gameId: game.gameId,
                                studentId: req.user.studentId,
                                query: req.body.query,
                                failed: 0,
                                error: '',
                                result: listpersodef.length,
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
                };
            });
        });
    });
};