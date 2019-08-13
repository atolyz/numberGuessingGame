//guess game
// 1. użytkownik podaje zakres liczb np. 2-200;
// 2. losujemy liczbę z tego zakresu
// 3. użytkownik ma zgadnąć tę liczbę
// 4. aplikacja mówi "za mało" lub "za dużo" jeśli nie zgadnie
// 5. jak zgadnie, podajemy w ilu próbach się to odbyło

// IIFE

// zastosowanie IIFE + closure to wzorzec projektowy module (usunięcie możliwości wycieku zmiennych globalnych)

const gg_config = {
  min: "#min",
  max: "#max",
  confirmBtn: "#confirmBtn",
  scopeSection: "#getScope",
  gameSection: "#game",
  okBtn: "#guessConfirmation",
  guessNumber: "#guess",
  hint: "#hint",
  result: "#result",
  showResult: "#showResult",
  playAgainBtn: "#playAgainBtn",
  gameOverBtn: "#gameOverBtn",
  gameOverSection: "#gameOver",
  playGameBtn: "#startBtn",
  startGameSection: "#startGame",
  scopeHint: "#scopeHint",
  chosenNumbers: "#chosenNumbers"
};

(function({
  min,
  max,
  confirmBtn,
  scopeSection,
  gameSection,
  okBtn,
  guessNumber,
  hint,
  result,
  showResult,
  playAgainBtn,
  gameOverBtn,
  gameOverSection,
  playGameBtn,
  startGameSection,
  scopeHint,
  chosenNumbers
}) {
  //input
  const minInputRef = document.querySelector(min);
  const maxInputRef = document.querySelector(max);
  const guessNumberInputRef = document.querySelector(guessNumber);
  // button
  const confirmBtnRef = document.querySelector(confirmBtn);
  const okBtnRef = document.querySelector(okBtn);
  const playAgainBtnRef = document.querySelector(playAgainBtn);
  const playGameBtnRef = document.querySelector(playGameBtn);
  const gameOverBtnRef = document.querySelector(gameOverBtn);
  //section
  const startGameSectionRef = document.querySelector(startGameSection);
  const getScopeSectionRef = document.querySelector(scopeSection);
  const gameSectionRef = document.querySelector(gameSection);
  const gameOverSectionRef = document.querySelector(gameOverSection);
  const resultSectionRef = document.querySelector(result);

  // p
  const hintRef = document.querySelector(hint);
  const scopeHintRef = document.querySelector(scopeHint);
  const showResultRef = document.querySelector(showResult);
  const chosenNumbersRef = document.querySelector(chosenNumbers);

  let generatedNumber;
  let clicks = 0;
  let guesses = [];

  playGameBtnRef.addEventListener("click", start);
  confirmBtnRef.addEventListener("click", submitNumbers);
  okBtnRef.addEventListener("click", play);
  playAgainBtnRef.addEventListener("click", newGame);
  gameOverBtnRef.addEventListener("click", gameOver);

  function submitNumbers(event) {
    event.preventDefault();
    const userScope = getUserScope();
    const { minUserNumber, maxUserNumber } = userScope;

    generatedNumber = generateRandomNumber(minUserNumber, maxUserNumber);
    scopeHintRef.innerText = `wybrany zakres to: ${minUserNumber} - ${maxUserNumber}`;

    getScopeSectionRef.classList.add("hide");
    gameSectionRef.classList.remove("hide");
  }

  function play(event) {
    event.preventDefault();
    clicks++;

    const guess = getUserGuess();
    const result = checkUserGuess(guess, generatedNumber);
    showHint(result);

    guesses.push(guess);
    chosenNumbersRef.innerText = JSON.stringify(guesses);

    if (result === "trafiłeś") {
      endGame();
    }
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getUserScope() {
    const minUserNumber = parseInt(minInputRef.value);
    const maxUserNumber = parseInt(maxInputRef.value);

    minInputRef.value = "";
    maxInputRef.value = "";
    return {
      minUserNumber,
      maxUserNumber
    };
  }

  function getUserGuess() {
    const guess = parseInt(guessNumberInputRef.value);
    guessNumberInputRef.value = "";

    return guess;
  }

  function checkUserGuess(guess, drawn) {
    if (guess < drawn) {
      return "za mało";
    } else if (guess > drawn) {
      return "za dużo";
    } else {
      return "trafiłeś";
    }
  }

  function showHint(result) {
    hintRef.innerText = result;
  }

  function endGame() {
    resultSectionRef.classList.remove("hide");
    gameSectionRef.classList.add("hide");
    showResultRef.innerText = `Wygrałeś w ${clicks} turach`;
  }

  function newGame() {
    clicks = 0;

    guesses = [];
    chosenNumbersRef.innerText = guesses;
    hintRef.innerText = "";
    getScopeSectionRef.classList.remove("hide");
    gameSectionRef.classList.add("hide");
    resultSectionRef.classList.add("hide");
  }

  function gameOver() {
    gameOverSectionRef.classList.remove("hide");
    resultSectionRef.classList.add("hide");
  }

  function start() {
    hintRef.value = "";
    startGameSectionRef.classList.add("hide");
    getScopeSectionRef.classList.remove("hide");
  }
})(gg_config);
