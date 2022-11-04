const character = require("../../controllers/character.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();


/**
 * @swagger
 * /api/characters/{pin}:
 *  get:
 *      summary: Otiene la lista de personajes que quedan para escoger
 *      tags: [Characters]
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
router.get("/:pin", validateToken, character.getCharactersToPlay);

module.exports = router;
