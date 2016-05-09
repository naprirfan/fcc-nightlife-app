var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('API Endpoint', function() {
  it('should return JSON on GET /search/boston', function(done){
  	this.timeout(20000);
  	chai.request(server)
  		.get('/search/boston')
  		.end(function(err,res){
  			res.should.have.status(200);
  			res.should.be.json;
  			done();
  		});
  });
  it('should add another case');
  it('should add another case');
  it('should add another case');
  it('should add another case');
});
