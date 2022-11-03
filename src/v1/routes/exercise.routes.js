
    const exercises = require("../../controllers/exercise.controller.js");
    const validateToken = require("../../helpers/validateTokens");
    var router = require("express").Router();



      /**
 * @swagger
 * /api/exercises:
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
 * /api/exercises/:id:
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

  
 

    module.exports = router;

