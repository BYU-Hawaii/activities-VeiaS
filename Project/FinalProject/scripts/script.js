// Common function to check if an element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

// Word Scramble Game
const words = {
    easy: ["kia orana", "vai", "kai", "mama", "papa", "pepe", "moe", "ine", "ae", "kare", "ka kite", "ta'i", "rua", "toru", "'a", "rima", "ono", "itu", "varu", "reka", "motu", "nu", "niu"],
    medium: ["ariki", "aroa", "'arere ra", "ingoa", "pe'ea", "koe", "moni", "muri", "meitaki", "moana", "rakau", "reva", "noni", "puka", "raro"],
    hard: ["ta'i-nga'uru", "meri kiritimiti", "popongi manea", "kia manuia", "pi'a pa'i", "raparapa"]
};

let currentWord = "";
let scrambledWord = "";
let currentLevel = "easy";
let score = 0;
let timeLeft = 60;
let timer;

function elementExists(id) {
    return document.getElementById(id) !== null;
}

function scrambleWord(word) {
    let wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
}

function startGame() {
    const wordList = words[currentLevel];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex];
    scrambledWord = scrambleWord(currentWord);
    if (elementExists("scrambledWord")) {
        document.getElementById("scrambledWord").textContent = scrambledWord;
    }
    resetTimer();
     // Enable buttons
     document.getElementById("userInput").disabled = false;
     document.getElementById("stopButton").disabled = false;
     document.getElementById("hintButton").disabled = false;
     document.getElementById("easyButton").disabled = false;
     document.getElementById("mediumButton").disabled = false;
     document.getElementById("hardButton").disabled = false;
 }


function stopGame() {
    clearInterval(timer);
    document.getElementById("result").textContent = "Game stopped. Final score: " + score;
    document.getElementById("scrambledWord").textContent = "";
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").disabled = true;
    document.getElementById("stopButton").disabled = true;
    // Disable other game buttons
    document.getElementById("hintButton").disabled = true;
    document.getElementById("easyButton").disabled = true;
    document.getElementById("mediumButton").disabled = true;
    document.getElementById("hardButton").disabled = true;
}

function checkAnswer() {
    if (elementExists("userInput") && elementExists("result") && elementExists("score")) {
        const userInput = document.getElementById("userInput").value.toLowerCase();
        if (userInput === currentWord) {
            score += calculateScore();
            document.getElementById("result").textContent = "Correct! +" + calculateScore() + " points";
            document.getElementById("score").textContent = "Score: " + score;
            startGame();
        } else {
            document.getElementById("result").textContent = "Incorrect. Try again.";
        }
        document.getElementById("userInput").value = "";
    }
}

function calculateScore() {
    let baseScore = currentWord.length * 10;
    let timeBonus = timeLeft * 2;
    let difficultyMultiplier = currentLevel === "easy" ? 1 : currentLevel === "medium" ? 1.5 : 2;
    return Math.round((baseScore + timeBonus) * difficultyMultiplier);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (elementExists("result")) {
                document.getElementById("result").textContent = "Time's up! The word was: " + currentWord;
            }
            startGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (elementExists("timer")) {
        document.getElementById("timer").textContent = "Time: " + timeLeft + "s";
    }
}

function provideHint() {
    if (elementExists("hint") && elementExists("score")) {
        let hint = "First letter: " + currentWord[0];
        document.getElementById("hint").textContent = hint;
        score -= 5;
        document.getElementById("score").textContent = "Score: " + score;
    }
}

function changeLevel(level) {
    currentLevel = level;
    startGame();
}

// Initialize the game
if (elementExists('scrambledWord')) {
    startGame();

    // Add event listeners
    if (elementExists('userInput')) {
        document.getElementById('userInput').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
    }

    if (elementExists('hintButton')) {
        document.getElementById('hintButton').addEventListener('click', provideHint);
    }

    if (elementExists('easyButton')) {
        document.getElementById('easyButton').addEventListener('click', () => changeLevel('easy'));
    }

    if (elementExists('mediumButton')) {
        document.getElementById('mediumButton').addEventListener('click', () => changeLevel('medium'));
    }

    if (elementExists('hardButton')) {
        document.getElementById('hardButton').addEventListener('click', () => changeLevel('hard'));
    }
    if (elementExists('stopButton')) {
        document.getElementById('stopButton').addEventListener('click', stopGame);
    }
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