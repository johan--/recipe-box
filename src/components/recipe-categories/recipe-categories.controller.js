'use strict'

angular.module('recipeBox')
  .controller('recipeCategoriesCtrl',
    ['$scope', '$rootScope', '$splash', 'recipeCategoriesService', 'firebaseService', '$location', 'SplitArrayService',
    function($scope, $rootScope, $splash, recipeCategoriesService, firebaseService, $location, SplitArrayService) {


    $scope.currentTag = $location.path().slice(14);
    $scope.currentTagRecipes = firebaseService.viewCategory($scope.currentTag);



   $scope.openRecipe = function(recipe) {
      var styled_ingredients = recipe.ingredients.split(',').join('<br>');
      var styled_directions = recipe.directions.split('.').join('.<br>');
      $splash.open({
        image: recipe.image,
        title: recipe.title,
        ingredients: styled_ingredients,
        directions: styled_directions

    });
  };

  $scope.viewCategory = function(tag){
     recipeCategoriesService.viewTag(tag);
    }

  $scope.tags = ["breakfast",
  "easy lunch",
  "entree",
  "snack",
  "dessert",
  "side",
  "vegetarian",
  "drink"];

}]);


