const sql = require("./db.js");

// constructor
const Exercise = function(exercise) {
  this.name = exercise.name;
  this.level = exercise.level;
//  this.numcharacters =exercise.numcharacters;
};


//  "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
//[user.title, user.description, user.published, id],

Exercise.getAll= (result) => {
    let query = "SELECT * FROM exercises";
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



  Exercise.getAllMinimize= (result) => {
    let query = "SELECT ExerciseId,name,description ,img_tableDiagram FROM exercises";
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

Exercise.findById = (id, result) => {
    sql.query(`SELECT * FROM exercises WHERE exerciseId = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Exercise: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };
  
module.exports = Exercise;
