const mongoose = require("mongoose")
const schema = mongoose.Schema;
const pages  = new schema({
    pagename:{
        type:String
    },
    pageslug:{
        type:String
    },
    categoryid:{
        type:schema.Types.ObjectId,
        ref:'categories'
    }

})

module.exports = mongoose.model('pages',pages,'pages');
