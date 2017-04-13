//for database connection
var mysql = require('mysql');
var http = require('http');
var nodemailer = require('nodemailer');
var mongo = require('mongodb');
var monk = require('monk');
var db ;

var enviroment = {
	Dbconnection : mysql.createPool({
			database : 'demowebsite',
		    user : 'root',
			password : '',
		    host :'localhost',
	
	}),

	//db : monk('localhost:27017/test'),

	/** Function For Time stamp**/
	timestamp: function() {
      var UTCtimestamp = new Date();
      return UTCtimestamp.getTime();
    }   

}
enviroment.siteUrl = 'https://www.sample.com';

module.exports = enviroment;
 

