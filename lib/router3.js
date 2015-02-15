'use strict';

var fs = require('fs');

module.exports = function(req, res, counter) {
  if (req.method === 'POST') {
    
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8');
    });

    req.on('end', function() {
      fs.writeFile('stuff.txt', input, function(err) {
        if(err) return console.log(err);
        console.log('data > stuff.txt');
      });
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.write("File created!");
      res.end();
    })
  }
}

