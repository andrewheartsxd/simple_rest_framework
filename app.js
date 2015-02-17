'use strict';

var restServer = require('./index');

restServer.addResource('superheroes');
restServer.addResource('supervillains');

restServer.startServer();
