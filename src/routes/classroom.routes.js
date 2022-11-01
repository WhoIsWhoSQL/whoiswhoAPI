module.exports = app => {
  const classrooms = require("../controllers/classroom.controller.js");
  const validateToken = require("../helpers/validateTokens");
  var router = require("express").Router();

  // Create a new classroom
  router.post("/", validateToken, classrooms.create);



  router.get("/", validateToken, classrooms.findAll);
  router.get("/:id", validateToken, classrooms.findOne);

  router.put("/join", validateToken, classrooms.join);


  router.delete("/:id",validateToken, classrooms.delete);

router.put("/addexercise",validateToken,classrooms.addexercise);

  app.use('/api/classrooms', router);

};


