// Common function to check if an element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simon Says Game
    if (elementExists('start-button')) {
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
            if (elementExists(animal)) {
                document.getElementById(animal).addEventListener('click', () => buttonClick(animal));
            }
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
}

 // Feedback Form
 if (elementExists('feedbackForm')) {
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var rating = document.getElementById('rating').value;
        var comments = document.getElementById('comments').value;

        var nameValid = /^[a-zA-Z\s]+$/.test(name);
        var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var commentsValid = comments.length >= 4;
        var ratingValid = rating !== "";

        if (elementExists('nameFeedback')) document.getElementById('nameFeedback').style.display = nameValid ? 'none' : 'block';
        if (elementExists('emailFeedback')) document.getElementById('emailFeedback').style.display = emailValid ? 'none' : 'block';
        if (elementExists('commentsFeedback')) document.getElementById('commentsFeedback').style.display = commentsValid ? 'none' : 'block';
        if (elementExists('ratingFeedback')) document.getElementById('ratingFeedback').style.display = ratingValid ? 'none' : 'block';

        if (elementExists('nameFeedback')) document.getElementById('nameFeedback').textContent = nameValid ? '' : 'Name should contain only letters and spaces.';
        if (elementExists('emailFeedback')) document.getElementById('emailFeedback').textContent = emailValid ? '' : 'Please enter a valid email address.';
        if (elementExists('commentsFeedback')) document.getElementById('commentsFeedback').textContent = commentsValid ? '' : 'Comments should be at least 4 characters long.';
        if (elementExists('ratingFeedback')) document.getElementById('ratingFeedback').textContent = ratingValid ? '' : 'Please select a rating.';

        var formValid = nameValid && emailValid && commentsValid && ratingValid;

        if (formValid) {
            if (elementExists('feedbackFeedback')) {
                document.getElementById('feedbackFeedback').textContent = 'Your feedback was accepted!';
                document.getElementById('feedbackFeedback').style.display = 'block';
            }
            if (elementExists('name')) document.getElementById('name').value = '';
            if (elementExists('email')) document.getElementById('email').value = '';
            if (elementExists('rating')) document.getElementById('rating').value = '';
            if (elementExists('comments')) document.getElementById('comments').value = '';
        } else {
            if (elementExists('feedbackFeedback')) {
                document.getElementById('feedbackFeedback').textContent = '';
                document.getElementById('feedbackFeedback').style.display = 'none';
            }
        }
    });
}
});