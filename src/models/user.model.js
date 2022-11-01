const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.isTeacher = user.isTeacher;
};

User.create = (newUser, result) => {

  console.log(newUser);
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });

    if (newUser.isTeacher == 1) {
      sql.query("INSERT INTO teachers (userId) VALUEs(?)", res.insertId, (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
    } 
    else 
    {

      sql.query("INSERT INTO students (userId) VALUEs(?)", res.insertId, (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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

User.login = (email, result) => {

  sql.query(` SELECT name,email,password,isTeacher,t.teacherId ,s.studentId  FROM users u
  left join teachers t on t.userId =u.userId 
  left join students s on s.userId =u.userId WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("model.user res:" + res[0]);
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM users";
  console.log(query);
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

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

User.getAllPublished = result => {
  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
    [user.title, user.description, user.published, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
