/**
 * Created by mbarakmbigo on 14/11/2017.
 *
 * Start and stop the timer by pressing the "Start/Stop" button.
 * Start and stop the timer by pressing the 's' key.
 * Record the current timer count into the Past Times section by pressing the "Record Time" button
 * Record the current timer count into the Past Times section by pressing the 't' key.
 * Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the "Reset" button.
 * Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the 'r' key.
 */

// Global variables
var timerStarted = false;
var time = 0;
var timeSplits = [];
var interval;
var elapsedTime = document.getElementById('elapsedTime');

// Run code
setUp();

// Function definitions
/**
 * Initialize application
 */
function setUp() {
    elapsedTime.innerHTML = 0;
}

/**
 * start/stop timer
 */
function startStopTimer() {
    if (timerStarted) {
        clearInterval(interval);
        timerStarted = false;
    } else {
        timerStarted = true;
        interval = setInterval(function () {
            time++;
            elapsedTime.innerHTML = (time/1000).toFixed(2);
        }, 1)
    }
}

/**
 * reset stopwatch
 */
function reset() {
    timerStarted = false;
    elapsedTime.innerHTML = time = 0;
    clearInterval(interval);
    var recordTimeSplits = document.getElementById('pastTimes');
    removeallChildNodes(recordTimeSplits);
}

/**
 * record timeSplits
 */
function recordTime() {
    timeSplits.push(time/1000);
    displayTimeSplits();
}

// helper functions
function displayTimeSplits() {
    var recordTimeSplits = document.getElementById('pastTimes');
    var lastChild = recordTimeSplits.lastChild;

    if(timeSplits.length) {
        if(lastChild) {
            if(timeSplits[timeSplits.length - 1].toFixed(2) !== lastChild.textContent) {
                appendChildElement(recordTimeSplits);
            }
        } else {
            appendChildElement(recordTimeSplits);
        }
    }
}

function appendChildElement(parent) {
    var newElement = document.createElement('p');
    var content = document.createTextNode(timeSplits[timeSplits.length-1].toFixed(2));
    newElement.appendChild(content);
    parent.appendChild( newElement);
}

function removeallChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.getElementById('start-stop').addEventListener('click', startStopTimer);

document.getElementById('reset').addEventListener('click', reset);

document.getElementById('recordTime').addEventListener('click', recordTime);

document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    if(event.key === 's') {
        startStopTimer();
    } else if (event.key === 'r') {
        reset();
    } else if (event.key === 't') {
        recordTime();
    }
});
