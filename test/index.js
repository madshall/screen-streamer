var should = require('chai').should(),
	Stream = require('stream'),
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
			duration: 1,
		}, function(err, data){
			var PNG_HEADER_BUF = new Buffer([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
			var PNG_HEADER_STRING = PNG_HEADER_BUF.toString('binary');
			data.toString('binary').indexOf(PNG_HEADER_STRING).should.be.above(-1);
			done();
		})
	});

	it('returns buffer with JPG header', function(done) {
		screenStreamer({
			width: 320,
			height: 240,
			fps: 1,
			duration: 1,
			format: 'jpeg'
		}, function(err, data){
			var JPG_HEADER_BUF = new Buffer([0xFF, 0xD8, 0xFF]);
			var JPG_HEADER_STRING = JPG_HEADER_BUF.toString('binary');
			data.toString('binary').indexOf(JPG_HEADER_STRING).should.be.above(-1);
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

	it('returns a Stream when called with one parameter', function() {
		var i = 0;
		screenStreamer({
			width: 320,
			height: 240,
			fps: 20,
			duration: 1
		}).should.be.an.instanceof(Stream)
	});

	it('returns a Stream which has a pipe method when called with one parameter', function() {
		var i = 0;
		screenStreamer({
			width: 320,
			height: 240,
			fps: 20,
			duration: 1
		}).pipe.should.be.an.instanceof(Function)
	});
});