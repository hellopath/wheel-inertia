module.exports = {
	addCallback: addCallback,
	update: update,
}

var deltas = [null, null, null, null, null, null, null, null, null],
    timer = null,
    lock = 0,
    direction = undefined,
    cb = undefined,
    seen = 0;

function update(delta) {
	// Check for an inertial peak. And if found, lock the peak
    // checking for 10 more events (decremented in hasPeak on
    // each new event) to prevent the sample window from registering
    // true more than once for each peak.
    if (hasPeak()) {
        lock = 10;
        seen++;
        direction = (delta > 0) ? 1 : -1;
        cb(direction)
    }
    // Shift the deltas backward and add the newest (maintaining the sample window).
    deltas.shift();
    deltas.push(Math.abs(delta));
}

function addCallback(callback) {
    cb = callback;
}

function hasPeak() {
    // Decrement the lock.
    if (lock > 0) {
        lock--;
        return false;
    }
    
    // If the oldest delta is null, there can't be a peak yet; so return.
    if (deltas[0] == null) return false;
    
    // Otherwise, check for a peak signature where the middle delta (4)
    // is the highest among all other deltas to the left or right.
    if (
        deltas[0] <  deltas[4] &&
        deltas[1] <= deltas[4] &&
        deltas[2] <= deltas[4] &&
        deltas[3] <= deltas[4] &&
        deltas[5] <= deltas[4] &&
        deltas[6] <= deltas[4] &&
        deltas[7] <= deltas[4] &&
        deltas[8] <  deltas[4]
    ) return true;
    
    // If no peak is found, return false.
    return false;
}
