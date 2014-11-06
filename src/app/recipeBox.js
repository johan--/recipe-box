'use strict';

var recipeBox = angular.module('recipeBox', ['firebase', 'ngRoute', 'angularFileUpload','ui.bootstrap']);

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
	when('/login', {
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
			'<div class="splash-content text-center">' +
			'<h2 ng-bind="title"></h2>' +
			'<img ng-src="{{image}}" class="view-recipe-pic" width="300px">' +
      '<h3>Ingredients</h3>' +
			'<p class="lead" ng-bind="ingredients"></p>' +
      '<h3>Directions</h3>' +
			'<p class="lead" ng-bind="directions"></p>' +
			'<button class="btn btn-lg btn-outline" ng-bind="btnText || \'Close\'" ng-click="$close()"></button>' +
			'</div>'
			);

	}]);

