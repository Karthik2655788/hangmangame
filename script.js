// List of phrases (multiple words)
const phrases = [
  "apple pie",
  "blue whale",
  "high school",
  "ice cream",
  "mountain peak",
  "sweet home",
  "golden gate",
  "black board",
  "space station",
  "happy birthday",
  "chocolate cake",
  "rainy day",
  "morning coffee",
  "summer vacation",
  "silver spoon",
  "reading book",
  "green garden",
  "city park",
  "grand canyon",
  "new york",
  "golden retriever",
  "flying kite",
  "deep ocean",
  "snowy mountain",
  "morning jog",
  "birthday party",
  "family dinner",
  "coffee shop",
  "night sky",
  "ocean breeze",
  "sunset beach",
  "fast car",
  "basketball court",
  "running shoes",
  "happy hour",
  "fresh fruit",
  "digital clock",
  "morning walk",
  "big city",
  "hot chocolate",
  "summer camp",
  "rainy season",
  "green tea",
  "chicken soup",
  "flower garden",
  "movie theater",
  "music festival",
  "travel bag",
  "newspaper headline",
  "space exploration",
  "friendly neighbor",
  "colorful painting"
];
let phrase = phrases[Math.floor(Math.random() * phrases.length)].toLowerCase();
const maxCols = 15;

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const guessedLetters = new Set();

let boxes = [];

// Clear previous grid if any
grid.innerHTML = "";
boxes = [];

// Create grid boxes for phrase, spaces separate words
// We'll fill the phrase in one row, left to right, spaces as blank
for (let i = 0; i < phrase.length; i++) {
  let ch = phrase[i];
  let box = document.createElement("div");

  if (ch === " ") {
    box.className = "box space";
    box.innerText = "";
  } else {
    box.className = "box";
    box.innerText = "_";
    box.dataset.letter = ch;
  }
  grid.appendChild(box);
  boxes.push(box);
}

// Guess function
function guess() {
  let input = document.getElementById("letter");
  let letter = input.value.toLowerCase();
  input.value = "";

  if (!letter.match(/^[a-z]$/)) {
    message.innerText = "Please enter a valid letter A-Z.";
    return;
  }

  if (guessedLetters.has(letter)) {
    message.innerText = `You already guessed "${letter.toUpperCase()}".`;
    return;
  }

  guessedLetters.add(letter);

  let correctGuess = false;

  boxes.forEach(box => {
    if (box.dataset.letter === letter) {
      box.innerText = letter.toUpperCase();
      correctGuess = true;
    }
  });

  if (correctGuess) {
    message.innerText = `Good job! Letter "${letter.toUpperCase()}" is in the phrase.`;
  } else {
    message.innerText = `Sorry! Letter "${letter.toUpperCase()}" is NOT in the phrase.`;
  }

  checkWin();
}

function checkWin() {
  let won = boxes.every(box => {
    return box.classList.contains("space") || (box.innerText !== "_");
  });

  if (won) {
    message.innerText = `🎉 Congratulations! You guessed the phrase: "${phrase.toUpperCase()}"`;
    document.getElementById("letter").disabled = true;
  }
}