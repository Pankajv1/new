const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sidemenumodel = new Schema({
 name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
 link:  { type : String, required : true, max : [127, "Max Length is 127 characters"] },
 toltip:{ type : String, required : true, max : [127, "Max Length is 127 characters"] },
 level:{ type : String, required : true, max : [127, "Max Length is 127 characters"] },
 type: {type:String,required:true},
 menuimage:{type:String}
 });   
 
 const  sidemenu =new mongoose.model('sidemenus', sidemenumodel );
 
 module.exports = sidemenu;   
