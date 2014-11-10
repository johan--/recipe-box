angular.module('recipeBox')
      .service('firebaseService', ['$firebase', '$rootScope', '$location', function($firebase, $rootScope, $location) {
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

            },

            addToRecipes : function(submission, tags, fileName) {
              $rootScope.uid = localStorage.getItem('uid');
              var recFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid +"/recipes";
              var addRef = new Firebase(recFBURL);
              var sync2 = $firebase(addRef);
              var fb_deets = sync2.$asArray();

              fb_deets.$add({title: submission.title,
                            ingredients: submission.ingredients,
                            directions: submission.directions,
                            tags: tags,
                            image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + fileName})
                              .then(function(ref) {
                              $location.path('/your-recipes');
              })
            },

            viewCategory : function (category) {
              $rootScope.uid = localStorage.getItem('uid');
              var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid +"/"+ category;


              console.log("url",FBURL);
              var ref = new Firebase(FBURL);
              var sync = $firebase(ref);
              var view_deets = sync.$asArray();

              return view_deets;

            },

            deleteRecipe : function()

           }



        }]);