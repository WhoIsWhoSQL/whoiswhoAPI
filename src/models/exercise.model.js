const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.name = game.name;
  this.level = game.level;
 
};


//  "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
//[user.title, user.description, user.published, id],
Game.getAll= (result) => {
    let query = "SELECT * FROM Exercises";
  console.log(query);
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };

  Game.findById = (id, result) => {
    sql.query(`SELECT * FROM Exercises WHERE id = ${id}`, (err, res) => {
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
  
module.exports = Game;
