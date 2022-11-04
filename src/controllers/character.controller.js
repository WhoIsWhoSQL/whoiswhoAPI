const Exercise = require("../models/exercise.model.js");
const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");



exports.getCharactersToPlay = (req, res) => {
    console.log("getCharactersToPlay");
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