'use strict';

angular.module('recipeBox')
.controller('uploadPic', ['$scope', '$rootScope', 'firebase', function($scope, $rootScope, $firebase) {

////Firebase stuff ////
 
  var ref = new Firebase('https://glowing-inferno-7484.firebaseIO.com/users')
  var sync = $firebase(ref);

////S3 stuff/////

  $scope.creds = {
  bucket: 'recipe-box',
  access_key: 'AKIAJCKTVTT2TIPAVTOA',
  secret_key: '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'
}
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
      ServerSideEncryption: 'AES256' };
 
    bucket.putObject(params, function(err, data) {
      if(err) {
        // There Was An Error With Your S3 Config
        alert(err.message);
        return false;
      }
      else {
        console.log(data);
        // Adding Firebase info
        ref.set({
            $rootScope.user.uid: {
              recipes: {
                Title: {
                  recipe_image: $scope.file.name,  
                  ingredients: "test",
                  directions: "Test"
              }
              }
            }
          });
        
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


 

 
