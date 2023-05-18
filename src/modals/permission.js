const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionschema = new Schema({
    usertype : { type : String},
    permission:{ type:String,required:true},
    
 });   
 const  permissionmodel =new mongoose.model('permission', permissionschema );
 module.exports = permissionmodel;   
