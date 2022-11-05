
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
 * /api/v1/exercises/create/{classId}:
 *  post:
 *      summary: si eres el maestro que ha creado la clase, añade un ejercicio a la clase
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/create/:classId",validateToken,exercises.addexercise);



    module.exports = router;

