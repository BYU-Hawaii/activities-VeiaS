// wordScramble.js

const words = ["kia orana", "moe", "kai", "moana", "imene"];
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

window.onload = startGame;