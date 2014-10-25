'use strict'

angular.module('recipeBox')
.controller('yourRecipesCtrl', ['$scope', '$rootScope', 'firebase', function($scope, $rootScope, $firebase) {

	var userFBURL = 'https://glowing-inferno-7484.firebaseIO.com/' + $rootScope.uid + "/recipes"; 
 
  var ref = new Firebase(userFBURL);
  var sync = $firebase(ref);
  var recipesObj = sync.$asObject();
  $scope.recipes = recipesObj


}]);