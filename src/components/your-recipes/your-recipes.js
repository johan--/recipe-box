'use strict'

angular.module('recipeBox')
	.controller('yourRecipesCtrl',
		['$scope', '$rootScope', 'SplitArrayService', '$firebase', '$splash', 'recipeCategoriesService',
		function($scope, $rootScope, SplitArrayService, $firebase, $splash, recipeCategoriesService) {

	var uid = localStorage.getItem('uid');

	var viewFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + uid + '/recipes/';

	var ref = new Firebase(viewFBURL);
	var sync = $firebase(ref);
	var recipesArr = sync.$asArray();
	$scope.recipes = recipesArr;

	$scope.recipeRows = SplitArrayService.SplitArray($scope.recipes, 2);
	console.log($scope.recipeRows);



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

	$scope.tags = ["Breakfast",
       	"Easy lunch",
        "Entree",
        "Snack",
        "Dessert",
        "Side",
        "Vegetarian",
        "Drink"];

$scope.viewCategory = function(tag){
		var currentTag = [];

            for (var i = 0; i < recipesArr.length; i++) {
              if (recipesArr[i].tags.indexOf(tag) != -1) {
                currentTag.push(recipesArr[i]);
              }
            }

            console.log('???', currentTag);

            location.path('/' + tag)

}
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

recipeBox.service('$splash', ['$modal', '$rootScope', function($modal, $rootScope) {
			return {
				open: function(attrs, opts) {
					var scope = $rootScope.$new();
					angular.extend(scope, attrs);
					opts = angular.extend(opts || {}, {
						backdrop: false,
						scope: scope,
						templateUrl: 'view-recipe/content.html',
						windowTemplateUrl: 'view-recipe/index.html'
					});
					return $modal.open(opts);
				}
			};
}]);


