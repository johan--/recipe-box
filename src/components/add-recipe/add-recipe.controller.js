'use strict';

// angular.module('recipeBox')
// .controller('addRecipeCtrl', ['$scope', '$rootScope', 'firebase', 'firebaseSimpleLogin', function($scope, $rootScope, $firebase, firebaseSimpleLogin) {

recipeBox.controller('addRecipeCtrl', ['$scope', '$rootScope','$firebase', '$firebaseSimpleLogin',  function($scope, $rootScope,$firebase, $firebaseSimpleLogin) {

////Firebase stuff ////

$rootScope.uid = localStorage.getItem('uid');

var userFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid + '/recipes/'; 
debugger;
var ref = new Firebase(userFBURL);
var sync = $firebase(ref);
$scope.fb_deets = sync.$asArray();



$scope.addRecipe = function(submission) {
 $scope.fb_deets.$add({title: submission.title, ingredients: submission.ingredients, directions: submission.directions});
}
        


}]);





