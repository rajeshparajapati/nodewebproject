const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;
const app = express();
const api = require('./routes/api');
const jwtTokenVerify = require('./lib/utility');
const path = require('path');

app.use(cors());
console.log(__dirname);
app.use(body_parser.json());
app.use("/public", express.static(__dirname + '/public'));
app.use('/api/*',(req, res, next)=>{
    freeAuthToken = [
        '/api/login'
        ] 
       let available  =  freeAuthToken.includes(req.baseUrl)     
       if(available){
        next();           
       } else {
        jwtTokenVerify.verifyToken(req,res,next);  
       }
        
});

app.use('/api/',api);

global.__basedir = __dirname;

mongoose.connect('mongodb://localhost:27017/realestate', {useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false});
db = mongoose.connection;
db.on('error',console.error.bind(console,'connection failed'));
db.once('open', function () {
    console.log("Database conencted successfully!");
});
mongoose.set('debug', true);

app.listen(PORT,function(){
    console.log('server running port number'+PORT);
})