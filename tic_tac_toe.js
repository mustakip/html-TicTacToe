const isSubset = function(superSet, subsetCandidate) {
  return subsetCandidate.every(element => superSet.includes(element));
};

const isValidMove = function(id) {
  return !cells.includes(id);
};

const cycler = function(players) {
  let counter = 0;
  return function() {
    let index = counter++ % players.length;
    return players[index];
  };
};

const getPlayer = cycler(["player1", "player2"]);

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
    turnOffListner();
    displayInfo(playerName + " Won the game");
    return true;
  }
  return false;
};

const checkForDraw = function(hasWon) {
  if (cells.length == 9 && !hasWon) {
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
  let player = getPlayer();
  let {name, symbol, moves} = players[player];
  displaySymbol(symbol, id);

  cells.push(id);
  moves.push(id);

  let hasWon = checkForWin(moves, name);
  checkForDraw(hasWon);
  players[player]["moves"] = moves;
};

const makeTableVisible = function() {
  let table = document.getElementById("table");
  table.style.visibility = "visible";
  // table.setAttribute("style", "visibility:visible");
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

const getPlayerName = function(player) {
  let playerBlock = document.getElementById(player);
  return playerBlock.value;
};

const getPlayerNames = function() {
  let player1 = getPlayerName("player1");
  let player2 = getPlayerName("player2");
  let symbolInfo = player1 + "'s symbol is X\n";
  symbolInfo += player2 + "'s symbol is O";
  displayInfo(symbolInfo);
  players.player1.name = player1;
  players.player2.name = player2;
};
