

var express = require("express");
var harp = require("harp");
var app = express();
var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var staticFolder = process.env.NODE_ENV == "production" ? "dist" : "src";

app.use(express.static(__dirname + "/" + staticFolder));
app.use(harp.mount(__dirname + "/" + staticFolder));


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
  // Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys).
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
  fs.readFile(file.path, function(err, data) {
  	//FS reads files and
  	console.log(data);
	  var params = {
	        Bucket: 'recipe-box',
	        Key: file.name,
	        ContentType: file.type,
	        Body: data,
	        ACL: 'public-read',
	        ServerSideEncryption: 'AES256'
	      };

	    s3bucket.putObject(params, function(err, data) {
	      if (err) {
	        console.log("Error uploading data: ", err);
	      } else {
	        console.log("Successfully uploaded data to recipe-box");
	      }
	  });

  });

// {params: {Bucket: 'recipe-box'}}

};




