var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));


var user = require('./user');
var student = require('./student');

//User Api's
app.post('/api/createuser',user.createuser);
app.post('/api/dologin' ,user.dologin);
app.post('/api/updateProfile' , user.updateProfile);

//Student Api's
app.post('/api/getallstud',student.getallstud);

module.exports = app;
