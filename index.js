'use strict';

var server = require('./lib/server');
var router = require('./lib/router');

server.start(router.route);
