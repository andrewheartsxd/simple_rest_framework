'use strict';
var fs = require('fs');

function POST(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "POST" was called');

  var input = '';

  request.on('data', function(data) {
    input += data.toString('utf-8');
  });

  request.on('end', function() {
    var sentData = JSON.parse(input);
    var fileName = './data/' + Object.keys(sentData)[0] + '.json';
    console.log(fileName);

    var msg = JSON.stringify({msg: "File already exists!"});
    
    fs.exists(fileName, function(exists) {
      (exists ?
       console.log("already exists") 
      :
       console.log("file created"),
      // THE MSG IS NOT BEING UPDATED B/C OF ASYNC
       msg = JSON.stringify({msg: "File created!"}),
       fs.writeFile(fileName, input, function(err) {
        if(err) return console.log(err)
      }));
    });
    
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(msg);
    response.end();
  });
}

exports.POST = POST;
