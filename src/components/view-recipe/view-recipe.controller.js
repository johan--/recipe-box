angular.module('recipeBox')
  .controller('viewRecipeCtrl',
    ['$scope', '$rootScope', 'recipeCategoriesService', 'firebaseService', '$location',
    function($scope, $rootScope, recipeCategoriesService, firebaseService, $location) {

    $scope.deleteRecipe = function(id) {
      firebaseService.deleteRecipe(id);
      console.log(id);
    }



    }]);