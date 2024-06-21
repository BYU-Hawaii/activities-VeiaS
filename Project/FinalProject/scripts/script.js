// Common function to check if an element exists
function elementExists(id) {
    return document.getElementById(id) !== null;
}

// Word Scramble Game
if (elementExists('scrambledWord')) {
    const words = ["hello", "world", "computer", "language", "learn"];
    let currentWord = "";
    let scrambledWord = "";

    function scrambleWord(word) {
        let wordArray = word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        return wordArray.join("");
    }

    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        scrambledWord = scrambleWord(currentWord);
        document.getElementById("scrambledWord").textContent = scrambledWord;
    }

    function checkAnswer() {
        const userInput = document.getElementById("userInput").value.toLowerCase();
        if (userInput === currentWord) {
            document.getElementById("result").textContent = "Correct!";
            startGame();
        } else {
            document.getElementById("result").textContent = "Incorrect. Try again.";
        }
        document.getElementById("userInput").value = "";
    }

    startGame();

    // Add event listeners for word scramble game
    if (elementExists('userInput')) {
        document.getElementById('userInput').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
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