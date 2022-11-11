const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
const validateToken = require("../helpers/validateTokens");

const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  bcrypt.hash(req.body.password, 10).then(function (hashedPassword) {

    console.log(hashedPassword);
    // Create a User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword || false,
      isTeacher: req.body.isTeacher
    });

    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else {

        const accessToken = generateAccessToken({ user: data });
        const refreshToken = generateRefreshToken({ user: data });
        const ret = {
          "id" : data.id,
          "name" : data.name,
          "email" : data.email,
          "isTeacher" : data.isTeacher,
          "accessToken": accessToken,
          "refreshToken": refreshToken };
          res.send(ret);

      }
      
      
      
    });

  });

};

// Retrieve all User from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  console.log("find all")
  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    else res.send(data);
  });
};


exports.login = async (req, res) => {
  const email = req.body.email;
  console.log("login... email:" + email);
  var passbd = "";


  User.login(email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });


    else {
      passbd = data.password;

      var passintro = req.body.password;
      console.log("password guardado:" + passbd);

      console.log("pass introducido" + passintro);
      console.log("compare" + bcrypt.compare(passintro, passbd));

      bcrypt.compare(req.body.password, passbd).then(function (data2) {
        if (data2) {
          const accessToken = generateAccessToken({ user: data });
          const refreshToken = generateRefreshToken({ user: data });

          
          const ret = {
            "id" : data.id,
            "name" : data.name,
            "email" : data.email,
            "isTeacher" : data.isTeacher,
            "accessToken": accessToken,
            "refreshToken": refreshToken };
          
        
          //  console.log(ret);
          res.json(ret);
          //   res.json({ "accessToken": accessToken, "refreshToken": refreshToken });
        }
        else {
          res.status(401).send("Password Incorrect!")
        }
      });
      //res.json(data);
    }
  });
};


// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User."
      });
    else res.send({ message: `All User were deleted successfully!` });
  });
};





////////////////////////GENERATE TOKENS///////////////////////




function generateAccessToken(user) {
  return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1500m" })
}// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2000m" })
  refreshTokens.push(refreshToken)
  return refreshToken;
}
