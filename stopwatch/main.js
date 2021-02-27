class Stopwatch{
    constructor(timeElement,resultsElement) {
        this.timeElement=timeElement;
        this.resultsElement=resultsElement;
        this.start();
        this.stop();
        this.clear();
        this.restart();
        this
    }
}

const docTimeElement = document.querySelector(".time");
const clearAllButton = document.querySelector('.clear_all_button');
const restartButton = document.querySelector('.restart_button');
const startButton = document.querySelector('.start_button');
const docResultsElement= document.querySelector('.results');

const stopwatch=new Stopwatch(docTimeElement,docResultsElement);

