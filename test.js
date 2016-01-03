/**
 * Created by madshall on 1/2/16.
 */
var screenStreamer = require('./index');
var i = 0;
screenStreamer({
    width: 800,
    height: 600,
    fps: 2,
    duration: 2,
    format: 'jpeg'
}, function(err, data){
    console.log(data);
})