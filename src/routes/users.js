const { Router } = require('express');
const router = Router();
const AppError = require("../utils/appError");
const getConnection = require("../services/db");
//const conn = getConnection();
const morgan = require('morgan');
router.use(morgan('dev'));
//const UserDB = require("../data/usersDb");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
const { post } = require('.');
const users = [];// REGISTER A USER;

//const usersdb = require("../data/users");
//const getPassword = require('../data/users');


//const usercontroller = require("../controllers/users");
//console.log("fsdfs" + usercontroller);
//router.get("/", usercontroller);
router.get('/', function (req, res, next) {
  try {

    conn.query("SELECT * FROM users where", function (err, data, fields) {
      if (err) return next(new AppError(err))
      if (err) {
        res.status(400).json({
          status: "failed",
          length: err.code.length,
          data: err.code
        });
      };
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      length: error.code.length,
      data: error.code
    });
  }

});

router.get('/list', (req, res) => {
  res.json(users);

})

router.post("/createUser", async (req, res) => {
  console.log("hola");
  const user = req.body.name;

  console.log("user:" + user);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);



  //users.push({ user: user, password: hashedPassword });

  //users.push({ user: user });
  res.status(201).send(users)
  console.log(users)
});

/*
router.post("/login", async (req, res) => {
  try {
      const connection =  getConnection();
      const result = await connection.query("SELECT id, name, programmers FROM users");
      res.json(result);
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }
});
*/
router.post("/login", async (req, res) => {
  try {
    console.log("login....." + req.body.email)
    var ret = "";
    

    const usercontroller =require("../controllers/users");

    var result =await usercontroller.login();
      res.json(result);
    console.log("result ="+ result);
    ret = result[0]['pass'];
    console.log("ret: " + ret + ", password:" + req.body.password);

    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)
    var hashedPassword2 = bcrypt.hash(ret, 10);

    console.log(hashedPassword2)

    if (bcrypt.compare(req.body.password, hashedPassword2)) {

      const accessToken = generateAccessToken({ user: req.body.name })
      const refreshToken = generateRefreshToken({ user: req.body.name })
      res.json({ accessToken: accessToken, refreshToken: refreshToken })

    }
    else {
      res.status(401).send("Password Incorrect!")
    }
  } catch (error) {
    console.error("error general",error);
  res.status(500).send("Error general");
}
  //res.json(req.body)

});

function generateAccessToken(user) {
  return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
  refreshTokens.push(refreshToken)
  return refreshToken;
}



module.exports = router;