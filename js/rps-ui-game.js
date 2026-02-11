const SECOND = 1000;

/* Display Elements */
const pWalletEl = document.querySelector("#pWalletDisp");
const cWalletEl = document.querySelector("#cWalletDisp");
const minBetEl = document.querySelector("#minBetDisp");
const roundBetEl = document.querySelector("#roundBetDisp");

/* Selected Card Placements */
const pCardEl = document.querySelector("#pCardSelect");
const cCardEl = document.querySelector("#cCardSelect");

/* Stat Elements */
const pRock = document.querySelector("#pRockStat");
const cRock = document.querySelector("#cRockStat");
const pPaper = document.querySelector("#pPaperStat");
const cPaper = document.querySelector("#cPaperStat");
const pScissors = document.querySelector("#pScissorsStat");
const cScissors = document.querySelector("#cScissorsStat");
const pBigW = document.querySelector("#pBigW");
const cBigW = document.querySelector("#cBigW");

/* Player Cards */
const playerHand = document.querySelector("#playerHand");
const playerCards = playerHand.querySelectorAll("[data-card]");
playerCards.forEach((card) => card.addEventListener("click", setPlayerChoice));

/* Computer Cards */
const computerHand = document.querySelector("#computerHand");
const computerCards = computerHand.querySelectorAll(".game-card");

/* Start Game */
const startModal = document.querySelector("#startModal");
const startBuyIn = document.querySelector("#buyIn");
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startGame);

/* Change Bet */
const showBetBtn = document.querySelector("#showBetBtn");
showBetBtn.addEventListener("click", () => showChangeBet("Change Bet"));

const betModal = document.querySelector("#betModal");
const betTitle = document.querySelector("#betTitle");
const betInput = document.querySelector("#betInput");
betInput.addEventListener("change", betValidation);
const closeBetBtn = document.querySelector("#closeBetBtn");
closeBetBtn.addEventListener("click", closeChangeBet);

/* End Round */
const roundModal = document.querySelector("#roundModal");
const roundTitle = document.querySelector("#roundTitle");
const roundText = document.querySelector("#roundText");
const roundBtn = document.querySelector("#roundBtn");
roundBtn.addEventListener("click", resetRound);

/* Game Over */
const finalModal = document.querySelector("#finalModal");
const finalTitle = document.querySelector("#finalTitle");
const replayBtn = document.querySelector("#replayBtn");
replayBtn.addEventListener("click", () => window.location.reload());

const gameObj = {
  buyIn: 1000,
  minBet: 50,
  roundBet: 0,
  wCount: 0,
  lCount: 0,
  tCount: 0,
};

const computerObj = createPlayer();
const playerObj = createPlayer();

startModal.showModal();

function startGame() {
  const bI = +startBuyIn.value;

  gameObj.buyIn = bI;
  computerObj.wallet = bI;
  playerObj.wallet = bI;

  gameObj.minBet =
    bI === 10000 ? 200 : bI === 5000 ? 150 : bI === 2500 ? 100 : 50;
  gameObj.roundBet = gameObj.minBet;

  updateBetUI();
  startModal.close();
}

function showChangeBet(title) {
  betModal.showModal();
  const minWallet = getMinValue(playerObj.wallet, computerObj.wallet);
  betTitle.textContent = title;
  betInput.setAttribute("min", gameObj.minBet);
  betInput.setAttribute("max", minWallet);
  if (gameObj.roundBet > minWallet) {
    betInput.value = minWallet;
  } else {
    betInput.value =
      gameObj.roundBet > gameObj.minBet ? gameObj.roundBet : gameObj.minBet;
  }
}

function betValidation(event) {
  const input = event.currentTarget;
  const minWallet = getMinValue(playerObj.wallet, computerObj.wallet);
  const inRange = input.value < minWallet && input.value > gameObj.minBet;
  if (!inRange) {
    if (input.value > minWallet) {
      input.value = minWallet;
    } else if (input.value < gameObj.minBet) {
      input.value = gameObj.minBet;
    }
  } else if (input.value % 50 > 0) {
    input.value = input.value - (input.value % 50);
  }
}

function closeChangeBet() {
  gameObj.roundBet = +betInput.value;
  roundBetEl.textContent = gameObj.roundBet;
  betModal.close();
}

function setPlayerChoice(event) {
  if (
    playerObj.wallet < gameObj.roundBet ||
    computerObj.wallet < gameObj.roundBet
  ) {
    showChangeBet("Your bet was too big!");
  } else {
    playerCards.forEach((card) =>
      card.removeEventListener("click", setPlayerChoice),
    );
    const selectEl = event.currentTarget;
    playerObj.currentChoice = selectEl.getAttribute("data-card");
    selectEl.style.opacity = 0;

    setComputerChoice();
  }
}

