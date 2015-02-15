'use strict';
var fs = require('fs');
//var poster = require('./router2');

function base(newPathname, response, fileNum, request, requestType) {
  console.log('Request handler "base" was called.');

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify({msg: 'ohaider'}));
  response.end();
}

function superheroes(newPathname, response, fileNum, request, requestType) {
  console.log('Request handler "superheroes" was called.');
  if(requestType === 'POST') {
    var input = '';

    request.on('data', function(data) {
      input += data.toString('utf-8');
    });

    request.on('end', function() {
      fs.writeFile(('./lib/superheroes/' + fileNum + '.json'), input, function(err) {
        if(err) return console.log(err);
        console.log('data > heroname.json');
      });
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify({msg: "File created"}));
      response.end();
    });
  }
}

exports.base = base;
exports.superheroes = superheroes;
//  ('/superheroes/' + fileNum + '.json')
