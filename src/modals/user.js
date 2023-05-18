 const mongoose = require('mongoose');
 const validator = require('validator');
 const bcrypt = require('bcryptjs');
 const conn = require('../db/connection');

var Schema = mongoose.Schema;

var model = new Schema({
  first_name : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
  last_name : { type : String,  max : [127, "Max Length is 127 characters"] },
  email:{ type:String},
  phoneno: {
    type: String
  },
  username:{type : String, required : true, max : [10, "Max Length is 10 characters"]},
  password:{type:String,required:true},
  document:{type:String},
  userprofile:{type:String}
  });   
  model.pre('save',async function(next){
    if(this.isModified('password'))
    {
     this.password = await bcrypt.hash(this.password,10);
    }
    next();
  })
  const  usermodel =new mongoose.model('users', model );
  module.exports = usermodel;   
