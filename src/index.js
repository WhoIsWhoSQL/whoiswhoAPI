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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Who is Who SQL API." });
});

require("./routes/user.routes.js")(app);
require("./routes/classroom.routes.js")(app);
require("./routes/exercise.routes.js")(app);
require("./routes/game.routes.js")(app);

//require("./routes/old_auth.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
