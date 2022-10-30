module.exports = app => {
    const classrooms = require("../controllers/classroom.controller.js");
    const validateToken = require("../helpers/validateTokens");
    var router = require("express").Router();
  
    // Create a new classroom
    router.post("/",validateToken, classrooms.create);
  
    // Retrieve all classroom
    //router.get("/", classrooms.findAll);

    // Retrieve a single classroom with teacherid
 //   router.get("/:id", classrooms.findClasstoTeacher);
  
    // Retrieve a single classroom with id
   // router.get("/:id", classrooms.findOne);
  
    // Update a classroom with id
    //router.put("/:id", classrooms.addToClassroom);

    // Delete a classroom with id
    //router.delete("/:id", classrooms.delete);
  
  
    app.use('/api/classrooms', router);
  
  };
  
  
  