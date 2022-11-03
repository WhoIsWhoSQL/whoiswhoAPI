
  const classrooms = require("../../controllers/classroom.controller.js");
  const validateToken = require("../../helpers/validateTokens");
  var router = require("express").Router();



  /**
 * @swagger
 * /api/classrooms:
 *  post:
 *      summary: Crea una clase si eres profesor
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
  // 
  router.post("/", validateToken, classrooms.create);

  /**
 * @swagger
 * /api/classrooms:
 *  get:
 *      summary: lista todas las clases que has creado si eres maestro o las que te has unido si eres alumno
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
//
  router.get("/", validateToken, classrooms.findAll);

    /**
 * @swagger
 * /api/classrooms/:id:
 *  get:
 *      summary: muestra una clase y su lista de ejercicios
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
  //
  router.get("/:id", validateToken, classrooms.findOne);



      /**
 * @swagger
 * /api/classrooms:
 *  put:
 *      summary: unete a una clase pasandole el pin de la misma
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
  router.put("/join", validateToken, classrooms.join);



      /**
 * @swagger
 * /api/classrooms/:id:
 *  delete:
 *      summary: borra una clase
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
//borra una clase
  router.delete("/:id",validateToken, classrooms.delete);

      /**
 * @swagger
 * /api/classrooms/addexercise:
 *  put:
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
router.put("/addexercise",validateToken,classrooms.addexercise);


module.exports = router;



