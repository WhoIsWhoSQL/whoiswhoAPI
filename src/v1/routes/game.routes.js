
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
 *
 * 
    
 */

/**
 * @swagger
 * /api/v1/games:
 *  get:
 *      summary: Encuentra una nueva partida online
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
 *      parameters:
 *        - name: pin
 *          in: path
 *          required: true
 *          schema:
 *              type: string
 *          
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/join/:pin", validateToken, games.join);



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


module.exports = router;


