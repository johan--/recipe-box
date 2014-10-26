'use strict'

angular.module('recipeBox')
.controller('yourRecipesCtrl', ['$scope', '$rootScope', '$firebase', function($scope, $rootScope, $firebase) {

	var uid = localStorage.getItem('uid');
debugger;

var viewFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + uid + '/recipes/'; 

  var ref = new Firebase(viewFBURL);
  var sync = $firebase(ref);
  var recipesArr = sync.$asArray();
  $scope.recipes = recipesArr;


}]);

