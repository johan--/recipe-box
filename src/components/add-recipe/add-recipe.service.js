// 'use strict';


// recipeBox.service('s3UploadService', function() {
// return {

// ////S3 stuff/////

//  uploadImage: function(file) {




//   // Configure The S3 Object
//   var bucket = new AWS.S3({
//     region: 'us-west-2',
//     credentials: new AWS.Credentials(creds.access_key, creds.secret_key)
//   });

//   if(file) {
//     var params = {
//       Bucket: creds.bucket,
//       Key: file.name,
//       ContentType: file.type,
//       Body: file,
//       ACL: 'public-read',
//       ServerSideEncryption: 'AES256' };

//       bucket.putObject(params, function(err, data) {
//         if(err) {
//         // There Was An Error With Your S3 Config
//         alert(err.message);
//         return false;
//       }
//       else {
//         console.log(data);

//         console.log('Upload Done');
//       }
//     })
//       .on('httpUploadProgress',function(progress) {
//           // Log Progress Information
//           console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
//         });

//    } else {
//     // No File Selected
//     alert('No File Selected');
//   }
// }



// };

// });








