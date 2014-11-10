angular.module('recipeBox')
      .service('firebaseService', ['$firebase', '$rootScope', function($firebase, $rootScope) {
        return {

           addToCategory : function(category, submission, fileName){
            $rootScope.uid = localStorage.getItem('uid');

          var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid +"/"+ category;
          var ref = new Firebase(FBURL);
          var sync = $firebase(ref);
          var cat_deets = sync.$asArray();

            cat_deets.$add({title: submission.title,
                            ingredients: submission.ingredients,
                            directions: submission.directions,
                            image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + fileName
                          });

            }
           }



        }]);