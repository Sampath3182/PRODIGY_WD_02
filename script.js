let timer; // To store the interval timer
let startTime; // To store the start time of the stopwatch
let isRunning = false; // To track if the stopwatch is running
let lapCount = 1; // To track lap count

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');
const resetLapsBtn = document.querySelector('.reset-laps'); // Add a reference to the reset laps button

function formatTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function start() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.textContent = 'Resume';
  } else {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Resume';
  }
}

function pause() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  display.textContent = '00:00:00';
  lapCount = 1;
  lapsList.innerHTML = '';
  startBtn.textContent = 'Start';
}

function lap() {
  const elapsedTime = Date.now() - startTime;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapItem.style.backgroundColor = getRandomColor(); // Set random background color
  lapsList.prepend(lapItem);
  lapCount++;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function resetLaps() { // Function to reset lap times
  lapsList.innerHTML = '';
  lapCount = 1;
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
resetLapsBtn.addEventListener('click', resetLaps); // Add event listener for the reset laps button
