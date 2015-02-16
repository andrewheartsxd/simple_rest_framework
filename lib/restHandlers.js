'use strict';

var postRequest = require('./post');
//var getRequest = require('./get');
//var patchRequest = require('./patch');
//var putRequest = require('./put');
//var deleteRequest = require('./delete');

var restHandler = function(){};
restHandler.prototype.POST = postRequest.POST;
restHandler.prototype.add = function() {
  console.log("supppp");
}
//  restHandler.prototype.GET = getRequest;
//  restHandler.prototype.PATCH = patchRequest;
//  restHandler.prototype.PUT = putRequest;
//  restHandler.prototype.DELETE = deleteRequest;

module.exports = new restHandler();
