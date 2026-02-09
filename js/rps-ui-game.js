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
const pBigL = document.querySelector("#pBigL");
const cBigL = document.querySelector("#cBigL");

/* Player Cards */
const playerHand = document.querySelector("#playerHand");
const playerCards = playerHand.querySelectorAll("[data-card]");
playerCards.forEach((card) => card.addEventListener("click", setPlayerChoice));

/* Computer Cards */
const computerHand = document.querySelector("#computerHand");
const computerCards = computerHand.querySelectorAll("[data-card]");

/* Starting Dialog */
const startModal = document.querySelector("#startModal");
const startBuyIn = document.querySelector("#buyIn");
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startGame);

/* Change Bet */
const showBetBtn = document.querySelector("#showBetBtn");
showBetBtn.addEventListener("click", showChangeBet);

const betModal = document.querySelector("#betModal");
const betInput = document.querySelector("#betInput");
const closeBetBtn = document.querySelector("#closeBetBtn");
closeBetBtn.addEventListener("click", closeChangeBet);

const gameObj = {
  buyIn: 1000,
  minBet: 50,
  roundBet: 0,
  wCount: 0,
  lCount: 0,
  tCount: 0,
};

const computerObj = createPlayer("ü");
const playerObj = createPlayer("Player");

startModal.showModal();

function startGame() {
  const bI = +startBuyIn.value;

  gameObj.buyIn = bI;
  computerObj.wallet = bI;
  playerObj.wallet = bI;

  gameObj.minBet =
    bI === 10000 ? 200 : bI === 5000 ? 150 : bI === 2500 ? 100 : 50;
  gameObj.roundBet = gameObj.minBet;

  minBetEl.textContent = gameObj.minBet;
  updateWalletUI();
  startModal.close();
}

function showChangeBet() {
  betModal.showModal();
  betInput.setAttribute("min", gameObj.minBet);
  betInput.setAttribute(
    "max",
    playerObj.wallet > computerObj.wallet
      ? computerObj.wallet
      : playerObj.wallet,
  );
  betInput.value = gameObj.minBet;
}

function closeChangeBet() {
  gameObj.roundBet = +betInput.value;
  roundBetEl.textContent = gameObj.roundBet;
  betModal.close();
}

function setPlayerChoice(event) {
  playerCards.forEach((card) =>
    card.removeEventListener("click", setPlayerChoice),
  );
  const selectEl = event.currentTarget;
  playerObj.currentChoice = selectEl.getAttribute("data-card");
  selectEl.style.visibility = "hidden";

  setTimeout(setComputerChoice, SECOND);
}

function setComputerChoice() {
  const cardNum = Math.floor(Math.random() * 3);
  const handNum = Math.floor(Math.random() * 3); /* Use to remove random  */
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
  computerHand.children[handNum].style.visibility = "hidden";

  setTimeout(decideRound, SECOND);
}

function decideRound() {}

function resetRound() {
  playerCards.forEach((card) => (card.style.visibility = "visible"));
  computerCards.forEach((card) => (card.style.visibility = "visible"));
  computerObj.currentChoice = null;
  playerObj.currentChoice = null;
  playerCards.forEach((card) =>
    card.addEventListener("click", setPlayerChoice),
  );
}

function updateWalletUI() {
  pWalletEl.textContent = playerObj.wallet;
  cWalletEl.textContent = computerObj.wallet;
}

function updateStatsUI() {
  /* Player Stats */
  pRock.textContent = playerObj.rpsCount[0];
  pPaper.textContent = playerObj.rpsCount[1];
  pScissors.textContent = playerObj.rpsCount[2];
  pBigW.textContent = playerObj.bigW;
  pBigL.textContent = playerObj.bigL;

  /* Computer Stats */
  cRock.textContent = computerObj.rpsCount[0];
  cPaper.textContent = computerObj.rpsCount[1];
  cScissors.textContent = computerObj.rpsCount[2];
  cBigW.textContent = computerObj.bigW;
  cBigL.textContent = computerObj.bigL;
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function createPlayer(name) {
  return {
    name,
    currentChoice: null,
    wallet: gameObj.buyIn,
    rpsCount: [0, 0, 0],
    bigW: 0,
    bigL: 0,
  };
}
