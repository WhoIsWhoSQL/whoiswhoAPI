
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
 *                type: string
 *                description: pin de la partida
 *          required: 
 *              - pin
 *          example:
 *                pin: '123456'
 *      Game:
 *          type: object
 *          properties:
 *              gameId:
 *                type: integer
 *                description: id de la partida
 *              pin:
 *                type: string
 *                description: pin de la partida
 *              exerciseId:
 *                type: integer
 *                description: id del ejercicio
 *              start_date:
 *                type: date
 *                description: fecha de inicio de la partida
 *              end_date:
 *                type: date
 *                description: fecha de fin de la partida
 *              teacherId:
 *                type: integer
 *                description: id del profesor
 *              classId:
 *                type: integer
 *                description: id de la clase
 *              selectedCharacterId:
 *                type: integer
 *                description: id del personaje seleccionado
 *          required: 
 *            - gameId
 *            - pin
 *            - exerciseId
 *            - selectedCharacterId
 *          example:
 *            gameId: '1'
 *            pin: '123456'
 *            exerciseId: '1'
 *            start_date: '2021-01-01'
 *            end_date: '2021-01-01'
 *            teacherId: '1'
 *            classId: '1'
 *            selectedCharacterId: '1'
  
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
 *                        type: object
 *                        $ref : '#components/schemas/Game'
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
 * /api/v1/games/results/{id}:
 *  get:
 *      summary: Obtiene los jugadores de la partida y el num de personajes que le quedan a cada uno
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
 *              description: devuelve jugadores y num de personajes que le quedan a cada uno.
 *              content: 
 *                  application/json:
 *                      schema:
 *        
 *                         
*/
//

router.get("/results/:id", validateToken, games.getResults);





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
 *                        message: 'Game was updated successfully!'
 * 
 *                                       

*/
//borra una clase
router.delete("/:id",validateToken, games.delete);


/**
 * @swagger
 * /api/v1/games/start/{id}:
 *  put:
 *      summary: actualiza la fecha de inicio de una partida si eres el profesor que la ha creado
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
// Update a Users with id
router.put("/start/:id", games.updateStartDate);




/**
* @swagger
* /api/v1/games/stop/{id}:
*  put:
*      summary: actualiza la fecha de finalización de una partida si eres el profesor que la ha creado
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
// Update a Users with id
router.put("/stop/:id", games.updateEndDate);
module.exports = router;


