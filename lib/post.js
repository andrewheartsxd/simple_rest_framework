'use strict';
var fs = require('fs');

function post(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "POST" was called');

  var input = '';

  request.on('data', function(data) {
    input += data.toString('utf-8');
  });

  request.on('end', function() {
    fs.writeFile(('../data/' + uniquePath + '.json'), input, function(err) {
      if(err) return console.log(err);

    });

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({msg: "File created"}));
    response.end();
  });
}

exports.post = post;
