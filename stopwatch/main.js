class Stopwatch {
    constructor() {
        this.start();
        this.stop();
        this.continue();
        this.clear();
        this.restart();
        this.getCurrentTime();
        this.timeStart = null;
        this.timeEnd = null;

    }

    start() {
        this.timeStart = new Date();
    }

    stop() {
        this.timeEnd = new Date();
    }

    continue() {
        this.timeEnd = null;
    }

    clear() {
        this.timeStart = null;
        this.timeEnd = null;

    }

    restart() {
        this.timeStart = null;
        this.timeEnd = null;
    }

    getCurrentTime() {
        if (this.timeStart) {
            return this.timeEnd === null ? Date.now() - this.timeStart : this.timeEnd - this.timeStart;
        }
        return 0;
    }
}

const docTimeElement = document.querySelector(".time");
const clearAllButton = document.querySelector('.clear_all_button');
const restartButton = document.querySelector('.restart_button');
const recordButton = document.querySelector('.record_button');
const startButton = document.querySelector('.start_button');
const docResultsElement = document.querySelector('.results');

const stopwatch = new Stopwatch();

setInterval(updateDisplay, 1);


recordButton.addEventListener("click",()=>{
    if (stopwatch.timeStart !== null) {
        recordResult();
    }

});
startButton.addEventListener("click", () => {

    if (startButton.innerHTML === "start" && stopwatch.timeStart === null) {
        stopwatch.start();
        startButton.innerHTML = "stop";
        return;
    }
    if (startButton.innerHTML === "start") {

        stopwatch.continue();
        startButton.innerHTML = "stop";
        return;
    }
    stopwatch.stop();
    startButton.innerHTML = "start";

});
restartButton.addEventListener("click", () => {

    stopwatch.restart();
    startButton.innerHTML = "start";

});
clearAllButton.addEventListener("click", () => {

    stopwatch.clear();
    docResultsElement.innerHTML="";
    startButton.innerHTML = "start";

});


function updateDisplay() {
    docTimeElement.innerHTML = convertMsToTime(stopwatch.getCurrentTime());
}

function convertMsToTime(duration) {
    if (duration===0)return  "00:00:00:000" ;
    let milliseconds = (duration % 1000),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;


    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

let countOfRecords = 0;

function recordResult() {
    let record = document.createElement('div');
    record.className = "record";
    record.innerHTML = "№" + (++countOfRecords) + ". " + docTimeElement.innerHTML;
    docResultsElement.append(record);
}
