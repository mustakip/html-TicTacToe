const isSubset = function(superSet, subsetCandidate) {
  return subsetCandidate.every(element => superSet.includes(element));
};

let counter = 0;
const symbols = ["X", "O"];

const moves = {
  O: [],
  X: []
};
const cells = [];

const playerNames = {};

const makeImageTag = function(imgClass, imagePath) {
  return `<img class = '${imgClass}' src = '${imagePath}'/>`;
};

const getImageTag = function(symbol) {
  const symbolImages = {
    X: "images/cross.png",
    O: "images/o.png"
  };
  return makeImageTag("symbol", symbolImages[symbol]);
};

const displayInfo = function(msg) {
  let infoBlock = document.getElementById("infoDiv");
  infoBlock.innerText = msg;
};

const displayResult = function(result) {
  let resultImages = {
    win: makeImageTag("winOrDraw", "images/win.jpg"),
    draw: makeImageTag("winOrDraw", "images/draw.jpg")
  };
  let mainBlock = document.getElementById("mainDiv");
  mainBlock.innerHTML = resultImages[result];
  mainBlock.className = "result";
};

const displaySymbol = function(id) {
  if (!cells.includes(id)) {
    let block = document.getElementById(id);
    let symbol = symbols[counter++ % 2];
    block.innerHTML = getImageTag(symbol);
    cells.push(id);
    moves[symbol].push(id);

    if (hasWon(moves[symbol])) {
      displayResult("win");
      displayInfo(playerNames[symbol] + " has Won the game");
      let block = document.getElementById("divsTable");
      block.onload = 'null'
      return;
    }
    if (counter === 9) {
      displayResult("draw");
      document.getElementById("infoDiv").innerText = "Match Draw";
    }
  }
};

const hasWon = function(playerMoves) {
  const winningArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  return winningArray.some(isSubset.bind(null, playerMoves));
};

const getPlayerNames = function() {
  let player1 = prompt("Enter Player - 1 Name :  ");
  let player2 = prompt("Enter Player - 2 Name :  ");
  let info = player1 + "'s symbol is X\n";
  info += player2 + "'s symbol is O";
  displayInfo(info);
  playerNames["X"] = player1;
  playerNames["O"] = player2;
};
