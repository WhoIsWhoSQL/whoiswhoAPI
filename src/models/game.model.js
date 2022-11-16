const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.pin = game.pin;
  this.exerciseId = game.exerciseId;
  this.start_date = game.start_date;
  this.end_date = game.end_date;
  this.teacherId = game.teacherId;
  this.classId = game.classId;
  this.selectedCharacterId= game.selectedCharacterId;

};


Game.create = (newGame, result) => {


  
    console.log(newGame);
    sql.query("INSERT INTO games SET ?", newGame, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created classroom: ", { id: res.insertId, ...newGame });
      result(null, { id: res.insertId, ...newGame });
    });
  };
  
//  "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
//[user.title, user.description, user.published, id],
Game.getAllOwned= (gameId,result) => {
    let query = `SELECT * FROM games g WHERE g.classId is null and teacherId= ${gameId}`;
  console.log(query);
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("games: ", res);
      result(null, res);
    });
  };

  


  Game.getAllStudentGames= (studentId,result) => {
    let query = `select g.gameId,g.pin,g.ExerciseId,g.start_date,g.end_date, g.teacherId,g.classId from games g inner join playmoves p on p.gameId = g.gameId where studentId= ${studentId} group by g.gameId,g.pin,g.ExerciseId,g.start_date,g.end_date, g.teacherId,g.classId`;
  console.log(query);
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("games: ", res);
      result(null, res);
    });
  };
  Game.findByIdTeacher = (id,teacherId, result) => {
    sql.query(`SELECT * FROM games WHERE gameId = ${id} and teacherId = ${teacherId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };


  Game.findByIdStudent = (id,studentId, result) => {
    sql.query(`SELECT g.* FROM games g INNER JOIN playmoves p on p.gameId=g.gameId WHERe g.gameId = ${id} and studentId=${studentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

  Game.findByPin = (id, result) => {
    sql.query(`SELECT * FROM games WHERE pin = '${id}'`, (err, res) => {
      if (err) {
       // console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        const exercise = res[0];
        console.log("found game: ",exercise);
        exercise.numcharacters = 24;
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };



Game.remove = (id,teacherId, result) => {
  sql.query(`DELETE FROM games WHERE gameId = ${id} and teacherId = ${teacherId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted games with id: ", id);
    result(null, res);
  });
};

  

module.exports = Game;
