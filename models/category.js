const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = new Schema({
    categoryname:String,
    categoryslug:String
});

module.exports = mongoose.model('category',category,'categories')