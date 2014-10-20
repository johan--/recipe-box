'use strict';

angular.module('recipeBox')
  .controller('MainCtrl', function($scope, $firebase, $firebaseSimpleLogin) {

  var ref = new Firebase('glowing-inferno-7484.firebaseIO.com');
  var authClient = $firebaseSimpleLogin(ref);
  var sync = $firebase(ref);
  
});
  
