const moves = require("../../controllers/move.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();

/**
 * @swagger
 * /api/playmoves:
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
 * /api/playmoves/{pin}:
 *  get:
 *      summary: Otiene la lista de personajes que quedan para escoger
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