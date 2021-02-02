const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {    
    if(!req.headers.authorization){
        return res.send({ code: 401, message: 'Invalid Token!'});
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.send({ code: 401, message: 'Invalid Token!'});
    }
    let payload = jwt.verify(token,'secretkey')
    if(!payload){
        return res.send({ code: 401, message: 'Invalid Token!!'});
    }   
    next();
}

module.exports = {verifyToken:verifyToken};
