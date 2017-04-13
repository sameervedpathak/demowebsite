var User = require('../schema/schema');
var student = require('../schema/studschema');
var cnf = require('../config/config');
var db = cnf.database;

exports.getallstud = function (req,res) {
	db.student.find({},function(err,result){
		var responcedata ; 
		if(result){
			responcedata = {
				'status' : 1,
				'record' : result,
				'message' : 'success'
			}
		}else{
			responcedata = {
				'status' : 0,
				'message' : 'not getting record'
			}
		}

		res.jsonp(responcedata)
	})
}