module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);


    // Create a new User
    router.post("/login", users.login);
  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve all published Users
  //router.get("/published", users.findAllPublished);

  // Retrieve a single Users with id
  router.get("/:id", users.findOne);

  // Update a Users with id
  router.put("/:id", users.update);

  // Delete a Users with id
  router.delete("/:id", users.delete);

  const jwt = require("jsonwebtoken")//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
  app.post("/login", async (req,res) => {const user = users.find( (c) => c.user == req.body.name)
  //check to see if the user exists in the list of registered usersif (user == null) res.status(404).send ("User does not exist!")
  //if user does not exist, send a 400 response
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken ({user: req.body.name})
    const refreshToken = generateRefreshToken ({user: req.body.name})
    res.json ({accessToken: accessToken, refreshToken: refreshToken})} 
    else {
  res.status(401).send("Password Incorrect!")
  }})

  app.use('/api/users', router);




};


