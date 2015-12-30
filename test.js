var screenStreamer = require('./index.js');

var i = 0;
screenStreamer({
	width: 320,
	height: 240,
	fps: 20,
	duration: 1
}, function(err, data){
	console.log(i);
});
