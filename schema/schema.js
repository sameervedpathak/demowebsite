// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var myModel = mongoose.model('student');
var userSchema = new Schema({
	name : String,
	username : {type :String, required : true , index : {unique :true}},
	password : {type :String, required : true },
	address : String,
	emailId : String
})

module.exports = mongoose.model('User' , userSchema);