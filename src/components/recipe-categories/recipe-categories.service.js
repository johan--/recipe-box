angular.module('recipeBox')
      .service('recipeCategoriesService', ['$firebase', '$location', function($firebase, $location) {
        return {

          viewTag : function(tag) {

           var urlTag = tag.toLowerCase().replace(/\s/g, "-");
           $location.path('/your-recipes/' + urlTag);
         }

          // viewTagRecipes : function(tag, recipesArr) {

          // var currentTag = [];

          //   for (var i = 0; i < recipesArr.length; i++) {
          //     if (recipesArr[i].tags.indexOf(tag) != -1) {
          //       currentTag.push(recipesArr[i]);
          //     }
          //   }

          //   console.log('viewTagRecipes function :', currentTag);

          //   return currentTag;

          // }


      };

    }]);