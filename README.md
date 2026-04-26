# banglejs-2-simple-clock-hands #

draws clock hands made of digits for an analog clock on a Bangle.js 2

This module draws hands showing the time also in digital digits for an analog clock running on a [Bangle.js 2](https://www.espruino.com/Bangle.js2).

![](Demo.png)

## Usage ##

Within a clock implementation, the module may be used as follows:

```javascript
let Clockwork = require(...);
Clockwork.windUp({
  hands:require('https://raw.githubusercontent.com/DanielDecker/banglejs-2-digital-clock-hands/main/ClockHands.js'),
  ...
});
```

## Example ##

The following code shows a complete example for a (still simple) analog clock using these clock hands:

```javascript
let Clockwork = require('https://raw.githubusercontent.com/rozek/banglejs-2-simple-clockwork/main/Clockwork.js');

Clockwork.windUp({
  face: require('https://raw.githubusercontent.com/rozek/banglejs-2-four-numbered-clock-face/main/ClockFace.js'),
  hands:require('https://raw.githubusercontent.com/DanielDecker/banglejs-2-digital-clock-hands/main/ClockHands.js'),
},{
  Foreground:'#000000', Background:'#FFFFFF', Seconds:'#FF0000'
});
```

## License ##

[MIT License](LICENSE.md)
