'use strict';

var server = require('./lib/server');
var router = require('./lib/router');

var addResource = 'superheroes';

server.start(router.route, addResource);
