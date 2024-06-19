// wordScramble.js

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



// wordMatching.js

const wordPairs = [
    { word: "kia orana", image: "images/hello.png" },
    { word: "moe", image: "images/sleep.png" },
    { word: "kai", image: "images/food.png" },
    { word: "moana", image: "images/ocean.png" },
    { word: "imene", image: "images/sing.png" }
];

let selectedWord = null;
const wordContainer = document.querySelector(".word-container");
const matchResult = document.querySelector(".match-result");

function displayWords() {
    wordContainer.innerHTML = "";

    wordPairs.forEach(pair => {
        const wordItem = document.createElement("div");
        wordItem.classList.add("word-item");
        wordItem.addEventListener("click", selectItem);

        const wordImage = document.createElement("img");
        wordImage.src = pair.image;
        wordImage.alt = pair.word;

        const wordText = document.createElement("span");
        wordText.textContent = pair.word;

        wordItem.appendChild(wordImage);
        wordItem.appendChild(wordText);
        wordContainer.appendChild(wordItem);
    });
}

function selectItem(event) {
    const selectedElement = event.currentTarget;
    const selectedText = selectedElement.querySelector("span").textContent;
    const selectedImage = selectedElement.querySelector("img").alt;

    if (selectedWord === null) {
        selectedElement.classList.add("selected");
        selectedWord = selectedText;
    } else {
        const matchingPair = wordPairs.find(pair => pair.word === selectedWord && pair.image === selectedImage);
        if (matchingPair) {
            matchResult.textContent = "Correct!";
            setTimeout(() => {
                matchResult.textContent = "";
                selectedWord = null;
                selectedElement.classList.remove("selected");
            }, 1000);
        } else {
            matchResult.textContent = "Incorrect. Try again.";
            setTimeout(() => {
                matchResult.textContent = "";
                selectedWord = null;
                selectedElement.classList.remove("selected");
            }, 1000);
        }
    }
}

document.addEventListener("DOMContentLoaded", displayWords);