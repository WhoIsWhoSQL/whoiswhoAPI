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


  
   // console.log(newGame);
    sql.query("INSERT INTO games SET ?", newGame, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
     // console.log("created classroom: ", { id: res.insertId, ...newGame });
      result(null, { id: res.insertId, ...newGame });
    });
  };
  
//  "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
//[user.title, user.description, user.published, id],
Game.getAllOwned= (gameId,result) => {
    let query = `SELECT * FROM games g WHERE g.classId is null and teacherId= ${gameId} order by g.start_date desc`;
  //console.log(query);
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
    //  console.log("games: ", res);
      result(null, res);
    });
  };

  


  Game.getAllStudentGames= (studentId,result) => {
    let query = `select g.gameId,g.pin,g.ExerciseId,g.start_date,g.end_date, g.teacherId,g.classId from games g inner join playmoves p on p.gameId = g.gameId where studentId= ${studentId} group by g.gameId,g.pin,g.ExerciseId,g.start_date,g.end_date, g.teacherId,g.classId order by g.gameId desc`;
  //console.log(query);
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
  //    console.log("games: ", res);
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
     //   console.log("found user: ", res[0]);
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
     //   console.log("found user: ", res[0]);
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
    //    console.log("found game: ",exercise);
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

  //  console.log("deleted games with id: ", id);
    result(null, res);
  });
};

  


Game.getResults= (gameId,result) => {
  let query = `select t1.userId,t1.name,t1.email,t1.numTiradasOK as TiradasVerdes,p2.date,p2.result,
  case when t2.numTiradas is not null then t2.numTiradas else 0 end as TiradasRojas,
  case when t3.numTiradas is not null then t3.numTiradas else 0 end as TiradasAmarillas from (
  select u.userId,u.name,u.email, count(1) as numTiradasOK,max(p.moveId) as LastMove from playmoves p
  inner join students s on s.studentId=p.studentId
  inner join users u on u.userId=s.userId 
    where gameId=${gameId} and failed=0
  group by u.userId,u.name,u.email) as t1
  inner join playmoves p2 on p2.moveId = t1.LastMove
  left join (select u.userId,u.name,u.email, count(1) as numTiradas,max(p.moveId) as LastMove from playmoves p
  inner join students s on s.studentId=p.studentId
  inner join users u on u.userId=s.userId 
  where gameId=${gameId} and failed=1 and result=-1
  group by u.userId,u.name,u.email) as t2 on t2.userId=t1.userId
  left join (select u.userId,u.name,u.email, count(1) as numTiradas,max(p.moveId) as LastMove from playmoves p
  inner join students s on s.studentId=p.studentId
  inner join users u on u.userId=s.userId 
  where gameId=${gameId} and failed=1 and result=0
  group by u.userId,u.name,u.email) as t3 on t3.userId=t1.userId
  order by result,numtiradasOK,numtiradasOK+t3.numTiradas,date, t2.numTiradas
  `;
//console.log(query);

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("Results: ", res);
    result(null, res);
  });
};



Game.updateStartDate = (id, result) => {
  sql.query(
    "UPDATE games SET start_date = ? WHERE gameId = ?",
    [new Date(), id],
    (err, res) => {
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

      result(null,res);
    }
  );
};
module.exports = Game;


Game.updateEndDate = (id, result) => {
  sql.query(
    "UPDATE games SET end_date = ? WHERE gameId = ?",
    [new Date(), id],
    (err, res) => {
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

      result(null,res);
    }
  );
};
module.exports = Game;
