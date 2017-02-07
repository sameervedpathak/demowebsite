var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'users');
var md5 = require('md5');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var tinify = require("tinify");
tinify.key = "UPwUk9l8oOfLIjAZDK9n9EcRu-CesJq6";



exports.userlogin = function(req, res) {
    console.log(req.body);
    /*userCRUD.load({
        'username': req.body.username,
        'password': req.body.password
    }, function(error, result) {
        if (result.length > 0) {
            var responsedata = {
                status: 1,
                record: result,
                message: 'login success'
            }
        } else {
            console.log("error:", error);
            var responsedata = {
                status: 0,
                message: 'error login'
            }
        }
        res.jsonp(responsedata)
    })*/

};

exports.uploadImage = function(req,res){
//console.log("req.body.img:",req.body.img);
           
         /* function decodeBase64Image(dataString) {    
              var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                  response = {};
              if (matches.length !== 3) {
                  return new Error('Invalid input string');
              }

              response.type = matches[1];
              response.data = new Buffer(matches[2], 'base64');
              return response;
          };

          var decodedImg = decodeBase64Image(req.body.img);

          var imageBuffer = decodedImg.data;
          var type = decodedImg.type;*/

        var image = req.body.img;
        var n = image.indexOf(",");
        var len = image.length;
        var base64Data = image.substr(n + 1, len);
        var binaryData = new Buffer(base64Data, 'base64');

          function getRandomSpan() {
              return Math.floor((Math.random() * 99999999999) + 1);
          };
          
            var filePath = appRoot + '/assets/';

            mkdirp(filePath, function(err) {
                if (err) throw err;
            });
            
            var ImgfilePath = filePath + '/' + getRandomSpan() +'.png';
            console.log(ImgfilePath);
            
            tinify.fromBuffer(binaryData).toBuffer(function(err, resultData) {
                if (err) throw err;
                fs.writeFile(ImgfilePath, resultData, function(err) {
                        if (err) throw err;
                        console.log('pdf saved');
                        // resize and save compressed image in assets/mobile folder
                        // Resize(image);
                        //saveItem(newimagename);
                });
            });
            

            /*fs.readFile(ImgfilePath, function(err, imageBuffer) {
                if (err) throw err;
                    tinify.fromBuffer(imageBuffer).toBuffer(function(err, resultData) {
                    if (err) throw err;
                    // ...
                    });
            });*/


};


