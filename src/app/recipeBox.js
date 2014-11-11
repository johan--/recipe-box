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
			'<h2 ng-bind="title"></h2>' +
			'<img ng-src="{{image}}" class="view-recipe-pic" width="300px">' +
			'<div class="row">' +
			'<div class="col-lg-offset-3 col-lg-6">' +
      '<h3>Ingredients</h3>' +
			'<p class="lead" ng-bind-html="ingredients"></p>' +
      '<h3>Directions</h3>' +
			'<p class="lead directions" ng-bind-html="directions"></p>' +
			'</div>' +
			'</div>' +
			'<button class="delete" ng-click="deleteRecipe(id)"><span class="glyphicon glyphicon-trash"></span></button>' +
			'<button class="splash-close" ng-click="$close()"><span class="glyphicon glyphicon-remove"></span></button>' +
			'</div>'
			);

	}]);

