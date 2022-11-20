const jwt = require("jsonwebtoken");//AUTHENTICATE LOGIN AND RETURN JWT TOKEN


function validateToken(req, res, next) {//get token from request header
    
    try {
        
    //console.log("validando tokens!");
    const authHeader = req.headers["authorization"];
    //console.log("authHeadar:"+ authHeader);
    
    const token = authHeader.split(" ")[1]
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) res.sendStatus(400).send("Token not present")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid")
        }
        else {
           // console.log("user en el token:" + user.user);
            req.user = user.user;
            next() //proceed to the next action in the calling function
        }
    }) //end of jwt.verify()

} catch (error) {
    console.error("error al validar token",error);
    res.status(403).send("No Token available");       
}

} //end of function


  
module.exports = [validateToken];