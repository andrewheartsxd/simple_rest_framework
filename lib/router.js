'use strict';

var folderCheck = require('./folderCheck');

function route(restHandler, basePath, response, uniquePath, request, requestType) {
  console.log("About to route a " + requestType + " request for " + basePath + uniquePath);

  console.log('basePath length: ' + basePath.length);
  console.log('basePath: ' + basePath);
  
  var basePath2 = basePath.substring(1, basePath.length);
  console.log('basePath2: ' + basePath2);

  if(basePath2 === '') {
    console.log("Blank address specified");
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.write(JSON.stringify({msg: 'Please specify a route, i.e. localhost:3000/superheroes'}));
    response.end();
  }
  else {

    folderCheck.ensureExists(basePath2, '0777', function(err) {
      if (err) throw err;
      else console.log("Directory checked");
    });

    if(typeof restHandler[requestType] === 'function') {
      restHandler[requestType](basePath, response, uniquePath, request, requestType);
    }
    else {
      console.log('No request handler found for ' + basePath + uniquePath);
      response.writeHead(404, {'Content-Type': 'application/json'});
      response.write(JSON.stringify({msg: '404 Not found'}));
      response.end();
    }
  }
}

exports.route = route;
