const startModal = document.querySelector("#startWindow");
startModal.showModal();

const gameObj = {
  minBet: 50,
  buyIn: 1000,
  winCount: 0,
  lossCount: 0,
  tieCount: 0,
};

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
