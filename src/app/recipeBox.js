'use strict';

var recipeBox = angular.module('recipeBox', ['firebase', 'ngRoute', 'ngSanitize', 'angularFileUpload','ui.bootstrap']);

recipeBox.config(['$routeProvider', function($routeProvider){


	$routeProvider.
	when('/', {
		templateUrl: './index.html',
		controller: 'MainCtrl',
		resolve: {
      // controller will not be loaded until $getCurrentUser resolves
      // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
      'currentUser': ['simpleLogin', function(simpleLogin) {
        // $getCurrentUser returns a promise so the resolve waits for it to complete
        return simpleLogin.$getCurrentUser();
      }]
  }
	}).
	when('/new', {
		templateUrl: './components/add-recipe/add-recipe.html',
		controller: 'addRecipeCtrl'
	}).
	when('/your-recipes', {
		templateUrl: 'components/your-recipes/your-recipes.html',
		controller: 'yourRecipesCtrl'
	}).
	when('/your-recipes/:recipeTag', {
		templateUrl: 'components/recipe-categories/recipe-categories.html',
		controller: 'recipeCategoriesCtrl'
	}).
	when('/', {
		templateUrl: 'components/login/login.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}])
	.controller('initialize',function($rootScope){


		$rootScope.uid = localStorage.getItem('uid');
		console.log($rootScope.uid);

	})

	.run(['$templateCache', function($templateCache){

		$templateCache.put('view-recipe/index.html',
			'<section class="splash" ng-class="{\'splash-open\': animate}" ng-style="{\'z-index\':1000, display: \'block\'}" ng-click="close($event)">' +
			'<div class="splash-inner" ng-transclude></div>' +
			'</section>'
			);
		$templateCache.put('view-recipe/content.html',
			'<div class="splash-content text-center" ng-controller="viewRecipeCtrl">' +
			'<div class="rec-well well well-lg">' +
			'<div class="view-title-holder">' +
			'<h3 class="view-title" ng-bind="title"></h3>' +
			'</div>' +
			'<img ng-src="{{image}}" class="view-recipe-pic" width="300px">' +
			'<div class="row" ng-hide="editing">' +
			'<div class="col-sm-5 ingredients">' +
      '<h4>INGREDIENTS</h4>' +
			'<p class="lead" ng-bind-html="ingredients"></p>' +
       //directions//
			'</div>' +
			'<div class="col-sm-7 directions">' +
      '<h4>DIRECTIONS</h4>' +
			'<p class="lead" ng-bind-html="directions"></p>' +
			'</div>' +
			'</div>' +
			//edit form for ingredients//
			'<div class="row" ng-show="editing">' +
			'<div class="col-sm-5 ingredients">' +
      '<h4>INGREDIENTS</h4>' +
			'<form ng-show="editing" ng-submit="editing = false">'+
			'<textarea class="form-control" rows="10" ng-model="recipe.ingredients" placeholder="Ingredients" ng-required></textarea>' +
			'</div>' + //end of ingredients//
			'<div class="col-sm-7 directions">' +
      '<h4>DIRECTIONS</h4>' +
			'<textarea class="form-control" rows="10" ng-model="recipe.directions" placeholder="Directions" ng-required></textarea>' +
			'</div>' + //end of directions//
			'<div class="row">' + //save button row//
			'<button class="btn" ng-click="editing = false" type="submit">Save</button>' +
      '</form>' +
      '</div>' +
       '</div>' +
      //settings buttons//
			'<div class="settings-buttons" ng-hide="editing">' +
			'<button class="delete" ng-click="deleteRecipe(recipe); $close()"><span class="glyphicon glyphicon-trash"></span></button>' +
			'<button class="edit" ng-click="editing = true"><span class="glyphicon glyphicon-edit"></span></button>' +
			'<button class="favorite"><span class="glyphicon glyphicon-heart-empty"></span></button>' +
			'<button class="share"><span class="glyphicon glyphicon-envelope"></span></button>' +
			'</div>' +
			'<button class="splash-close" ng-click="$close()"><span class="glyphicon glyphicon-remove"></span></button>' +
			'</div>' +
			'</div>'
			);

	}]);

