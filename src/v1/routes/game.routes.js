
const games = require("../../controllers/game.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();

/**
 * @swagger
 * /api/games:
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
 * /api/games:
 *  post:
 *      summary: Crea una nueva partida online
 *      tags: [Games]
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
 * /api/games/join/{pin}:
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
 * /api/games/results:
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


