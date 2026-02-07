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

/* Starting Dialog */
const startModal = document.querySelector("#startModal");
const startBuyIn = document.querySelector("#buyIn");
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startGame);

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

/* CONSIDER CHANGING SOME OF THE START GAME FUNCTIONALITY TO WORK BASED ON SELECT ELEMENT ON CHANGE LISTENER */
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

function changeBet() {
  /* Display change bet modal */
  /*  */
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

function createPlayer(name) {
  return {
    name,
    wallet: gameObj.buyIn,
    rpsCount: [0, 0, 0],
    bigW: 0,
    bigL: 0,
  };
}
