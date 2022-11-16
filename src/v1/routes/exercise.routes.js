
    const exercises = require("../../controllers/exercise.controller.js");
    const validateToken = require("../../helpers/validateTokens");
    var router = require("express").Router();



      /**
 * @swagger
 * /api/v1/exercises:
 *  get:
 *      summary: lista los ejercicios disponibles
 *      tags: [Exercise]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
//

    router.get("/",validateToken, exercises.findAll);
  



/**
 * @swagger
 * /api/v1/exercises/:id:
 *  get:
 *      summary: recibe los datos de un ejercicio
 *      tags: [Exercise]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
//

    // 
    router.get("/:id",validateToken, exercises.findOne);

  
       /**
 * @swagger
 * /api/v1/exercises/add/:
 *  post:
 *      summary: si eres el maestro que ha creado la clase, añade un ejercicio a la clase
 *      tags: [Exercise]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          exerciseId:
 *                            type: int
 *                          classId:
 *                              type: int 
 *                      example:
 *                          classId: 1
 *                          exerciseId: 1 
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/add/",validateToken,exercises.addexercise);


       /**
 * @swagger
 * /api/v1/exercises/start/:
 *  post:
 *      summary: si eres alumno en una clase, empieza el ejercicio indicado como parametro
 *      tags: [Exercise]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          exerciseId:
 *                            type: int
 *                          classId:
 *                              type: int  
 *                      example:
 *                          classId: 1
 *                          exerciseId: 1 
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/start/",validateToken,exercises.startexercise);



    module.exports = router;

