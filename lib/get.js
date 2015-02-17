'use strict';
var fs = require('fs');

function GET(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "GET" was called');
  
  var fileName = '.' + basePath + '/data/' + uniquePath  + '.json';
  console.log(fileName);
  
  response.writeHead(200, {'Content-Type': 'application/json'});

  fs.readFile(fileName, function(err, data) {
    if (err) {
      console.log("File not found!");
      response.write(JSON.stringify({msg: "File not found!"}));
      response.end();
    }
    else {
      console.log(JSON.parse(data));
      response.write(data);
      response.end();
    }
  });
 };

exports.GET = GET;
