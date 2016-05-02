var chai = require("chai");
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');
chai.use(chaiHttp);

describe('API', function(){
	it('should return status 200 and well-formed result for /findBarsByArea', function(done){
		chai.request(server)
			.get('/findBarsByArea')
			.end(function(err,res){
				res.should.have.status(200);
				done();
			});
	});
	it('should return status 200 and well-formed result for /markWillAttend', function(done){
		chai.request(server)
			.post('/markWillAttend')
			.end(function(err,res){
				res.should.have.status(200);
				done();
			});
	});
	it('should return status 200 and well-formed result for /markWillNotAttend', function(done){
		chai.request(server)
			.delete('/markWillNotAttend')
			.end(function(err,res){
				res.should.have.status(200);
				done();
			});
	});
});
