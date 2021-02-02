const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const formidable = require('formidable');
const User = require("../models/user");
const Banner = require("../models/banner");
const Category = require('../models/category');
const Page = require("../models/pages");
const path = require('path');
const fs = require('fs');
const Config = require('../config/config').get();
const ObjectId= require("mongoose").Types.ObjectId;
const dateFormat= require("dateformat");
const now = new Date();

router.post('/registration',(req, res)=>{
    let  userData = req.body;
     new User(userData).save((error,registarationUser)=>{
         if(error){
             console.log(error);
         } else {
            let payload  = {subject:registarationUser._id }
            let token = jwt.sign(payload,'secretkey');
            res.send({'status':200,'token':token,'data':registarationUser});
         }
     })

});

router.post('/login',(req, res)=>{
   let userData = req.body
   
   User.findOne({email:userData.email},(error,user)=>{
       if(error){
           console.log(error)
       } else {
           if(!user){
               res.status(401).send('invalid email');               
           }
           else{
            
               if(user.password !== userData.password){
                   res.status(401).send('invalid password');
               } else{
                let payload  = {subject:user._id }
                let token = jwt.sign(payload,'secretkey');
                res.send({'status':200,'token':token,'data':user});                 
               }
           }
       }

   })
})

   router.post('/addbanner',(req,res)=>{    
    const form = new formidable.IncomingForm(); 
        form.parse(req, function(err, fields, files){            
            var oldPath = files.file.path;
            var newPath = path.join(__basedir, '/public') 
                    + '/'+files.file.name;   
            var rawData = fs.readFileSync(oldPath); 
       
            fs.writeFile(newPath,rawData, function(err ,data){ 
                if(err) {
                    console.log(err);
                    res.send({'status':201,"message":"file is not uploaded"});   
                }
                else{       
                    let banners_list = {};            
                    banners_list.imagepath = Config.DIRCTORY_PATH+'public/'+files.file.name;
                    banners_list.name = fields.bannername;
                    banners_list.title = fields.bannertitle;
                    new Banner(banners_list).save((error,banner)=>{
                        if(error){
                            res.send({'status':202,"message":"Files are required"});   
                        }else{
                            res.send({'status':200,"message":"Banner Added Successfully"});
                        }
                    })
                }               
            }) 
        })   
   })

   router.post('/banner_list',(req,res)=>{
       Banner.find({},(err,result)=>{
           if(err){
            res.send({'status':201,"message":"Some thing went wrong"});
           } else {
            res.send({'status':200,"data":result});
           }
       })
   })


   router.get("/banner_detail/:id",((req,res)=>{       
       if(!ObjectId.isValid(req.params.id)){
        res.send({'status':201,"message":"Id is not valid!"});
       } else {
           Banner.findById(req.params.id,(err,result)=>{
               if(err){
                res.send({'status':201,"message":"record is not found!"});   
               } else {
                res.send({'status':200,"data":result}); 
               }
           })
       }

   }))


   router.post('/edit_banner',(req,res)=>{  
       
    const form = new formidable.IncomingForm(); 
        form.parse(req, function(err, fields, files){  
            console.log(fields);
            let banners_list = {};
            banners_list.name = fields.bannername;
            banners_list.title = fields.bannertitle;          
            if(typeof files.file !="undefined"){ 
                var time = dateFormat(now,"hms");        
                 var oldPath = files.file.path;
                 var newPath = path.join(__basedir, '/public') + '/'+time+files.file.name;   
                 var rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath,rawData, function(err ,data){ 
                        if(err) {
                            console.log(err);
                            res.send({'status':201,"message":"file is not uploaded"});   
                        } else {
                            banners_list.imagepath = Config.DIRCTORY_PATH+'public/'+time+files.file.name;
                            Banner.findByIdAndUpdate(fields._id,banners_list,(err,data)=>{
                                if(err){
                                    res.send({'status':201,"message":"record does not update"});   
                                } else {
                                    res.send({'status':200,"message":'record updated successfully'})
                                }
                            })
                        }
                })        
            }else {
                Banner.findByIdAndUpdate(fields._id,banners_list,(err,data)=>{
                    if(err){
                        res.send({'status':201,"message":"record does not update"});   
                    } else {
                        res.send({'status':200,"message":'record updated successfully'})
                    }
                }) 
            }            
        })   
   })

   router.post('/delete_banner',(req,res)=>{
    let id  = req.body.id;
   Banner.findByIdAndDelete({_id:id},(err,data)=>{
       if(err){
           console.log(err)
       }else{
        res.send({'status':200,"message":'record deleted successfully'})
       }
   })
    
   });

   router.post('/add_category',(req,res)=>{
        Category.find({categoryslug:req.body.categoryslug},(err,cat)=>{
            if(err){
                res.send({'status':201,"message":'Error Finding Category'}) 
            }else {
                if(cat.length==0){
                    new Category(req.body).save((error,category)=>{
                        if(error){
                            res.send({'status':201,"message":'Something Went Wrong'})   
                        }else {
                            res.send({'status':200,"message":'record add successfully'}) 
                        }
                    })
                } else{
                    res.send({'status':201,"message":'Category slug already exist'}) 
                }            
            }
        })    
   })

   router.get('/get_categories',(req,res)=>{
       Category.find({},(err,result)=>{
           if(err){
            res.send({'status':201,"message":'Something Went Wrong'}) 
           } else {
            res.send({status:200,'data':result});
           }
       })
   })

   router.post('/add_page',(req,res)=>{
       new Page(req.body).save((err,page)=>{
           if(err){
            res.send({'status':201,"message":'Something Went Wrong'})   
           }else{
            res.send({status:200,"message":"Successfully add page"});  
           }
       })

   })

   
   



module.exports = router