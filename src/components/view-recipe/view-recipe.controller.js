angular.module('recipeBox')
  .controller('viewRecipeCtrl',
    ['$scope', '$rootScope', 'recipeCategoriesService', 'firebaseService', '$location',
    function($scope, $rootScope, $splash, recipeCategoriesService, firebaseService, $location) {

    $scope.deleteRecipe = function(id) {
      firebaseService.deleteRecipe(id);
    }



    }]);