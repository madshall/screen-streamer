var spawn = require('child_process').spawn,
	Stream = require('stream'),
	PngStreamer = require('png-streamer'),
	JpgStreamer = require('jpg-streamer');


module.exports = exports = function(options, callback){
	options = Object.assign({
		duration: 86400,
		fps: 1,
		offsetX: 0,
		offsetY: 0,
		display: '0.0',
		maxWidth: -1,
		maxHeight: -1,
		format: 'png',
		quality: '1'
	}, options);

	var formats = {
			jpeg: 'image2pipe',
			png: 'image2pipe'
		},
		ffmpegArgs = [
			'-t',
			options.duration,
			'-s',
			options.width + 'x' + options.height,
			'-f',
			'x11grab',
			'-i',
			':' + options.display + '+' + options.offsetX + ',' + options.offsetY,
			'-vf',
			'scale=' + options.maxWidth + ':' + options.maxHeight + ', fps=' + options.fps,
			'-f',
			formats[options.format]
		];


	if(options.format == 'jpeg')
		[].push.apply(ffmpegArgs, ['-q', options.quality]);

	if(options.format == 'png')
		[].push.apply(ffmpegArgs, ['-vcodec', 'png']);


	ffmpeg = spawn('ffmpeg', ffmpegArgs.push('pipe:1') && ffmpegArgs);


	if(!callback){
		var stream = new Stream();
		ffmpeg.stdout.pipe(stream);
		return stream;
	}

	if(options.format == 'png')
		new PngStreamer(ffmpeg, callback);
	else if(options.format == 'jpeg'){
		new JpgStreamer(ffmpeg, callback);
	}
};