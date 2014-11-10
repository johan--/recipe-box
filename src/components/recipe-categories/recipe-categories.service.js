angular.module('recipeBox')
      .service('recipeCategoriesService', ['$firebase', function($firebase) {


  // $scope.recipes = recipesArr;

        return {

          viewTag : function(tag) {
          var uid = localStorage.getItem('uid');
          var viewFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + uid + '/recipes/';

          var ref = new Firebase(viewFBURL);
          var sync = $firebase(ref);
          var recipesArr = sync.$asArray();
          var currentTag = [];

            for (var i = 0; i < recipesArr.length; i++) {
              if (recipesArr[i].tags.indexOf(tag) != -1) {
                currentTag.push(recipesArr[i]);
              }
            }
            console.log(recipesArr[0]);
            return currentTag;


          }

        }

        }]);