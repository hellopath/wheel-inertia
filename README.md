# Wheel Inertia

This module solves the problem of longtime events from a trackpad or a magic mouse

The base of the code coming from a comment of @msimpson (https://github.com/msimpson)

See [comments](https://github.com/jquery/jquery-mousewheel/issues/36)
for more details.

Check an example [here](http://requirebin.com/?gist=f7b83882b92024ff89eb)

# Usage

``` js
import inertia from 'wheel-inertia'

// Add your callback
inertia.addCallback(myCallback)

function myCallback(direction) {
	// do something with your wheel event
	// you can also get the direction of wheel
}

// Update the module with your wheel delta, so from inside your 'wheel' listener...
var delta = e.wheelDelta
inertia.update(delta)
```

# Install

With [npm](https://npmjs.org) do:

```
npm install wheel-inertia
```

# License

MIT
