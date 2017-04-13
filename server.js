require('use-strict');
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var config = require('./config/config'); 
var mongoose = require('mongoose');
var path = require('path');
var connect = require('connect');

var app = express();

mongoose.connect(config.database , function (err) {
	if(err){
		console.log("error:", err);
	}else{
		console.log("connected to the database..");
	}
})


var app = connect();

var port = process.env.PORT || config.port;

// Define the web folder connect and router
var public = connect();
var assets = connect();

var app = require('./api/api');

public.use(serveStatic('public'));
app.use('/',public);

assets.use(serveStatic('assets'));
app.use('/assets',assets);

global.appRoot = path.resolve(__dirname);

app.listen(port);
console.log('Magic happens at port : ' + port);