
const games = require("../../controllers/game.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();

/**
 * @swagger
 * /api/games:
 *  get:
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
router.get("/", validateToken, games.findMyGames);


/**
 * @swagger
 * /api/games:
 *  get:
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
 * /api/games/join:
 *  post:
 *      summary: Unirse a una partida
 *      tags: [Games]
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
 * /api/games/moves:
 *  post:
 *      summary: Añade un movimiento a un jugador
 *      tags: [Games]
 *      responses:
 *          200:
 *              description: devuelve lista de personajes que quedan para escoger.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.post("/moves", validateToken, games.addMove);

/**
 * @swagger
 * /api/games/moves/{pin}:
 *  get:
 *      summary: Otiene la lista de personajes que quedan para escoger
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
 *              description: devuelve lista de personajes que quedan para escoger.
 *              content: 
 *                  application/json:
 *                      schema:
 *                         
*/
router.get("/moves/:pin", validateToken, games.getPlayGame);

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


