'use strict';

var recipeBox = angular.module('recipeBox', ['firebase', 'ngRoute', 'angularFileUpload']);

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

	});


