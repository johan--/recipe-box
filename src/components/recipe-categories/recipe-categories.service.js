angular.module('recipeBox')
      .service('recipeCategoriesService', ['$firebase', '$location', function($firebase, $location) {
        return {

          viewTag : function(tag, recipesArr) {


          var currentTag = [];

            for (var i = 0; i < recipesArr.length; i++) {
              if (recipesArr[i].tags.indexOf(tag) != -1) {
                currentTag.push(recipesArr[i]);
              }
            }

            console.log('???', currentTag);

            var urlTag = tag.toLowerCase().replace(/\s/g, "-");

            $location.path('/' + tag);
            console.log(urlTag)
            return currentTag;

          }

        }

        }]);