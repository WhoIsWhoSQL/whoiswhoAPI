module.exports = app => {
    const games = require("../controllers/game.controller.js");
    const validateToken = require("../helpers/validateTokens");
  
    var router = require("express").Router();


    router.get("/",validateToken, games.findMyGames);
    router.post("/", validateToken,games.create);
    router.post("/join", validateToken,games.join);
  
    router.put("/moves",validateToken,games.addMove);
    router.get("/moves",validateToken,games.getMoves);
    router.get("/results",validateToken,games.getResults);

    app.use('/api/games', router);
  
  };
  
  
  