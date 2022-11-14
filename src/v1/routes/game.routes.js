
const games = require("../../controllers/game.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      newGame:
 *          type: object
 *          properties:
 *              exerciseId:
 *                  type: integer
 *                  description: id del ejercicio
 *          required: 
 *              - exerciseId
 *          example:
 *                exerciseId: '1'
*      joinGame:
 *          type: object
 *          properties:
 *              pin:
 *                  type: string
 *                  description: pin de la partida
 *          required: 
 *              - pin
 *          example:
 *                pin: '123456'
 *
 * 
    
 */

/**
 * @swagger
 * /api/v1/games:
 *  get:
 *      summary: Encuentra mis partidas online
 *      tags: [Games]
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.get("/", validateToken, games.findMyGames);


    /**
 * @swagger
 * /api/v1/games/{pin}:
 *  get:
 *      summary: muestra una partida
 *      tags: [Games]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la partida
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: devuelve la partida con el id
 *              content: 
 *                  application/json:
 *                      schema:
 *                       
 *                                           
*/
  //
  router.get("/:id", validateToken, games.findOne);


/**
 * @swagger
 * /api/v1/games:
 *  post:
 *      summary: Crea una nueva partida online
 *      tags: [Games]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#components/schemas/newGame'
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/", validateToken, games.create);


/**
 * @swagger
 * /api/v1/games/join/{pin}:
 *  post:
 *      summary: Unirse a una partida
 *      tags: [Games]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#components/schemas/joinGame'
 *          
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/join", validateToken, games.join);



/**
 * @swagger
 * /api/v1/games/results:
 *  get:
 *      summary: Obtiene los jugadores de la partida y el num de personajes que le quedan a cada uno
 *      tags: [Games]
 *      responses:
 *          200:
 *              description: devuelve jugadores y num de personajes que le quedan a cada uno.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
//

router.get("/results", validateToken, games.getResults);





/**
 * @swagger
 * /api/v1/games/{id}:
 *  delete:
 *      summary: borra una partida si eres el profesor que la ha creado
 *      tags: [Games]
 *      parameters:
 *        - name: id 
 *          in: path
 *          required: true
 *          description: id de la partida
 *          schema:
 *            type: string
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
 *                        message: 'classroom was deleted successfully!'
 * 
 *                                       

*/
//borra una clase
router.delete("/:id",validateToken, games.delete);


module.exports = router;


