const isSubset = function(superSet, subsetCandidate) {
  return subsetCandidate.every(element => superSet.includes(element));
};

const isValidMove = function(id) {
  return !cells.includes(id);
};

const cycler = function(range) {
  let counter = 0;
  return function(list) {
    index = counter++ % range;
    return list[index];
  };
};

const getPlayer = cycler(2);

const cells = [];

const players = {
  player1: {symbol: "X", moves: []},
  player2: {symbol: "O", moves: []}
};

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

const displaySymbol = function(symbol, id) {
  let block = document.getElementById(id);
  block.innerHTML = getImageTag(symbol);
};

const checkForWin = function(moves, playerName) {
  if (hasWon(moves)) {
    // displayResult("win");
    turnOffListner();
    displayInfo(playerName + " Won the game");
    return true;
  }
  return false;
};

const checkForDraw = function(hasWon) {
  if (cells.length == 9 && !hasWon) {
    // displayResult("draw");
    displayInfo("Match Draw");
  }
};

const turnOffListner = function() {
  let cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  cells.map(cellId => {
    let cell = document.getElementById(cellId);
    cell.setAttribute("onclick", "null");
  });
};

const executeMove = function(id) {
  let player = getPlayer(["player1", "player2"]);
  let {name, symbol, moves} = players[player];
  displaySymbol(symbol, id);

  cells.push(id);
  moves.push(id);

  let hasWon = checkForWin(moves, name);
  checkForDraw(hasWon);
  players[player]["moves"] = moves;
};

const makeMove = function(id) {
  if (isValidMove(id)) {
    executeMove(id);
    return;
  }
  displayInfo("Invalid Move. Please try again.");
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
  let symbolInfo = player1 + "'s symbol is X\n";
  symbolInfo += player2 + "'s symbol is O";
  displayInfo(symbolInfo);
  players.player1.name = player1;
  players.player2.name = player2;
  console.log(players);
};