function setComputerChoice() {
  const cardNum = Math.floor(Math.random() * 3);
  const handNum = Math.floor(Math.random() * 3);
  let choice = null;

  switch (cardNum) {
    case 0:
      choice = "Rock";
      break;
    case 1:
      choice = "Paper";
      break;
    case 2:
      choice = "Scissors";
      break;
    default:
      console.warn("Computer could'nt decide! O.o");
      break;
  }
  computerObj.currentChoice = choice;
  computerCards[handNum].style.opacity = 0;

  setTimeout(decideRound, SECOND * 2);
}

function decideRound() {
  const pChoice = playerObj.currentChoice;
  const cChoice = computerObj.currentChoice;
  const winText = `Your ${pChoice} beats ${cChoice} :)`;
  const lossText = `Your ${pChoice} was beaten by ${cChoice} :(`;
  const tieText = `You both chose ${pChoice} :|`;
  let youWin;

  addChoiceStats(playerObj);
  addChoiceStats(computerObj);
  updateStatsUI();

  if (pChoice != cChoice) {
    switch (pChoice) {
      case "Rock":
        youWin = cChoice === "Scissors" ? true : false;
        break;
      case "Paper":
        youWin = cChoice === "Rock" ? true : false;
        break;
      case "Scissors":
        youWin = cChoice === "Paper" ? true : false;
        break;
      default:
        console.warn("Winner could'nt be decided! O.o");
        break;
    }

    if (youWin) {
      gameObj.wCount++;
      playerObj.wallet += gameObj.roundBet;
      computerObj.wallet -= gameObj.roundBet;
      checkBigStat(playerObj);
      displayRoundResult("You Win!", winText, "Yay!");
    } else {
      gameObj.lCount++;
      playerObj.wallet -= gameObj.roundBet;
      computerObj.wallet += gameObj.roundBet;
      checkBigStat(computerObj);
      displayRoundResult("You Lose!", lossText, "Womp Womp..");
    }
  } else {
    gameObj.tCount++;
    displayRoundResult("It's a Tie!", tieText, "Ehh..");
  }
}

function displayRoundResult(title, text, btn) {
  if (computerObj.wallet <= 0) {
    gameOver("You Win! :)");
  } else if (playerObj.wallet <= 0) {
    gameOver("You Lose! :(");
  } else {
    updateBetUI();
    roundTitle.textContent = title;
    roundText.textContent = text;
    roundBtn.textContent = btn;
    roundModal.showModal();
  }
}

function resetRound() {
  playerCards.forEach((card) => (card.style.opacity = 1));
  computerCards.forEach((card) => (card.style.opacity = 1));
  computerObj.currentChoice = null;
  playerObj.currentChoice = null;
  playerCards.forEach((card) =>
    card.addEventListener("click", setPlayerChoice),
  );
  roundModal.close();
}

function gameOver(title) {
  updateBetUI();
  finalModal.showModal();
  finalTitle.textContent = title;
}

function checkBigStat(winner) {
  if (winner.bigW <= gameObj.roundBet) {
    winner.bigW = gameObj.roundBet;
  }

  updateStatsUI();
}

function addChoiceStats(obj) {
  switch (obj.currentChoice) {
    case "Rock":
      obj.rpsCount[0]++;
      break;
    case "Paper":
      obj.rpsCount[1]++;
      break;
    case "Scissors":
      obj.rpsCount[2]++;
      break;
  }
}

function updateBetUI() {
  minBetEl.textContent = gameObj.minBet;
  roundBetEl.textContent = gameObj.roundBet;
  pWalletEl.textContent = playerObj.wallet;
  cWalletEl.textContent = computerObj.wallet;
}

function updateStatsUI() {
  /* Player Stats */
  pRock.textContent = playerObj.rpsCount[0];
  pPaper.textContent = playerObj.rpsCount[1];
  pScissors.textContent = playerObj.rpsCount[2];
  pBigW.textContent = playerObj.bigW;

  /* Computer Stats */
  cRock.textContent = computerObj.rpsCount[0];
  cPaper.textContent = computerObj.rpsCount[1];
  cScissors.textContent = computerObj.rpsCount[2];
  cBigW.textContent = computerObj.bigW;
}

function getMinValue(a, b) {
  return a > b ? b : a;
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function createPlayer(name) {
  return {
    currentChoice: null,
    wallet: gameObj.buyIn,
    rpsCount: [0, 0, 0],
    bigW: 0,
  };
}
