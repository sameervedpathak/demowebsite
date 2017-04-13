// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var sampleModule = 'demoApp';


// Create the main application
var sampleModule = angular.module('demoApp', ['ui.router','ngMessages','angular-storage','ngFileUpload' , 'ngMap']);

sampleModule
  .run(function( $rootScope, $state ) {
  // Load the facebook SDK asynchronously


})

sampleModule
.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'storeProvider' , function($urlRouterProvider, $stateProvider, $httpProvider , storeProvider) {
  $urlRouterProvider.otherwise('/signin');
 
    $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html',
      controller : 'MainController'
    })

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller : 'MainController'
    })

    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller : 'MainController'
    })

    .state('editprofile', {
      url: '/editprofile',
      templateUrl: 'templates/editprofile.html',
      controller : 'MainController'
    })

    .state('indeed', {
      url: '/indeed',
      templateUrl: 'templates/indeed.html',
      controller : 'MainController'
    });

}]);


angular.module('demoApp').controller('MainController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  'store',
  '$timeout',
  'Upload',
  'NgMap',
  function($scope, $http, $stateParams, $location, $rootScope, $state, store, $timeout ,Upload , NgMap) {

  	$scope.init = function() {
        $scope.usersession = store.get('usersession');
        console.log("user:",$scope.usersession);
  	};
    
    $scope.init();

    $scope.docallBack = function() {
        var friends = ["Mike", "Stacy", "Andy", "Rick"];
        letscallBackFunction(friends, function(res){
          console.log("success");
          console.log(res);
        });

        
    };

    function letscallBackFunction(friends , callback){
        var info = angular.forEach(friends,function (eachName, index){
            console.log(index + 1 + ". " + eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick​
        });
      callback(info);  
      
    };

    //simple for loop
    $scope.forloop = function(){
      var i,j,yy;
        for(i=0; i<10; i++){
            for(j=1 ; j<i ; j++){
              yy = yy+("*");   
            }

        }
      console.log("yy:",yy);
       yy ='';
    };

    //print on simple pattern
    $scope.printPattern = function(){
      var i = 1;
      for(;i<11;i++){
        console.log("*");
      }
    }

    //simple for each in javascrpit
    $scope.SimpleForEach =function(){
      var copyname=[];
      var names = ["sam","sam1","sam2"];
      names.forEach(function(name){
        console.log("name:",name);
      },copyname);
      console.log(copyname);
    }
    /**
      @function signout
      @returns successful signout successful message and go to signin page
      @author Sameer Vedpathak
      @initialDate  2 Sep Sameer Vedpathak 11.00 AM
      @lastDate
    */
    $scope.superadminsignout = function() {
      $cookieStore.remove('superadminuser');
      $scope.init();
      AuthService.isAuthenticated = false;
      $location.path('signin');
    };

    $scope.ConcatTwoArray = function(){
      var A = ["a","b","c"];
      var B = ["d","e","f"];
      var C = A.concat(B);
      console.log("C:",C);
    }

    /**
      @function superadminforgetpass
      @returns successful message, get Email for verify Code and go to Forgate password Verify
      @author sameer vedpathak
      @initialDate  29 Oct sameer vedpathak 10.00 AM
      @lastDate  29 Oct
    */
    $scope.superadminforgetpass = function(data, valid) {
      if (valid) {
        $scope.email = data;
        if ($scope.email == undefined || $scope.email == "") {
          console.log("Please Enter Valid EmailId");

        } else {

          $http.post(baseUrl + 'superadminlogin/superadminforgotpass', data).success(function(res, req) {

            if (res.status == true){
                $scope.superadminCheckEmail = "Please Check Register Email...";
                $scope.ShowsuperadminCheckEmail = true;
                $timeout(function() {
                  // Loadind done here - Show message for 3 more seconds.
                  $timeout(function() {
                  $scope.ShowsuperadminCheckEmail = false;
                }, 3000);
                  $state.go("superadmin/forgotpasswordverify");
                }, 2000);

            }else{
                $scope.errormessage = 'Failed';
                $scope.showEMessage = true;
                $timeout(function() {
                   // Loadind done here - Show message for 3 more seconds.
                  $timeout(function() {
                    $scope.showEMessage = false;
                  }, 3000);
                }, 2000);

            }

          }).error(function(err) {
            console.log(err);
          });
        }
      };
    };

    /**
    @function superadminforgetpassverify
    @returns successful message,Getting password Changed Mail and goes to superadminsignin
    @author sameer vedpathak
    @initialDate  29 Oct sameer vedpathak 2.10 PM
    @lastDate  29 Oct
    */

    $scope.superadminforgetpassverify = function(data, valid) {
      if (valid) {
        $scope.credential = data;
        if ($scope.credential.contact_email == undefined || $scope.credential.contact_email == '' || $scope.credential.password == undefined || $scope.credential.password == "" || $scope.credential.verificationcode == undefined || $scope.credential.verificationcode == "") {
          console.log("Please Enter Valid Email Address");
        } else {
          $http.post(baseUrl + 'superadminlogin/superadminforgotpassverify', $scope.credential).success(function(res, req) {
            if (res.status == false) {
              $scope.SuperadminForgotpassError = "Please Enter Valid Email,Password and Verification Code";
              $scope.ShowSuperadminForgotpassError = true;
              $timeout(function() {
                // Loadind done here - Show message for 3 more seconds.
                $timeout(function() {
                  $scope.ShowSuperadminForgotpassError = false;
                }, 3000);
              }, 2000);
            } else {

              $scope.Superadminpasswordchanged = "Password Successfully Changed";
              $scope.SuperadminpasswordchangedMsg = true;
              $timeout(function() {
                // Loadind done here - Show message for 4 more seconds.
                $timeout(function() {
                  $scope.SuperadminpasswordchangedMsg = false;
                }, 4000);
                $location.path('superadminsignin');
              }, 2000);
            }


          }).error(function(err, res) {
            console.log(err);
          });
        }
      }
    };

    $scope.uploadImage = function(){
        var reader = new window.FileReader();
        reader.readAsDataURL($scope.file[0]);
        reader.onloadend = function() {
          console.log(reader.result);
          var imagedata = {};
          imagedata.img = reader.result;
          $http.post(baseURL + 'uploadImage', imagedata).success(function(res, req) {
            console.log(res);
          }).error(function(err){
            console.log("err");
          });

        };


      
    }
    

    var options = {enableHighAccuracy: true};

    $scope.mapfunction = function(){
      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
          $scope.latlng = 'current';

      });

      //get current location with latitude and longitude
      navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                console.log(JSON.stringify($scope.position));                  
            }, 
            function(error) {                    
                alert('Unable to get location: ' + error.message);
            }, options);
    }

    $scope.mapfunction();
    
    //get current position with latitude and longitude 
    $scope.getpos = function(event){
             $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
             console.log("$scope.latlng:",$scope.latlng);
    };


   $scope.data = {};

    // sample get Api for get indeed job
    /*$scope.scrapeJobs = function () {
      $http.get(baseURL + 'scrapeJobs').success(function(res, req) {
            console.log(res);
          }).error(function(err){
            console.log("err");
      });
    };*/


   /* Function for New User Registration*/       

   $scope.createuser = function(signupfrm) {
      $http.post(baseURL + 'createuser' , $scope.data).success(function(res, req) {
          if(res.status == 1){
            $scope.data = {};
            signupfrm.$setPristine();
          }else{
            console.log("Error...");
          }
        }).error(function(err){
          console.log("err");
      });         
  };

  $scope.user = {};

  /*Function for Login */
  $scope.dologin = function(signinform){
      $http.post(baseURL + 'dologin/', $scope.user).success(function(res){
        if(res.status === 1){
          var usersession = res.record;
          usersession.loginstatus = 'login';
          store.set('usersession',usersession);
          var usersession = store.get('usersession');
          $scope.init();
          $state.go('editprofile');
        }else{
          console.log("login Failed");
        }
      }).error(function(error){
        console.log("something is wrong..");
      })
  };

  $scope.Updatepro = function(updateProfile){
    if(updateProfile){
      $http.post(baseURL + 'updateProfile', $scope.usersession).success(function(res){
        if(res.status == 1){
          store.set('usersession',$scope.usersession);
          $scope.init();
        }else{
          console.log("not updated");
        }
      }).error(function(error){

      });

    }
  };


  }
]);
