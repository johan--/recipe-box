'use strict'

angular.module('recipeBox')
.controller('YourRecipesCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  var name = $rootScope.user;
  console.log(name);
}]);