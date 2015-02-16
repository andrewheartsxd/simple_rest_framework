'use strict';

var http = require('http');
var url = require('url');
var router = require('./router');
var restHandler = require('./restHandlers');

function start(route) {
  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log('Original request: ' + pathname);

    var requestType = request.method;
    console.log('Original request type: ' + requestType);
    var uniquePathStart;
    var uniquePath = ''; 
    var basePath;

    if(pathname.lastIndexOf('/') > 0) {
      uniquePathStart = pathname.lastIndexOf('/') + 1;
      uniquePath = pathname.substring(uniquePathStart, pathname.length);
      basePath = pathname.substring(0, pathname.lastIndexOf('/'));
      console.log("Directory request: " + basePath);
      console.log("File request: " + uniquePath);
    }
    else {
     basePath  = pathname;
    }

    console.log(requestType + ' request for ' + basePath + uniquePath + ' received.');
    route(restHandler, basePath, response, uniquePath, request, requestType);   

  }
  
  http.createServer(onRequest).listen(3000);
  console.log('server listening');

};

exports.start = start;

