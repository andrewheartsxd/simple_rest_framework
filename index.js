'use strict';

var server = require('./lib/server');
var router = require('./lib/router');
//var requestHandlers = require('./lib/requestHandlers');

//var handle = {};
//handle['/'] = requestHandlers.base;
//handle['/superheroes'] = requestHandlers.superheroes;

//server.start(router.route, handle);
server.start(router.route);
