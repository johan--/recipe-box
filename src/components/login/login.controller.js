'use strict';

angular.module('recipeBox').controller('AuthCtrl', function($scope, $rootScope, $firebase, $firebaseSimpleLogin, $location) {



  var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/users/';
  var ref = new Firebase(FBURL);

  var ref2 = new Firebase('https://glowing-inferno-7484.firebaseIO.com/profiles/');


  var auth = $firebaseSimpleLogin(ref);

  $scope.signIn = function() {
    auth.$login('password', {
      email: $scope.email,
      password: $scope.password
    }).then(function(user) {
      console.log('user', user);
              localStorage.setItem('uid', user.uid);
              $location.path('/your-recipes');
    }, function(error) {
      console.log('error', error);
    });
  };

  $scope.signUp = function() {
    auth.$createUser(
      $scope.email,
      $scope.password
    ).then(function(user) {
      console.log('user', user);
      $scope.signIn();
      ref2.child(user.uid).set('recipes');

    }, function(error) {
      console.log('error', error);
    });
  };

  $scope.signOut = function() {
    localStorage.removeItem('uid');
    console.log("user 1", auth.user);
    auth.$logout(function(){
    });


  };

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var userRef = new Firebase(FBURL + authUser.uid);
    var user = $firebase(userRef).$asObject();

    user.$loaded().then(function() {
      $rootScope.user = user;

    });
  });


  $rootScope.$on('$firebaseSimpleLogin:logout', function (e, authUser) {
      $rootScope.user = null;


  });

});

