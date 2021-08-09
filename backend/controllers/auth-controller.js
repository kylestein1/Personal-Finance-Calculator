const JWT = require("jsonwebtoken");
const User = require("../models/user");

async function protect(req, res, next){
    //if the token exists -> no token throw error
    let token;
    if(req.cookies.JWT){
        token = req.cookies.JWT;
    }
    else{
        return res.json({message: "please log in"});
    }

    //decode the token (checks if token is invalid, expiration, tampered)
    console.log(token);
    let decoded;
    try{
        decoded = JWT.verify(token, "random");
    }
    catch{
        return res.json({message: "try signing in again"});
    }

    //once decoded, we can access the user id
    const user = await User.findById(decoded.id);
    console.log(user);

    //check if the user exists (if not, throw error)
    //req.isAuthenticated = true (add an attribute)
    req.User = user
    //you can manipulate the request object
    //next() --> passes middlware to the next function()
    next();

}

module.exports = protect;