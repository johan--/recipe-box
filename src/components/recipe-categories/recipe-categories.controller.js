'use strict'

angular.module('recipeBox')
  .controller('recipeCategoriesCtrl',
    ['$scope', '$rootScope', '$splash', 'recipeCategoriesService', 'firebaseService', '$location',
    function($scope, $rootScope, $splash, recipeCategoriesService, firebaseService, $location) {


    $scope.currentTag = $location.path().slice(14).replace("-", " ");
    $scope.currentTagRecipes = firebaseService.viewCategory($scope.currentTag);



    $scope.catActive = function (viewLocation) {
        var viewLocation = viewLocation.toLowerCase().replace(/\s/, "-")
        var viewLocation = "/your-recipes/" + viewLocation
        return viewLocation === $location.path();
    };


   $scope.openRecipe = function(recipe) {
      var styled_ingredients = recipe.ingredients.split(',').join('<br>');
      var styled_directions = recipe.directions.split('.').join('.<br>');
      $splash.open({
        recipe: recipe,
        image: recipe.image,
        title: recipe.title,
        ingredients: styled_ingredients,
        directions: styled_directions

    });
  };

  $scope.viewCategory = function(tag){
      var tag = tag.replace(/\s/g, "-");
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


