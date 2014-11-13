'use strict';

angular.module('recipeBox')
  .controller('NavbarCtrl', ['$scope','$location', function ($scope,$location) {
    $scope.goRecipe = function(route){
    	$location.path("/" + route);

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    }
  }]);
