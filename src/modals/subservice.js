const mongoose = require('mongoose');
const validator = require('validator');
var Schema = mongoose.Schema;
var subserviceschema = new Schema({
    title : { type : String, required : true, max : [50, "Max Length is 127 characters"] },
    servicename : { type : String,  max : [50, "Max Length is 127 characters"] },
    service_image:{ type:String},
    service_tooltip: {type: String},
    service_description:{type : String, required : true, max : [100, "Max Length is 10 characters"]},
    serviceID:{type:Schema.Types.ObjectId, ref: 'services',required:true}
 
 });   
 const  subservicemodel =new mongoose.model('subservices', subserviceschema );
 module.exports = subservicemodel;   
