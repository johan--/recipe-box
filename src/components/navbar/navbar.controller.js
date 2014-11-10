'use strict';

angular.module('recipeBox')
  .controller('NavbarCtrl', ['$scope','$location', function ($scope,$location) {
    $scope.goRecipe = function(route){
    	$location.path("/" + route);

    // $scope.yourRecipes = function() {
    //   if ($location.path() === '/yourRecipes') {
    //     return true;
    //   }
    // }
    }
  }]);
