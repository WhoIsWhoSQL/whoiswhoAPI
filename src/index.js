const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 30200;

var corsOptions = {
  origin: `http://localhost: ${PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec =

{
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WhoisWhoSQL API",
      version:"1.0"
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }],
  servers: [{
      url : "http://localhost:3000",

     } ]
  },
  apis: [`${path.join(__dirname,"./v1/routes/*.routes.js")}`],
};
//require("./v1/routes/user.routes")

//middleware


// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Who is Who SQL API." });
// });


//routes
const userroute = require("./v1/routes/user.routes.js");
const classroomroute = require("./v1/routes/classroom.routes.js");
const exerciseroute = require("./v1/routes/exercise.routes.js");
const gameroute = require("./v1/routes/game.routes.js");

app.use('/api/users', userroute);
app.use('/api/classrooms', classroomroute);
app.use('/api/exercises', exerciseroute);
app.use('/api/games', gameroute);


app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// app.use(
//   '/api-doc',
//   swaggerUI.serve, 
//   swaggerUI.setup(swaggerDocument)
// );
// //require("./routes/old_auth.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
