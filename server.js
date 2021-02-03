const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const api = require('./routes/api');
const jwtTokenVerify = require('./lib/utility');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path:'config.env'})

PORT = process.env.PORT || 8080
app.use(cors());

app.use(body_parser.json());
app.use("/public", express.static(__dirname + '/public'));
app.use('/api/*',(req, res, next)=>{
    freeAuthToken = [
        '/api/login',
        '/api/registration'
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

mongoose.connect('mongodb+srv://admin:admin123@cluster0.bhyfc.mongodb.net/<dbname>?retryWrites=true&w=majority', {useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false});
db = mongoose.connection;
db.on('error',console.error.bind(console,'connection failed'));
db.once('open', function () {
    console.log("Database conencted successfully!");
});
mongoose.set('debug', true);

app.listen(PORT,function(){
    console.log('server running port number'+PORT);
})