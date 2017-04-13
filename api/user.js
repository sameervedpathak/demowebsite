var User = require('../schema/schema');
var cnf = require('../config/config');
var db = cnf.database;


exports.createuser = function(req, res) {
    console.log(req.body);
    console.log("createuser calling..");
    var user = new User({
      name : req.body.name,
      username : req.body.username,
      password : req.body.password,
      address : req.body.address,
      emailId : req.body.emailid
    })

    user.save(function(err,result){
      if(err){
        console.log(err);
        //res.send(err);
        var responsedata = {
          'message' : 'Failed to create user...',
          'status' : 0 
        }
      }else{
        var responsedata = {
          'message' : 'User has been created...',
          'status' : 1 
        }
        
      }
      res.jsonp(responsedata);
    })
};

exports.dologin = function(req,res){
  console.log("dologin Api calling");
  User.findOne({
    username : req.body.username,
    password: req.body.password} , {"password":0}, function(err , result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      var responsedata = {
        'status' : 1,
        'record' : result
      }
      res.jsonp(responsedata);
    }
  })
};

exports.updateProfile = function(req,res){
  User.update({'_id': req.body._id} , {$set: {'name' : req.body.name , 
    'address' : req.body.address , 
    'username' : req.body.username}
  },function(err,result){
    var responsedata;
    if(result){
      responsedata = {
        'status' : 1,
        'message' : 'profile data updated'
      }
    }else{
      responsedata = {
        'status' : 0,
        'message' : 'Failed to update'
      }
    }
    res.jsonp(responsedata);
  })
};
