'use strict';

var postRequest = require('./post');
//var getRequest = require('./get');
//var patchRequest = require('./patch');
//var putRequest = require('./put');
//var deleteRequest = require('./delete');

var restHandler = new Object();
restHandler.prototype.post = postRequest();
restHandler.prototype.add = function() {
  console.log('1 + 1 = 2');
}
//  restHandler.prototype.GET = getRequest;
//  restHandler.prototype.PATCH = patchRequest;
//  restHandler.prototype.PUT = putRequest;
//  restHandler.prototype.DELETE = deleteRequest;

module.exports = new restHandler();
