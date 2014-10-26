'use strict';

var recipeBox = angular.module('recipeBox', ['firebase', 'ngRoute', 'angularFileUpload']);

recipeBox.config(['$routeProvider', function($routeProvider){
 

	$routeProvider.
	when('/', {
		templateUrl: './components/add-recipe/add-recipe.html',
		controller: 'addRecipeCtrl'
	}).
	when('/new', {
	}).
	when('/your-recipes', {
		templateUrl: './components/your-recipes/your-recipes.html',
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
