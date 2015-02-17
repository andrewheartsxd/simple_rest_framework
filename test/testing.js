'use strict';

require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

describe('our http server', function() {
  var server = 'localhost:3000';

  it('should respond to a blank request', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.equal('ohaider');
      done();
    });
  });


  it('should respond to a time request', function(done) {
    chai.request(server)
    .get('/time')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(Date.parse(res.text)).to.be.closeTo(Date.now(), 100000);
      done();
    });
  });
  
  it('should respond to a greet request', function(done) {
    chai.request(server)
    .get('/greet/yourname')
    .end(function(err, res) {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.equal("'sup yourname?");
      done();
    });
  });
});

