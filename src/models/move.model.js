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
const Move = function (move) {
  this.gameId = move.gameId;
  this.studentId = move.studentId;
  this.query = move.query;
  this.failed = move.failed;
  this.error = move.error;
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



Move.getAll = (gameId,studentId, result) => {
  let query = "SELECT * FROM playmoves ";
  console.log(query);
  
    query += ` WHERE gameId = '${gameId}'`;
    query += ` AND studentId = '${studentId}'`;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Moves: ", res);
    result(null, res);
  });
};



Move.getLastMove = (studentId, gameId, result) => {
  console.log("studentId" + studentId + ", gameId:" + gameId);
  sql.query("select * from playmoves where studentId=? and gameId = ? order by date desc", [studentId, gameId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      result(null, res);
    }
  });
};


Move.getCharacters = (query, game, result) => {
  const mysql = require("mysql");

  console.log("query:"+ query)
  var connectionGame = mysql.createPool({
    host: process.env.DB_HOST,
    user: game.db_user,
    password: game.db_pass,
    database: game.db_name,
    port: process.env.DB_PORT
  });
  connectionGame.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("characters: ", res);
    if (res.length) {
      result(err,res);
      return;
    }

    // not found user with the id
    result(null, []);
  });
};



module.exports = Move;
