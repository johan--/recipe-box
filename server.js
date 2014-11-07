// Node.js proxy server for CORS requests with single page, no-backend apps.
//
// Instructions:
// 1) Place file into your app directory
// 2a) If you don't have a package.json file in this directory, run "npm init" first
// 2b) Run "npm install --save express request query-string"
// 3) Run server with "node server.js"
// 4) Configure Express to use whatever folder you want to serve your site out of.
//    By default, this will run out of whatever folder you have your server.js in,
//    but you shouldn't do this since it'll make everything in this folder accessible,
//    which you may not want.
// 5) Good to go! You can now access your server at http://localhost:3000.
//    To make requests, you can make AJAX requests to /proxy, with the url and any
//    additional params in the query string. For instance, making a request to Google
//    with a "name" parameter set to "Bob" and an "age" param set to "20" looks like this:
//
//      GET /proxy?url=http://www.google.com/&name=Bob&age=20
//
//    The fully-resolved HTTP request that your server makes is:
//
//      GET http://www.google.com/?name=Bob&age=20
//
//    You can navigate to http://localhost:3000/proxy?url=http://www.google.com/&name=Bob&age=20
//    in your browser manually to see this in action -- you'll see the Google homepage.

var express = require("express");
var harp = require("harp");
var app = express();
var _ = require('underscore');
var path = require('path');


app.use(express.static(__dirname + "/src"));
app.use(harp.mount(__dirname + "/src"));


var port = process.env.PORT || 3000;
console.log("Listening on port " + port);
var server = app.listen(port);


var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';


// var URL = require('url');
// var request = require('request');
// var queryString = require('query-string');

// var http = require('http');
// require('dns').lookup('localhost', console.log)

// // Set static assets config here
// console.log("Looking in", __dirname + '/src');
// app.use(express.static(__dirname + '/src'));


app.get('/proxy', function(req, res) {
	var url = "http://" + req.query.url;
	delete req.query.url;
	url += ('?' + queryString.stringify(req.query)) || '';
	console.log('Proxy request received:', url);

	var options = {
		url: url
	};

	request(options, function(error, response, body) {
		if (error) {
			console.log(error)
			res.send(error);
		} else {
			res.send(body);
		}
	});
});

//////
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.post('/upload', multipartMiddleware, function(req, res) {
  var data = _.pick(req.body, 'type')
  // Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). Alternatively accepts a predicate indicating which keys to pick.
    , uploadPath = path.resolve(__dirname, 'uploads')
    , file = req.files.file;
 	console.log(req.files)

  console.log(file.name); //original name (ie: sunset.png)
  console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
  uploadFile(file);
});



var uploadFile = function(file) {
  console.log("upload file on server");

  var s3bucket = new AWS.S3();

// {params: {Bucket: 'recipe-box'}}

  var params = {
        Bucket: 'recipe-box',
        Key: file.name,
        ContentType: file.type,
        Body: file.file,
        ACL: 'public-read',
        ServerSideEncryption: 'AES256'
      };

  // s3bucket.createBucket(function() {
    // var data = {Key: file.name, Body: file};
    s3bucket.putObject(params, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to recipe-box");
      }

  });
};
// var s3bucket = new AWS.S3({
//     region: 'us-west-2',
//     credentials: new AWS.Credentials(aws_access_key_id, aws_secret_access_key)
//   });




