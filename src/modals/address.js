const mongoose = require('mongoose');


var Schema = mongoose.Schema;

var model = new Schema({
    userID:{ type:Schema.Types.ObjectId, ref: 'users',required:true},
    address : { type : String, required : true, max : [127, "Max Length is 127 characters"] },

 });   

 const  usermodel =new mongoose.model('addresses', model );
 module.exports = usermodel;   
