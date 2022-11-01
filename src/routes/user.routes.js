module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Create a new User
  router.post("/login", users.login);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single Users with id
  router.get("/:id", users.findOne);

  // Update a Users with id
  router.put("/:id", users.update);

  // Delete a Users with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);




};


