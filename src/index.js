const express = require("express");
const https = require("https");
var fs = require('fs');
const cors = require("cors");
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 4000;
const domainWeb = process.env.DOMAIN_WEB || "http://localhost:3000";
var corsOptions = {
  origin: `http://localhost: ${PORT}`,origin: domainWeb,
};
console.log("corsOptions",JSON.stringify(corsOptions));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */


const userroute = require("./v1/routes/user.routes.js");
const classroomroute = require("./v1/routes/classroom.routes.js");
const exerciseroute = require("./v1/routes/exercise.routes.js");
const gameroute = require("./v1/routes/game.routes.js");
const moveroute = require("./v1/routes/move.routes.js");
const characteroute = require("./v1/routes/character.routes.js");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger.js");

//ROUTES

var logger = function(req, res, next) {
  
  console.log(req.method+ req.url  );
  next(); // Passing the request to the next handler in the stack.
}
app.use(logger);
app.use('/api/v1/users', userroute);
app.use('/api/v1/classrooms', classroomroute);
app.use('/api/v1/exercises', exerciseroute);
app.use('/api/v1/games', gameroute);
app.use('/api/v1/playmoves', moveroute);
app.use('/api/v1/characters', characteroute);


const certificate_crt = process.env.CERTIFICATE_PATH_CRT || './src/certs/apiwhoiswho.crt';
const certificate_key = process.env.CERTIFICATE_PATH_KEY || './src/certs/apiwhoiswho.pem';
https.createServer({
  cert: fs.readFileSync(certificate_crt),
  key: fs.readFileSync(certificate_key)
},app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  V1SwaggerDocs(app, PORT);
});

