'use strict';
var fs = require('fs');

function PUT(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "PUT" was called');
  
  var fileName = '.' + basePath + '/data/' + uniquePath  + '.json';
  console.log(fileName);

  var input = '';

  request.on('data', function(reqData) {
    input += reqData.toString('utf-8');
    console.log(input);
  });

  request.on('end', function() {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    fs.readFile(fileName, function(err, data) {
      if (err) {
        console.log("File not found!");
        response.write(JSON.stringify({msg: "File not found!"}));
        response.end();
      }
      else {
        var existObj = JSON.parse(data);
        var updateObj = JSON.parse(input);

        existObj = updateObj;
        
        fs.writeFile(fileName, JSON.stringify(existObj), function(err) {
          if(err) throw err;
        });
        response.write(JSON.stringify(existObj));
        response.end();
      }
    });
  });
}

exports.PUT = PUT;
