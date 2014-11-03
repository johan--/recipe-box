'use strict';

// angular.module('recipeBox')
// .controller('addRecipeCtrl', ['$scope', '$rootScope', 'firebase', 'firebaseSimpleLogin', function($scope, $rootScope, $firebase, firebaseSimpleLogin) {

recipeBox.controller('addRecipeCtrl', ['$scope', '$rootScope','$firebase', '$firebaseSimpleLogin',  function($scope, $rootScope,$firebase, $firebaseSimpleLogin) {

////Firebase stuff ////
$rootScope.uid = localStorage.getItem('uid');

var userFBURL = 'https://glowing-inferno-7484.firebaseIO.com/profiles/' + $rootScope.uid + '/recipes/'; 

var ref = new Firebase(userFBURL);
var sync = $firebase(ref);
$scope.fb_deets = sync.$asArray();


$scope.addRecipe = function(submission) {
 $scope.fb_deets.$add({title: submission.title, ingredients: submission.ingredients, directions: submission.directions, image: "https://s3-us-west-2.amazonaws.com/recipe-box/" + $scope.file.name});
}

////S3 stuff/////

$scope.creds = {
  bucket: amazon_bucket,
  access_key: amazon_access_key,
  secret_key: amazon_secret_key
};

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





