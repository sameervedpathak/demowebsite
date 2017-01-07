// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var sampleModule = 'demoApp';


// Create the main application
var sampleModule = angular.module('demoApp', ['ui.router','ngMessages','angular-storage']);

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
      templateUrl: 'templates/home.html'
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
  function($scope, $http, $stateParams, $location, $rootScope, $state, store, $timeout) {

  	$scope.init = function() {
        
  	};

    $scope.login = function() {
        console.log("login function calling");
        console.log($scope.user);
        $http.post(baseURL + 'userlogin', $scope.user).success(function(res, req) {
          
          /*if (res.status == true) {
            AuthService.isAuthenticated = true;
            var superadminuser = {
              'login': true,
              'username': res.record[0].username,
              'useremail': res.record[0].useremail,
              'userid': res.record[0].userid,
              'superadminid': res.record[0].userid,
              'token' : res.token
            };
            AuthService.isAuthenticated = true;
            $cookieStore.put('superadminuser', superadminuser);
            $scope.init();
            $location.path('/welcomepage');
          } else if (res.status === false) {
            //console.log("login failed");
              $scope.errmessage = 'Failed To Login';
            $scope.showerrmessage = true;
             $timeout(function() {
              $timeout(function() {
                $scope.showerrmessage = false;
              }, 3000);
            }, 2000);
          }*/
        }).error(function() {
          console.log("Connection Problem.");
        }); 
    };

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

  }
]);
