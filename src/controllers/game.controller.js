const Game = require("../models/game.model.js");
const Move = require("../models/move.model.js");

// si es teacher, obtiene todos los games que has creado, si es alumno.
exports.findMyGames = (req, res) => {
    console.log("find all Exercise ");
    if (req.user.isTeacher) {
        Game.getAllOwned(req.user.teacherId,(err, data) => {
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

    const game = new Game({
        exerciseId: req.body.exerciseId,
        pin: pin,
        start_date: new Date(),
        end_date : new Date(),
        teacherId: req.user.teacherId
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
    
    Game.findByPin(req.body.pin,(err,data) => {


        const move = new Move({
            exerciseId: data.exerciseId,
            studentId: req.user.studentId,
            query: "START",
            failed : 0,
            result :24 ,
            date: new Date()
        });

        Move.create(move,(err2,data2)=>{
            if (err2)
            res.status(500).send({
                message:
                    err2.message || "Some error occurred while creating the game."
            });
            res.send(data2);
        });
    });


}

//añade el ejercico a la clase.
exports.getMoves = (req, res) => {
    res.send("ToDo");
}

//añade el ejercico a la clase.
exports.addMove = (req, res) => {
    res.send("ToDo");
}
//añade el ejercico a la clase.
exports.getResults = (req, res) => {
    res.send("ToDo");
}
