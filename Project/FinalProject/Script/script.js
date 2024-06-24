// Common function to check if an element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

//Simon Says Game
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

// Feedback Form
if (elementExists('feedbackForm')) {
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var rating = document.getElementById('rating').value;
        var comments = document.getElementById('comments').value;

        var nameValid = /^[a-zA-Z\s]+$/.test(name); // name should contain only letters and spaces
        var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email pattern check
        var commentsValid = comments.length >= 4; // Comments should be at least 4 characters long
        var ratingValid = rating !== "";

        document.getElementById('nameFeedback').style.display = nameValid ? 'none' : 'block';
        document.getElementById('emailFeedback').style.display = emailValid ? 'none' : 'block';
        document.getElementById('commentsFeedback').style.display = commentsValid ? 'none' : 'block';
        document.getElementById('ratingFeedback').style.display = ratingValid ? 'none' : 'block';

        document.getElementById('nameFeedback').textContent = nameValid ? '' : 'Name should contain only letters and spaces.';
        document.getElementById('emailFeedback').textContent = emailValid ? '' : 'Please enter a valid email address.';
        document.getElementById('commentsFeedback').textContent = commentsValid ? '' : 'Comments should be at least 4 characters long.';
        document.getElementById('ratingFeedback').textContent = ratingValid ? '' : 'Please select a rating.';

        var formValid = nameValid && emailValid && commentsValid && ratingValid;

        if (formValid) {
            document.getElementById('feedbackFeedback').textContent = 'Your feedback was accepted!';
            document.getElementById('feedbackFeedback').style.display = 'block';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('rating').value = '';
            document.getElementById('comments').value = ''
        } else {
            document.getElementById('feedbackFeedback').textContent = '';
            document.getElementById('feedbackFeedback').style.display = 'none';
        }
    });
}