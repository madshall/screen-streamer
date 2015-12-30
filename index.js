var spawn = require('child_process').spawn,
	pngStreamer = require('png-streamer');


module.exports = exports = function(options, callback){
	options = Object.assign(options, {
		duration: Number.POSITIVE_INFINITY,
		fps: 1,
		offsetX: 0,
		offsetY: 0,
		display: '0.0'
	});
	
	var ffmpegArgs = [
    	    '-t', 
    	    options.duration, 
    	    '-s', 
    	    options.width + 'x' + options.height, 
    	    '-f', 
    	    'x11grab', 
    	    '-i', 
    	    ':' + options.display + '+' + options.offsetX + ',' + options.offsetY, 
    	    '-vf',
    	    'fps=' + options.fps,
    	    '-f',
    	    'image2pipe',
    	    '-vcodec', 
    	    'png', 
    	    'pipe:1'
        ], 
        ffmpeg = spawn('ffmpeg', ffmpegArgs);
	
	new pngStreamer(ffmpeg, callback);
};