angular.module('recipeBox')
  .controller('viewRecipeCtrl',
    ['$scope', '$rootScope', 'recipeCategoriesService', 'firebaseService', '$location',
    function($scope, $rootScope, recipeCategoriesService, firebaseService, $location) {

    $scope.deleteRecipe = function(recipe) {
      firebaseService.deleteRecipe(recipe);
      console.log(recipe);
    }



    }]);