'use strict';

angular.module('recipeBox')
		.controller('MainCtrl', function($scope, $firebase, $firebaseSimpleLogin) {

  var ref = new Firebase('https://glowing-inferno-7484.firebaseIO.com');
  var sync = $firebase(ref);
  
});
  
