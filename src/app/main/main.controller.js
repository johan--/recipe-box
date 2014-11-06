'use strict';

angular.module('recipeBox')

.controller('MainCtrl', 'currentUser', function($scope, $firebase, currentUser) {

		var ref = new Firebase('https://glowing-inferno-7484.firebaseIO.com');
		var sync = $firebase(ref);
  
});
  
