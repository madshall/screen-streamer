# screen-streamer
This module continuously takes screenshots and returns them as png buffers. It uses **FFMPEG** with **x11grab** format support so make sure to have it installed.

## Installation
```bash
npm install screen-streamer

```

## Syntax
screenStreamer(options, callback)

`options` — is an object literal with the following properties
- `duration` — `[Integer]` duration of screen capturing in seconds; default: Number.MAX_SAFE_INTEGER (a kind of forever)
- `fps` — `[Integer]` number of frames per second to capture; default: 1
- `width` — `[Integer]` the width of screen area to capture; **required**
- `height` — `[Integer]` the height of screen area to capture; **required**
- `offsetX` — `[Integer]` the horizontal offset of screen area to capture; default: 0
- `offsetY` — `[Integer]` the vertical offset of screen area to capture; default: 0
- `display` — `[String]` the display id; default: "0.0"

`callback` — a callback function to pass the result Buffer to: `function(err, buffer){ ... }`

## Example
The code below takes a screenshot from main display every second during 10 seconds and saves it to "screenshot_%d.png"
```javascript
var screenStreamer = require('screen-streamer');
var fs = require('fs');
var fileIndex = 0;

screenStreamer({
    width: 1024,
    height: 768,
    fps: 1,
    duration: 10
  }, function(err, buffer){
    if (err) throw err;
  
    fs.writeFile('screenshot_' + fileIndex++ + '.png', buffer, function (err) {
      if (err) throw err;
    });
  });
```


