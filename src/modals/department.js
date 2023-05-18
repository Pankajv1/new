const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departmentmodel = new Schema({
 name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
 });   
 
 const  departments =new mongoose.model('departments', departmentmodel );
 
 module.exports = departments;   
