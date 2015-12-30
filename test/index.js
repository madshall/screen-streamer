var should = require('chai').should(),
    screenStreamer = require('../index');

describe('#screenStreamer', function() {
  it('returns a Buffer', function(done) {
	screenStreamer({
		width: 320,
		height: 240,
		fps: 1,
		duration: 1
	}, function(err, data){
		data.should.be.an.instanceof(Buffer);
		done();
	})
  });
  
  it('returns buffer with "length"', function(done) {
	screenStreamer({
		width: 320,
		height: 240,
		fps: 1,
		duration: 1
	}, function(err, data){
		data.should.have.property('length').which.is.a('number');
		done();
	})
  });
  
  it('returns buffer with PNG header', function(done) {
	screenStreamer({
		width: 320,
		height: 240,
		fps: 1,
		duration: 1
	}, function(err, data){
		var PNG_HEADER_BUF = new Buffer([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
		var PNG_HEADER_STRING = PNG_HEADER_BUF.toString('binary');
		data.toString('binary').indexOf(PNG_HEADER_STRING).should.be.above(-1);
		done();
	})
  });

  it('returns at least 19 PNG for fps:20, duration:1', function(done) {
	var i = 0;
	screenStreamer({
		width: 320,
		height: 240,
		fps: 20,
		duration: 1
	}, function(err, data){
		i++;
		if(i == 19){
			done();
		}
	})
  });

});