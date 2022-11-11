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


  Game.getGamesByClass = ( id, result ) => {

    sql.query(`SELECT e.exerciseId ,e.name,e.level,e.description ,e.img_tableDiagram  FROM games g 
    INNER JOIN exercises e on e.exerciseId = g.exerciseId 
    WHERE g.classId = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
      
          console.log("found games: ", res);
          result(null, res);
    });

  };

  Game.findById = (id, result) => {
    sql.query(`SELECT * FROM games WHERE id = ${id}`, (err, res) => {
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

  

module.exports = Game;
