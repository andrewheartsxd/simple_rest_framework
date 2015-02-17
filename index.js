'use strict';

var server = require('./lib/server');
var router = require('./lib/router');
var folderMaker = require('./lib/folderCheck');

var validPaths = [];

function addResource(input) {
  folderMaker.makeFolder(input,  function(err) {
    if (err) { 
      throw err; 
    } else { 
      validPaths.push('/' + input);
      console.log('Resource added');
      console.log(validPaths);
    }
  });
}

function startServer() {
  console.log(validPaths);
  server.start(router.route);
};

exports.addResource = addResource;
exports.startServer = startServer;


