const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");



//obtiene la lista de personajes que quedan para escoger


//obtiene la lista de tiradas de un juego
exports.getPlayGame = (req, res) => {
    // console.log("find all my playmoves by pin and user:" + req.user.studentId);
    console.log("find all my playmoves");
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
            Move.getCharacters(req.body.query, exercise, (err2, listperso) => {
                console.log("err2:" + err2);
                if (err2) {
                    const move = new Move({
                        gameId: game.gameId,
                        studentId: req.user.studentId,
                        query: req.body.query,
                        failed: 1,
                        error: 'Revisa tu consulta...' + err2.message,
                        result: -1,
                        date: new Date()
                    });
                    Move.create(move, (err3, data3) => {
                        if (err3)
                            res.status(500).send({
                                message:
                                    err3.message || "Some error occurred while creating the game."
                            });
                        res.send(move);
                    });

                } else {
                    console.log("query:" + req.body.query);
                    query = new String(req.body.query);
                    query = query.toLowerCase();
                    const contienewhere = query.split("where").length;
                    if (contienewhere > 1) {
                        query = req.body.query + " and Id = " + game.selectedCharacterId
                    } else {
                        query = req.body.query + " WHERE Id = " + game.selectedCharacterId
                    }
                    console.log("query2: " + query);


                    Move.getCharacters(query, exercise, (err3, listpersocontrol) => {
                        if (err3) {
                            const move = new Move({
                                gameId: game.gameId,
                                studentId: req.user.studentId,
                                query: req.body.query,
                                failed: 1,
                                error: 'Revisa tu consulta. No necesitas ordenar, ni agrupar ni limitar los resultados de tu consulta.',
                                result: -2,
                                date: new Date()
                            });
                            Move.create(move, (err3, data3) => {
                                if (err3)
                                    res.status(500).send({
                                        message:
                                            err3.message || "Some error occurred while creating the game."
                                    });
                                res.send(move);
                            });

                        } else {
                            if (listpersocontrol.length == 0) {
                                console.log("la consulta está vacia");
                                const move = new Move({
                                    gameId: game.gameId,
                                    studentId: req.user.studentId,
                                    query: req.body.query,
                                    failed: 1,
                                    error: 'Consulta bien escrita, pero estás descartando nuestro personaje',
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
                            }
                            else {
                                const move = new Move({
                                    gameId: game.gameId,
                                    studentId: req.user.studentId,
                                    query: req.body.query,
                                    failed: 0,
                                    error: '¡Consulta correcta!',
                                    result: listperso.length,
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
                            }
                        }
                    });
                }
            });
        });
    });
};


exports.search = (req, res) => {
    console.log("search");
    Move.search(req.body,req.user.teacherId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send(data);
    });
}