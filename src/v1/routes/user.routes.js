
const users = require("../../controllers/user.controller.js");

const router = require("express").Router();

// Create a new User

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: email del usuario
 *              password:
 *                  type: string
 *                  description: contraseña del usuario
 *          required: 
 *              - name
 *              - password
 *          example:
 *              email: 'teacher@whoiswhosql.edu'
 *              password: '123'
 * 
 *      Token:
 *          type: object
 *          properties:
 *              accessToken:
 *                  type: string
 *                  description: token de acceso oath
 *          
 */



/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: crea un nuevo usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#components/schemas/User'
 *      responses:
 *          200:
 *              description: new user created
 *          
 */
router.post("/", users.create);

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      summary: crea un nuevo usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref : '#components/schemas/User'
 *      responses:
 *          200:
 *              description: usuario logueado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#components/schemas/Token'
 *          
 */
// logeate como un usuario con email-pass y te devuelve el accestoken
router.post("/login", users.login);



// router.get("/", users.findAll);

// // Retrieve a single Users with id
// router.get("/:id", users.findOne);

// // Update a Users with id
// router.put("/:id", users.update);

// // Delete a Users with id
// router.delete("/:id", users.delete);

//app.use('/api/users', router);

module.exports = router;

