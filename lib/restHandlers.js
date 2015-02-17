'use strict';

var postRequest = require('./post');
var getRequest = require('./get');
var patchRequest = require('./patch');
var putRequest = require('./put');
var deleteRequest = require('./delete');

var restHandler = function(){};
restHandler.prototype.POST = postRequest.POST;
restHandler.prototype.GET = getRequest.GET;
restHandler.prototype.PATCH = patchRequest.PATCH;
restHandler.prototype.PUT = putRequest.PUT;
restHandler.prototype.DELETE = deleteRequest.DELETE;

module.exports = new restHandler();
