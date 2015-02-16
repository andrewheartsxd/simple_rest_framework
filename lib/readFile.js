'use strict';

var fs = require('fs');

function readContent(fileName, callback) {
  fs.readFile(fileName, function(err, content) {
    if (err) return callback(err);
    callback(null, content);
  })
}

exports.readContent = readContent;
