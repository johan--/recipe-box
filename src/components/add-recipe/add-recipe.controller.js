'use strict';


recipeBox.controller('addRecipeCtrl', ['$scope', '$rootScope', '$location', '$upload', 'firebaseService', function($scope, $rootScope, $location, $upload, firebaseService) {


var tags = [];

$scope.addRecipe = function(submission) {

  for (var i = 0; i < $scope.categories.length; i++) {
    if ($scope.categories[i].state === true) {
      tags.push($scope.categories[i].name);
    }
  }
  for(var i = 0; i < tags.length; i++){
    firebaseService.addToCategory(tags[i], submission, $scope.file.name);
    }

  firebaseService.addToRecipes(submission, tags, $scope.file.name);
  //make this a promise
        // .then(function(ref){
        // $location.path('/your-recipes');

};

//recipe categories
 $scope.categories = [{
        name: "Breakfast",
        state: false
    }, {
        name: "Easy lunch",
        state: false
    }, {
        name: "Entree",
        state: false

    }, {
        name: "Snack",
        state: false
    }, {
        name: "Dessert",
        state: false
    }, {
        name: "Side",
        state: false

    }, {
        name: "Vegetarian",
        state: false
    }, {
        name: "Drink",
        state: false

    }];

    $scope.toggle = function(c) {
      c.state = !c.state;
    };

////S3 stuff/////



  $scope.onFileSelect = function($files) {
    console.log("file?",$files);
    $scope.file = $files[0];
  };


  $scope.upload = function() {
    $upload.upload({
        url: '/upload', //upload.php script, node.js route, or servlet url
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        // data: {myObj: $scope.myModelObj},
        file: $scope.file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);

      });
    };
}]);



