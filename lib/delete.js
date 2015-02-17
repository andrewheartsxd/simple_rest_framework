'use strict';
var fs = require('fs');

function DELETE(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "DELETE" was called');
  
  var fileName = '.' + basePath + '/data/' + uniquePath  + '.json';
  console.log(fileName);
  
  fs.unlink(fileName, function(err) {
    if (err) console.log("File not found or unable to be deleted!");
    console.log("File successfully deleted");
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("File successfully deleted");
  });
}

exports.DELETE = DELETE;
