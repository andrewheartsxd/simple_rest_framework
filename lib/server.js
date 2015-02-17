'use strict';

var http = require('http');
var url = require('url');
var router = require('./router');
var restHandler = require('./restHandlers');

function start(route, validPaths) {
  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log('Original request: ' + pathname);

    var requestType = request.method;
    console.log('Original request type: ' + requestType);
    var uniquePathStart;
    var uniquePath = ''; 
    var basePath;
    var pathValidator;

    if(pathname.lastIndexOf('/') > 0) {
      uniquePathStart = pathname.lastIndexOf('/') + 1;
      uniquePath = pathname.substring(uniquePathStart, pathname.length);
      basePath = pathname.substring(0, pathname.lastIndexOf('/'));

      if(validPaths.indexOf(basePath) < 0) {
        response.write(JSON.stringify({msg: "Please specify a valid route (i.e. localhost:3000" + validPaths[0]}));
        response.end();
        return console.log("Please specify a valid route (i.e. localhost:3000" + validPaths[0] + ")");
      }
    }
    else {
     basePath = pathname;
     console.log(basePath);
     if(basePath === '/') {
       basePath = pathname;
     }
     else if (validPaths.indexOf(basePath) < 0) {
       response.write(JSON.stringify({msg: "Please specify a valid route (i.e. localhost:3000" + validPaths[0]}));
       response.end();
       return console.log("Please specify a valid route (i.e. localhost:3000" + validPaths[0] + ")");
     }
    }

    console.log("Directory request: " + basePath);
    console.log("File request: " + uniquePath);
    console.log(requestType + ' request for ' + basePath + uniquePath + ' received.');
    route(restHandler, basePath, response, uniquePath, request, requestType);   

  }
  
  http.createServer(onRequest).listen(3000);
  console.log('server listening');

};

exports.start = start;

