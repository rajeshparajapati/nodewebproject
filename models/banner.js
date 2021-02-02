const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    name:String,
    title:String,
    imagepath:String
});

module.exports = mongoose.model('banner',bannerSchema,'banners');