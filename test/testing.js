'use strict';

require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var fs = require('fs');

chai.use(chaiHttp);

var expect = chai.expect;


describe('our http server', function() {
  describe('all', function() {

    var fileCount;
    fs.readdir('./superheroes/data/', function(err, files) {
      if(err){
        throw err;
      }
      else {
        fileCount = files.length;
        console.log('FILECOUUUUUNT: ' + fileCount);
      }
    });

    var server = 'localhost:3000';

    it('should respond to a POST request', function(done) {
      chai.request(server)
      .post('/superheroes')
      .send({hero: "cyclops", identity: "scott summers"})
      .end(function(err, res) {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.text).to.equal(JSON.stringify({msg: "File created!"}))
        done();
      })
    });

    it('should respond to a GET request', function(done) {
      chai.request(server)
      .get('/superheroes/cyclops')
      .end(function(err, res) {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        fs.readFile('./superheroes/data/cyclops.json', function(err, data) {
          if (err) throw err;
          expect(res.text).to.equal(data.toString());
          done();
        })
      })
    });
    
    it('should respond to a PUT request', function(done) {
      chai.request(server)
      .put('/superheroes/cyclops')
      .send({hero: "cable", identity: "nathan summers"})
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal(JSON.stringify({hero: "cable", identity: "nathan summers"}))
        done();
      })
    });

    it('should respond to a PATCH request', function(done) {
      chai.request(server)
      .patch('/superheroes/cyclops')
      .send({hero: "xman", identity: "nathan summers", team: "xmen"})
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal(JSON.stringify({hero: "xman", identity: "nathan summers", team: "xmen"}))
        done();
      })
    });

    it('should respond to a DELETE request', function(done) {
      chai.request(server)
      .delete('/superheroes/cyclops')
      .end(function(err, res) {
        console.log(err);
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        fs.readdir('./superheroes/data/', function(err, files) {
          if(err) throw err;
          expect(files.length).to.equal(fileCount);
          done();
        });
      });
    });
  });
});

  

