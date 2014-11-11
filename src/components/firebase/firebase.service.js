angular.module('recipeBox')
      .service('firebaseService', ['$firebase', '$rootScope', '$location', function($firebase, $rootScope, $location) {

        return {

           addToCategory : function(category, tags, submission, fileName, id){

              $rootScope.uid = localStorage.getItem('uid');
              var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid +"/"+ category;
              var ref = new Firebase(FBURL);
              var sync = $firebase(ref);
              var cat_deets = sync.$asArray();

            cat_deets.$add({title: submission.title,
                            ingredients: submission.ingredients,
                            directions: submission.directions,
                            root_id : id,
                            tags: tags,
                            image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + fileName
                          });

            },

            addToRecipes : function(submission, tags, fileName) {
              $rootScope.uid = localStorage.getItem('uid');
              var recFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid +"/recipes";
              var addRef = new Firebase(recFBURL);
              var sync2 = $firebase(addRef);
              var fb_deets = sync2.$asArray();

              return fb_deets.$add({title: submission.title,
                            ingredients: submission.ingredients,
                            directions: submission.directions,
                            tags: tags,
                            image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + fileName});

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

            deleteRecipeCategory: function(category,root_id){
                $rootScope.uid = localStorage.getItem('uid');
                var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid + '/' + category;
                var ref = new Firebase(FBURL);
          /searching for tag and deleting reference /
                ref.equalTo(root_id)
                   .on('value', function(snap){
                    snap.ref().remove();
              },function(){
                console.log('error');});
          },

            deleteRecipeOrigin : function(id) {
                $rootScope.uid = localStorage.getItem('uid');
                var FBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid + '/' + 'recipes' + '/' + id;
                var ref = new Firebase(FBURL);
                var sync = $firebase(ref);
                sync.$remove();

            },

            deleteRecipe : function(recipe){
              if(confirm("Are you sure you'd like to delete this recipe")) {
              if(recipe.root_id){
                for (var i = 0; i < recipe.tags.length; i++) {
                  this.deleteRecipeCategory(recipe.tags[i], recipe.root_id);
                  this.deleteRecipeOrigin(recipe.root_id);
                }

              } else {
                 this.deleteRecipeOrigin(recipe.$id);
                 for (var i = 0; i < recipe.tags.length; i++) {
                 this.deleteRecipeCategory(recipe.tags[i], recipe.$id);
                 $location.path('/your-recipes')
               }
              }
              }
            }

        }
  }]);

