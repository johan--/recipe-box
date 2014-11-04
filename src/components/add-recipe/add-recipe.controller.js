'use strict';

// angular.module('recipeBox')
// .controller('addRecipeCtrl', ['$scope', '$rootScope', 'firebase', 'firebaseSimpleLogin', function($scope, $rootScope, $firebase, firebaseSimpleLogin) {

recipeBox.controller('addRecipeCtrl', ['$scope', '$rootScope','$firebase', '$firebaseSimpleLogin', '$location', function($scope, $rootScope,$firebase, $firebaseSimpleLogin, $location) {

////Firebase stuff ////
$rootScope.uid = localStorage.getItem('uid');

var userFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid + '/recipes/'; 

var ref = new Firebase(userFBURL);
var sync = $firebase(ref);
$scope.fb_deets = sync.$asArray();

var tags = [];

$scope.addRecipe = function(submission) {
  for (var i = 0; i < $scope.categories.length; i++) {
    if ($scope.categories[i].state === true) {
      tags.push($scope.categories[i].name);
    }
  }
  $scope.fb_deets.$add({title: submission.title, 
  ingredients: submission.ingredients, 
  directions: submission.directions, 
  tags: tags,
  image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + $scope.file.name}).then(function(ref){
        $location.path('/your-recipes');
        console.log($location.path());
  });
}

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
  $scope.file = $files[0];
};

$scope.upload = function() {
  // Configure The S3 Object
  var bucket = new AWS.S3({
    region: 'us-west-2',
    credentials: new AWS.Credentials($scope.creds.access_key, $scope.creds.secret_key)
  });

  if($scope.file) {
    var params = {
      Bucket: $scope.creds.bucket,
      Key: $scope.file.name,
      ContentType: $scope.file.type,
      Body: $scope.file,
      ACL: 'public-read',
      ServerSideEncryption: 'AES256' };

      bucket.putObject(params, function(err, data) {
        if(err) {
        // There Was An Error With Your S3 Config
        alert(err.message);
        return false;
      }
      else {
        console.log(data);
       
        console.log('Upload Done');
      }
    })
      .on('httpUploadProgress',function(progress) {
          // Log Progress Information
          console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
        });
    }
    else {
    // No File Selected
    alert('No File Selected');
  }
}


}]);

 

