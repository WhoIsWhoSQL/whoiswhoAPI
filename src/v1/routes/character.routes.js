const character = require("../../controllers/character.controller.js");
const validateToken = require("../../helpers/validateTokens");

var router = require("express").Router();

/* {
    "Id": 5,
    "name": "Philippe",
    "img_picture": "http://localhost/img/wiwclassic1/philippe.jpg",
    "barba": 1,
    "bigote": 1,
    "gorro": 0,
    "gafas": 0,
    "calvo": 1,
    "pendientes": 0,
    "es_hombre": 1,
    "es_mujer": 0,
    "es_afroamericana": 0,
    "color_pelo": "pelirrojo"
  }
 */

 /**
 * @swagger
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      properties:
 *          Id:
 *              type: integer
 *              description: id del personaje    
 *          name:
 *              type: string
 *              description: name to the classroom
 *          img_picture:
 *              type: string
 *              description: url de la imagen
 *          barba:
 *              type: integer
 *              description: 1 si tiene barba, 0 si no
 *          bigote:  
 *              type: integer
 *              description: 1 si tiene bigote, 0 si no
 *          gorro:
 *              type: integer
 *              description: 1 si tiene gorro, 0 si no
 *          gafas:  
 *              type: integer
 *              description: 1 si tiene gafas, 0 si no
 *          calvo:  
 *              type: integer
 *              description: 1 si es calvo, 0 si no
 *          pendientes:        
 *              type: integer
 *              description: 1 si tiene pendientes, 0 si no
 *          es_hombre:
 *              type: integer
 *              description: 1 si es hombre, 0 si no
 *          es_mujer:
 *              type: integer
 *              description: 1 si es mujer, 0 si no
 *          es_afroamericana:
 *              type: integer
 *              description: 1 si es afroamericana, 0 si no
 *          color_pelo:
 *              type: string
 *              description: color del pelo
 *      example:
 *          Id: 5
 *          name: "Philippe"
 *          img_picture: "http://localhost/img/wiwclassic1/philippe.jpg"
 *          barba: 1
 *          bigote: 1
 *          gorro: 0
 *          gafas: 0
 *          calvo: 1
 *          pendientes: 0
 *          es_hombre: 1
 *          es_mujer: 0
 *          es_afroamericana: 0
 *          color_pelo: "pelirrojo"
 *          
 */


/**
 * @swagger
 * /api/v1/characters/{pin}:
 *  get:
 *      summary: Otiene la lista de personajes que quedan para escoger al estudiante logeado
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
 *                          type: array
 *                          items:
 *                             type: object
 *                             $ref : '#components/schemas/Character' 
 *                              
 *                         
*/
router.get("/:pin", validateToken, character.getCharactersToPlay);

module.exports = router;
