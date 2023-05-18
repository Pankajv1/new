const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subsidemenumodel = new Schema({
 name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
 link:  { type : String, required : true, max : [127, "Max Length is 127 characters"] },
 toltip:{ type : String, required : true, max : [127, "Max Length is 127 characters"] },
 level:{ type : String, required : true, max : [127, "Max Length is 127 characters"] },
 type: {type:String,required:true},
 menuimage:{type:String,required:true},
 sidemenuID:{type:Schema.Types.ObjectId, ref: 'sidemenus',required:true}
 });   
 
 const  subsidemenu =new mongoose.model('subsidemenus', subsidemenumodel );
 
 module.exports = subsidemenu;
 ;   
