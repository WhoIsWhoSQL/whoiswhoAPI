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
  //  console.log(newMove);
  sql.query("INSERT INTO playmoves SET ?", newMove, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //   console.log("created move: ", { id: res.insertId, ...newMove });
    result(null, { id: res.insertId, ...newMove });
  });
};



Move.getAll = (gameId, studentId, result) => {
  let query = "SELECT * FROM playmoves ";
  // console.log(query);

  query += ` WHERE gameId = '${gameId}'`;
  query += ` AND studentId = '${studentId}'`;
  query += ` ORDER BY date DESC`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //   console.log("Moves: ", res);
    result(null, res);
  });
};



Move.getLastMoveOK = (studentId, gameId, result) => {
  // console.log("studentId" + studentId + ", gameId:" + gameId);
  sql.query("select * from playmoves where failed=0 and  studentId=? and gameId = ? order by date desc", [studentId, gameId], (err, res) => {
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

  //console.log("query:" + query)
  var connectionGame = mysql.createConnection({
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
      connectionGame.end();
      return;
    }
    //console.log("characters: ", res);
    if (res.length) {
      result(err, res);
      connectionGame.end();
      return;
    }

    // not found user with the id
    connectionGame.end();
    result(null, []);
  });
};

Move.search = (filter,teacherId, result) => {

  var query = `select p.*,u.name,u.email,g.* from playmoves p 
  inner join students s on s.studentId=p.studentId 
  inner join users u on u.userId=s.userId  
  inner join games g on p.gameId = g.gameId  
  left join classrooms c on g.classId = c.classId 
  WHERE (g.teacherId=${teacherId} or c.teacherId=${teacherId})`;
  if (filter.gameId && filter.gameId != 0) {
    query += ` AND p.gameId = '${filter.gameId}'`;
  }
  if (filter.studentId && filter.studentId != 0) {
    query += ` AND u.userId = '${filter.userId}'`;
  }
  if (filter.failed && filter.failed != 0) {
    query += ` AND p.failed = '${filter.failed}'`;
  }
  if (filter.result && filter.result != 0) {
    query += ` AND p.result = '${filter.result}'`;
  }
  if (filter.classId && filter.classId != 0) {
    query += ` AND p.classId = '${filter.classId}'`;
  }
  if (filter.error && filter.error != 0) {
    query += ` AND p.error = '${filter.error}'`;
  }

  query += ` ORDER BY date DESC`;
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log("moves: ", res);
      result(null, res);
    }
  });
};



module.exports = Move;
