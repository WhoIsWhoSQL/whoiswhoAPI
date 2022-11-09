const moves = require("../../controllers/move.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();

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