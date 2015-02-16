'use strict';


function route(restHandler, basePath, response, uniquePath, request, requestType) {
  console.log("About to route a " + requestType + " request for " + basePath + uniquePath);

  //console.log(typeof restHandler['add']);
  //restHandler['add']();
  //console.log(typeof restHandler['post']);
  //console.dir(restHandler);


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

exports.route = route;
