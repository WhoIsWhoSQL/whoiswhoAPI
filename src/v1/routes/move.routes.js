const moves = require("../../controllers/move.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      Filter:
 *          type: object
 *          properties:
 *              gameId:  
 *                  type: integer
 *                  description: id of the game
 *              userId:
 *                  type: integer
 *                  description: id of the student
 *              classId:
 *                  type: integer
 *                  description: id of the class
 *              result:
 *                  type: integer
 *                  description: result of the game
 *              error:
 *                  type: integer
 *                  description: error of the game
 *    
 */
 

/**
 * @swagger
 * /api/v1/playmoves:
 *  post:
 *      summary: Añade un movimiento a un jugador
 *      tags: [PlayMoves]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          query:
 *                              type: string
 *                              description: sql query to play
 *                          pin:
 *                              type: string
 *                              description: pin of the game
  
 *      responses:
 *          200:
 *              description: devuelve lista de personajes que quedan para escoger.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/", validateToken, moves.addMove);
/**
 * @swagger
 /api/v1/playmoves/search:
 *  put:
 *      summary: Añade un movimiento a un jugador
 *      tags: [PlayMoves]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#components/schemas/Filter'
 *           
 *                          
 *                                
 *      responses:
 *          200:
 *              description: devuelve lista de personajes que quedan para escoger.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
 */
 router.put("/search",validateToken, moves.search);
/**
 * @swagger
 * /api/v1/playmoves/{pin}:
 *  get:
 *      summary: Otiene la lista de tiradasque ha realizado el estudiante logeado
 *      tags: [PlayMoves]
 *      parameters:
 *        - name: pin
 *          in: path
 *          required: true
 *          schema:
 *              type: string
 *          
 *      responses:
 *          200:
 *              description: devuelve lista de personajes que quedan para escoger.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.get("/:pin", validateToken, moves.getPlayGame);


module.exports = router;