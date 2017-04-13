// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studSchema = new Schema({
	rollno : Number,
	firstname : String,
	lastname : String,
	address : String,
})

module.exports = mongoose.model('student' , studSchema);