const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sliderschema = new Schema({
    title : { type : String},
    slider_image:{ type:String,required:true},
    
 });   
 const  slidermodel =new mongoose.model('sliders', sliderschema );
 module.exports = slidermodel;   
