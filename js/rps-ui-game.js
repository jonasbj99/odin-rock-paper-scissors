/* Display Elements */
const pWalletEl = document.querySelector("#pWalletDisp");
const cWalletEl = document.querySelector("#cWalletDisp");
const minBetEl = document.querySelector("#minBetDisp");
const roundBetEl = document.querySelector("#roundBetDisp;");
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

const gameObj = {
  buyIn: 1000,
  minBet: 50,
  winCount: 0,
  lossCount: 0,
  tieCount: 0,
};

startModal.showModal();
startBtn.addEventListener("click", startGame);

const computerObj = createPlayer("ü");
const playerObj = createPlayer("Player");

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
}

function updateUI() {
  /* Update display and stat elements */
}
