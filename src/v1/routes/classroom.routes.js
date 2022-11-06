
  const classrooms = require("../../controllers/classroom.controller.js");
  const validateToken = require("../../helpers/validateTokens");
  var router = require("express").Router();

/*   "exercises": [
    {
      "exerciseId": 1,
      "name": "Classic 1 table",
      "level": 1,
      "description": "WHERE game in Classic WhoIsWho",
      "img_tableDiagram": "http://whoiswhosql.com/img/level1tablediagram.jpg"
    },
    {
      "exerciseId": 2,
      "name": "Classic 2 table",
      "level": 2,
      "description": "INNERJOIN game in Classic WhoIsWho",
      "img_tableDiagram": "http://whoiswhosql.com/img/level2tablediagram.jpg"
    }
  ] */

/**
 * @swagger
 * components:
 *  schemas:
 *    Exercise:
 *      type: object
 *      properties:
 *        exerciseId:
 *          type: integer 
 *          description: id del ejercicio 
 *        name:
 *          type: string
 *          description: nombre del ejercicio
 *        level:  
 *          type: integer  
 *          description: nivel del ejercicio
 *        description:
 *          type: string
 *          description: descripcion del ejercicio
 *        img_tableDiagram:
 *          type: string
 *          description: url de la imagen del diagrama de la tabla
 *    
 *    Classroom:
 *      type: object
 *      properties:
 *        classId:
 *          type: integer
 *          description: id de la clase
 *        name:
 *          type: string
 *          description: name to the classroom
 *        pin: 
 *          type: string
 *          description: pin to the classroom 
 *        teacherId:
 *          type: integer
 *          description: id del profesor
 * 
 *        example:
 *          classId: 1
 *          name: 'Clase 1'
 *          pin: '12345'
 *          teacherId: 1   
 * 
 * 
 *    ClassroomComplete:
 *      type: object
 *      properties:
 *        classId:
 *          type: integer
 *          description: id de la clase
 *        name:
 *          type: string
 *          description: name to the classroom
 *        pin: 
 *          type: string
 *          description: pin to the classroom 
 *        teacherId:
 *          type: integer
 *          description: id del profesor
 *      exercises:
 *          type: array
 *          items:
 *          $ref: '#/components/schemas/Exercise'
 *      example:
 *        classId: 1
 *        name: 'Clase 1'
 *        pin: '12345'
 *        teacherId: 1
 *        exercises:
 *          - exerciseId: 1
 *            name: 'Classic 1 table'
 *            level: 1
 *            description: 'WHERE game in Classic WhoIsWho'
 *            img_tableDiagram: 'http://whoiswhosql.com/img/level1tablediagram.jpg'
 *          - exerciseId: 2
 *            name: 'Classic 2 table'
 *            level: 2
 *            description: 'INNERJOIN game in Classic WhoIsWho'
 *            img_tableDiagram: 'http://whoiswhosql.com/img/level2tablediagram.jpg'
 *     
 *   
 *          
 */

  /**
 * @swagger
 * /api/v1/classrooms:
 *  post:
 *      summary: Crea una clase si eres profesor
 *      tags: [Classroom]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                            type: string  
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
 * /api/v1/classrooms:
 *  get:
 *      summary: lista todas las clases que has creado si eres maestro o las que te has unido si eres alumno
 *      tags: [Classroom]
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#components/schemas/Classroom'
*/
//
  router.get("/", validateToken, classrooms.findAll);

    /**
 * @swagger
 * /api/v1/classrooms/{id}:
 *  get:
 *      summary: muestra una clase y su lista de ejercicios
 *      tags: [Classroom]
 *      parameters:
 *        - name: id 
 *          in: path
 *          required: true
 *          description: id de la clase
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: devuelve la clase con el pin
 *              content: 
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        $ref : '#components/schemas/ClassroomComplete'

 *                       
 *                                           
*/
  //
  router.get("/:id", validateToken, classrooms.findOne);



      /**
 * @swagger
 * /api/v1/classrooms/join/{pin}:
 *  post:
 *      summary: unete a una clase pasandole el pin de la misma
 *      tags: [Classroom]
 *      parameters:
 *        - name: pin
 *          in: path
 *          required: true
 *          schema:
 *              type: string

 *      responses:
 *          200:
 *              description: devuelve mensaje de confirmación
 *              content: 
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          description: mensaje de confirmacion
 *                      example:
 *                        message: '¡Joined!'
 * 
 *                         
*/
  router.post("/join/:pin", validateToken, classrooms.join);



      /**
 * @swagger
 * /api/v1/classrooms/{id}
 *  delete:
 *      summary: borra una clase
 *      tags: [Classroom]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la clase
 *          schema:
 *            type: string
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


module.exports = router;



