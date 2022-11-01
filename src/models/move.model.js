const sql = require("./db.js");
/*
gameId INT NOT NULL,
	studentId INT NOT NULL,
	query varchar(2048),
	failed INT NOT NULL,
	result INT NOT NULL,
	date DATETIME NOT NULL,


*/

// constructor
const Move = function(move) {
  this.gameId = move.gameId;
  this.studentId = move.studentId;
  this.query = move.query;
  this.failed = move.failed;
  this.result = move.result;
  this.date = move.date;
};


Move.create = (newMove, result) => {

    console.log(newMove);
    sql.query("INSERT INTO playmoves SET ?", newMove, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created move: ", { id: res.insertId, ...newMove });
      result(null, { id: res.insertId, ...newMove });
    });
  };

  
module.exports = Move;
