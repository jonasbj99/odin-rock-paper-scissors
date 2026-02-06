/* Display Elements */
const pWalletEl = document.querySelector("#pWalletDisp");
const cWalletEl = document.querySelector("#cWalletDisp");
const minBetEl = document.querySelector("#minBetDisp");
const roundBetEl = document.querySelector("#roundBetDisp");

const pCardEl = document.querySelector("#pCardSelect");
const cCardEl = document.querySelector("#cCardSelect");

/* Stat Row Elements */
const rRow = document.querySelector("#rockStat");
const pRow = document.querySelector("#paperStat");
const sRow = document.querySelector("#scissorsStat");
const wRow = document.querySelector("#bigW");
const lRow = document.querySelector("#bigL");

/* Starting Dialog */
const startModal = document.querySelector("#startWindow");
const startBuyIn = document.querySelector("#buyIn");
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startGame);

const gameObj = {
  buyIn: 1000,
  minBet: 50,
  roundBet: 0,
  winCount: 0,
  lossCount: 0,
  tieCount: 0,
};

const computerObj = createPlayer("ü");
const playerObj = createPlayer("Player");

startModal.showModal();

function createPlayer(name) {
  return {
    name,
    wallet: gameObj.buyIn,
    rpsCount: [0, 0, 0],
    bigW: 0,
    bigL: 0,
  };
}

function startGame() {
  const bI = +startBuyIn.value;
  startModal.close();

  gameObj.buyIn = bI;
  gameObj.minBet =
    bI === 10000 ? 200 : bI === 5000 ? 150 : bI === 2500 ? 100 : 50;
  computerObj.wallet = bI;
  playerObj.wallet = bI;
  updateUI();
}

function updateUI() {
  pWalletEl.textContent = playerObj.wallet;
  cWalletEl.textContent = computerObj.wallet;
  minBetEl.textContent = gameObj.minBet;
  roundBetEl.textContent = gameObj.roundBet;

  /* Update Rock Stats */
  rRow.querySelectorAll("td")[0].textContent = playerObj.rpsCount[0];
  rRow.querySelectorAll("td")[1].textContent = computerObj.rpsCount[0];

  /* Update Paper Stats */
  pRow.querySelectorAll("td")[0].textContent = playerObj.rpsCount[1];
  pRow.querySelectorAll("td")[1].textContent = computerObj.rpsCount[1];

  /* Update Scissors Stats */
  sRow.querySelectorAll("td")[0].textContent = playerObj.rpsCount[2];
  sRow.querySelectorAll("td")[1].textContent = computerObj.rpsCount[2];

  /* Update Biggest Win Stats */
  wRow.querySelectorAll("td")[0].textContent = playerObj.bigW;
  wRow.querySelectorAll("td")[1].textContent = computerObj.bigW;

  /* Update Biggest Loss Stats */
  lRow.querySelectorAll("td")[0].textContent = playerObj.bigL;
  lRow.querySelectorAll("td")[1].textContent = computerObj.bigL;
}
