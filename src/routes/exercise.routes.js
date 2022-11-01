module.exports = app => {
    const exercises = require("../controllers/exercise.controller.js");
    const validateToken = require("../helpers/validateTokens");
    var router = require("express").Router();


    router.get("/",validateToken, exercises.findAll);
  
     // Retrieve a single exercise with id
    router.get("/:id",validateToken, exercises.findOne);

  
    app.use('/api/exercise', router);
  
  };
  
  
  