'use strict';

var fs = require('fs');

function ensureExists(path, mask, callback) {
  console.log("Checking for existing directory");
  if (typeof mask == 'function') {
    callback = mask;
    mask = '0777'; 
  }
  fs.mkdir(path, mask, function(err) {
    if (err) {
      if (err.code == 'EEXIST') callback(null);
      else callback(err);
    }
    else callback(null);
  });
}

function makeFolder(path, callback) {
  console.log("Creating directory");
  path = './' + path;
  fs.mkdir(path, function(err) {
    if (err) {
      if (err.code == 'EEXIST') callback(null);
      else callback(err);
    }
    else callback(null);
  });
}

exports.ensureExists = ensureExists;
exports.makeFolder = makeFolder;
