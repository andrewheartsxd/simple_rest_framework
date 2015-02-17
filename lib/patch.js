'use strict';
var fs = require('fs');

function PATCH(basePath, response, uniquePath, request, requestType) {
  console.log('Request handler "PATCH" was called');
  
  var fileName = '.' + basePath + '/data/' + uniquePath  + '.json';
  console.log(fileName);

  var input = '';

  request.on('data', function(reqData) {
    input += reqData.toString('utf-8');
    console.log(input);
  });

  request.on('end', function() {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    fs.readFile(fileName, function(err, data) {
      if (err) {
        console.log("File not found!");
        response.write(JSON.stringify({msg: "File not found!"}));
        response.end();
      }
      else {
        var existObj = JSON.parse(data);
        var updateObj = JSON.parse(input);

        var existObjKey = Object.keys(existObj);
        console.log(existObjKey);
        var updateObjKey = Object.keys(updateObj);
        console.log(updateObjKey);

        //update new unique properties
        if(updateObjKey.length > existObjKey.length) {
          for(var j = (existObjKey.length); j < (updateObjKey.length); j++) {
            console.log(j);
            console.log(updateObjKey[j]);
            existObj[updateObjKey[j]] = updateObj[updateObjKey[j]];
          }
        }
        //update intersect properties
        for(var i = 0; i < updateObjKey.length; i++) {
          if(updateObjKey[i] === existObjKey[i]) {
            existObj[existObjKey[i]] = updateObj[updateObjKey[i]];
            console.dir(existObj);
          }
        }
        fs.writeFile(fileName, JSON.stringify(existObj), function(err) {
          if(err) throw err;
        });
        response.write(JSON.stringify(existObj));
        response.end();
      }
    });
  });
};

exports.PATCH = PATCH;
