'use strict'

angular.module('recipeBox')
  .controller('recipeCategoriesCtrl',
    ['$scope', '$rootScope', '$firebase', '$splash', 'recipeCategoriesService', '$location', 'SplitArrayService',
    function($scope, $rootScope, $firebase, $splash, recipeCategoriesService, $location, SplitArrayService) {

    var uid = localStorage.getItem('uid');

    var viewFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + uid + '/recipes/';

    var ref = new Firebase(viewFBURL);
    var sync = $firebase(ref);
    var recipesArr = sync.$asArray();
    $scope.recipes = recipesArr;


    debugger;
    $scope.currentTag = $location.path();
    $scope.currentTagRecipes = recipeCategoriesService.viewTagRecipes($scope.currentTag, recipesArr);


   $scope.categoryRows = SplitArrayService.SplitArray($scope.currentTagRecipes, 2);

   console.log($scope.categoryRows);

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
     recipeCategoriesService.viewTag(tag, recipesArr);
    }

  $scope.tags = ["Breakfast",
  "Easy lunch",
  "Entree",
  "Snack",
  "Dessert",
  "Side",
  "Vegetarian",
  "Drink"];

}]);


recipeBox.service('SplitArrayService', function () {
  return {
    SplitArray: function (array, columns) {
      if (array.length <= columns) {
        return [array];
      };

      var rowsNum = Math.ceil(array.length / columns);

      var rowsArray = new Array(rowsNum);

      for (var i = 0; i < rowsNum; i++) {
        var columnsArray = new Array(columns);
        for (var j = 0; j < columns; j++) {
          var index = i * columns + j;

          if (index < array.length) {
            columnsArray[j] = array[index];
          } else {
            break;
          }
        }
        rowsArray[i] = columnsArray;
      }
      return rowsArray;
      console.log(rowsArray);
    }

  }

});







