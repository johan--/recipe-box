'use strict'

angular.module('recipeBox')
.controller('yourRecipesCtrl',
	['$scope', '$rootScope', 'SplitArrayService', '$firebase', '$splash',
	function($scope, $rootScope, SplitArrayService, $firebase, $splash) {

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
		console.log(styled_ingredients);
		$splash.open({
			image: recipe.image,
			title: recipe.title,
			ingredients: styled_ingredients,
			directions: recipe.directions

		});
	};

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
					console.log("open???");
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


