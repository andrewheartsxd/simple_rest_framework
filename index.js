'use strict';

var server = require('./lib/server');
var router = require('./lib/router');
var folderMaker = require('./lib/folderCheck');

var validPaths = [];

function addResource(input) {
  validPaths.push('/' + input);
  folderMaker.makeFolder(input,  function(err) {
    if (err) { 
      throw err; 
    } else { 
      console.log('Resource added');
    }
  });
}

function startServer() {
  console.log(validPaths);
  server.start(router.route, validPaths);
};

exports.addResource = addResource;
exports.startServer = startServer;


