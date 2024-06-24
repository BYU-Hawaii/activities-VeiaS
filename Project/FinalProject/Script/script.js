const buttons = ['lion', 'elephant', 'monkey', 'penguin', 'chicken', 'octopus'];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let started = false;
let speed = 600;

const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const backgroundMusic = document.getElementById('background-music');

startButton.addEventListener('click', startGame);

buttons.forEach(animal => {
    document.getElementById(animal).addEventListener('click', () => buttonClick(animal));
});

function startGame() {
    started = true;
    gameSequence = [];
    playerSequence = [];
    level = 0;
    speed = 600;
    startButton.style.display = 'none';
    messageDisplay.textContent = 'Watch the sequence!';
    backgroundMusic.play();
    nextSequence();
}

function nextSequence() {
    playerSequence = [];
    gameSequence = [];
    level++;
    speed = Math.max(200, 600 - (level * 20));
    scoreDisplay.textContent = `Score: ${level - 1}`;
    messageDisplay.textContent = 'Watch the sequence!';

    for (let i = 0; i < level; i++) {
        const randomAnimal = buttons[Math.floor(Math.random() * 6)];
        gameSequence.push(randomAnimal);
    }

    setTimeout(() => {
        playSequence(gameSequence);
    }, 1000);
}

function playSequence(sequence) {
    let i = 0;
    const interval = setInterval(() => {
        lightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                messageDisplay.textContent = 'Your turn!';
            }, 1000);
        }
    }, speed);
}

function lightButton(animal) {
    const button = document.getElementById(animal);
    button.classList.add('lit');
    playSound(animal);
    setTimeout(() => {
        button.classList.remove('lit');
    }, speed / 2);
}

function buttonClick(animal) {
    if (!started) return;

    lightButton(animal);
    playerSequence.push(animal);
    checkAnswer(playerSequence.length - 1);
}

function checkAnswer(currentLevel) {
    if (gameSequence[currentLevel] === playerSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    messageDisplay.textContent = 'Game Over! Click Start to play again.';
    startButton.style.display = 'inline-block';
    started = false;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function playSound(animal) {
    const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttons.indexOf(animal) + 1}.mp3`);
    audio.play();
}