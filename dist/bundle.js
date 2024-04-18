/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic/ai.js":
/*!*************************!*\
  !*** ./src/logic/ai.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fireDown: () => (/* binding */ fireDown),
/* harmony export */   fireLeft: () => (/* binding */ fireLeft),
/* harmony export */   fireMainDirections: () => (/* binding */ fireMainDirections),
/* harmony export */   fireRight: () => (/* binding */ fireRight),
/* harmony export */   fireTop: () => (/* binding */ fireTop),
/* harmony export */   shipIsHoriz: () => (/* binding */ shipIsHoriz),
/* harmony export */   shipIsVert: () => (/* binding */ shipIsVert),
/* harmony export */   shipWasSunk: () => (/* binding */ shipWasSunk)
/* harmony export */ });


//The algorithm is quite straightforward, when pc shoots, we check if this shot was a hit (changing the cell from empty to 💢)
// If yes, we check if the ship was sunk - by checking this ship in userShips object (We have access to all ships and their
// isSunk() property, we can find the ship we hit by coordinates and then check this property. This is cheating, but I haven't
// found a better solution). If the computer is hit and isSunk() = false, then the ship size is greater than 1 and we run the
// TargetFire function which will work until it floods the ship. First of all it shoots in 4 directions, if it misses then the
// right to move goes to the player, but we save the last coordinate of the hit and on the next move the computer shoots in another
// direction, when the computer hits we check if it is sunk or not, if yes then we run the usual pcFire function which shoots at random
// coordinates, if pc hit but the ship is not sunk then the ship size is greater than 2 and we can find out the direction of the ship
// horiz or vert. Now we just compare the coordinates of the last hit and if the last hit is bigger than the starting one then we shoot
// only to the right horizontally, otherwise to the left and so we repeat it.
let mainSquares = [[0, -1], [0, 1], [1, 0], [-1, 0]];
let horizSquares = [[0, -1], [0, 1]];
let vertSquares = [[-1, 0], [1, 0]];
function checkBoundaries(_ref) {
  let [x, y] = _ref;
  return x >= 0 && x < 10 && y >= 0 && y < 10;
}
function shipWasSunk(ships, y, x) {
  for (let ship in ships) {
    for (let coords of ships[ship].coords) {
      if (coords[0] === y && coords[1] === x) {
        return ships[ship].isSunk();
      }
    }
  }
}
function fireMainDirections(board, y, x) {
  board = board.map(row => row.map(cell => {
    if (cell === '#') cell = ' ';
    return cell;
  }));
  const output = [];
  for (let square of mainSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === ' ') {
      output.push(validSquare);
    }
  }
  return output;
}
function shipIsHoriz(board, y, x) {
  for (let square of horizSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === '💢') {
      return true;
    }
  }
  return false;
}
function shipIsVert(board, y, x) {
  for (let square of vertSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === '💢') {
      return true;
    }
  }
  return false;
}
let leftSquares = [[0, -1], [0, -2]];
let rightSquares = [[0, 1], [0, 2]];
let downSquares = [[-1, 0], [-2, 0]];
let topSquares = [[1, 0], [2, 0]];
function fireLeft(board, y, x) {
  board = board.map(row => row.map(cell => {
    if (cell === '#') cell = ' ';
    return cell;
  }));
  let output = [];
  for (let square of leftSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === ' ') {
      output.push(validSquare);
    }
  }
  return output;
}
function fireRight(board, y, x) {
  board = board.map(row => row.map(cell => {
    if (cell === '#') cell = ' ';
    return cell;
  }));
  let output = [];
  for (let square of rightSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === ' ') {
      output.push(validSquare);
    }
  }
  return output;
}
function fireDown(board, y, x) {
  board = board.map(row => row.map(cell => {
    if (cell === '#') cell = ' ';
    return cell;
  }));
  let output = [];
  for (let square of downSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === ' ') {
      output.push(validSquare);
    }
  }
  return output;
}
function fireTop(board, y, x) {
  board = board.map(row => row.map(cell => {
    if (cell === '#') cell = ' ';
    return cell;
  }));
  let output = [];
  for (let square of topSquares) {
    let validSquare = [y + square[0], x + square[1]];
    if (!checkBoundaries(validSquare)) continue;
    if (board[validSquare[0]][validSquare[1]] === ' ') {
      output.push(validSquare);
    }
  }
  return output;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  shipWasSunk,
  fireMainDirections,
  shipIsVert,
  shipIsHoriz,
  fireLeft,
  fireRight,
  fireTop,
  fireDown
});

/***/ }),

/***/ "./src/logic/gameboard.js":
/*!********************************!*\
  !*** ./src/logic/gameboard.js ***!
  \********************************/
/***/ ((module) => {



let surroundingSquares = [[1, -1], [0, -1], [-1, -1], [1, 0], [-1, 0], [1, 1], [0, 1], [-1, 1]];
// just copy array above with .slice and push one more square [0,0] for checkIfNotEmpty function
let possibleSquares = surroundingSquares.slice(0, surroundingSquares.length);
possibleSquares.push([0, 0]);
function checkBoundaries(_ref) {
  let [x, y] = _ref;
  return x >= 0 && x < 10 && y >= 0 && y < 10;
}
class Gameboard {
  constructor(size) {
    this.rows = size;
    this.columns = size;
    this.board = [];
    this.fillBoard(); // filling board after initialization
  }
  fillBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i].push(' ');
      }
    }
  }
  getRandomCoords(ship) {
    let randomY;
    let randomX;
    let loops = 0;
    do {
      // small optimization of finding coords
      loops += 1;
      if (loops > 20) {
        ship.direction = ship.direction === 0 ? 1 : 0;
        loops = 0;
      }
      if (ship.direction === 0) {
        // horizontally
        randomY = Math.floor(Math.random() * this.rows);
        randomX = Math.floor(Math.random() * (this.columns - ship.length));
      } else {
        // vertically
        randomY = Math.floor(Math.random() * (this.rows - ship.length));
        randomX = Math.floor(Math.random() * this.columns);
      }
      // if we can't put our ship in range of (size of columns - start coordinate of ship), then we generate new coords
      // if we can put our ship in this range, but if in range of -1 to +1 squares is our neighbour ship, we generate new coords
    } while (!this.checkIfNotEmpty(ship, randomY, randomX));
    return [randomY, randomX];
  }
  checkIfNotEmpty(ship, randomY, randomX) {
    if (ship.direction === 0) {
      // horiz
      for (let j = randomX; j < randomX + ship.length; j++) {
        for (let square of possibleSquares) {
          let validSquare = [randomY + square[0], j + square[1]];
          if (!checkBoundaries(validSquare)) {
            continue;
          }
          if (this.board[validSquare[0]][validSquare[1]] !== ' ') {
            return false;
          }
        }
      }
    } else {
      // vertically
      for (let i = randomY; i < randomY + ship.length; i++) {
        for (let square of possibleSquares) {
          let validSquare = [i + square[0], randomX + square[1]];
          if (!checkBoundaries(validSquare)) {
            continue;
          }
          if (this.board[validSquare[0]][validSquare[1]] !== ' ') {
            return false;
          }
        }
      }
    }
    return [randomY, randomX];
  }
  placeShip(ship, randomY, randomX) {
    let shipCoords = [];
    if (ship.direction === 0) {
      // placing ship -> horizontally
      for (let j = randomX; j < randomX + ship.length; j++) {
        this.board[randomY][j] = '#';
        shipCoords.push([randomY, j]);
      }
    } else {
      // now we place ship vertically, so we iterate only in rows
      for (let i = randomY; i < randomY + ship.length; i++) {
        this.board[i][randomX] = '#';
        shipCoords.push([i, randomX]);
      }
    }
    ship.coords = shipCoords;
  }

  // helper function
  placeShips(ships) {
    let horizSum = 0;
    let vertSum = 0;
    for (let ship in ships) {
      if (ships[ship].direction === 0) horizSum += ships[ship].length;else vertSum += ships[ship].length;
      ships[ship].direction = horizSum > 8 ? 1 : 0;
      let [y, x] = this.getRandomCoords(ships[ship]);
      this.placeShip(ships[ship], y, x);
    }
  }
  receiveAttack(attackCoords, ships) {
    if (this.board[attackCoords[0]][attackCoords[1]] === '🚫' || this.board[attackCoords[0]][attackCoords[1]] === '💢') {
      return false; // temporary stub
    }
    for (let ship in ships) {
      for (let coords of ships[ship].coords) {
        if (attackCoords[0] === coords[0] && attackCoords[1] === coords[1]) {
          ships[ship].hit();
          this.board[attackCoords[0]][attackCoords[1]] = '💢';
          if (ships[ship].isSunk()) {
            console.log(`Ship ${ship} was sunk!`);
            this.makeSurroundingWater(ships[ship]);
          }
          return true;
        }
      }
    }
    this.board[attackCoords[0]][attackCoords[1]] = '🚫';
    return true;
  }
  makeSurroundingWater(ship) {
    for (let i = 0; i < ship.coords.length; i++) {
      let coords = ship.coords[i];
      for (let surrCoords of surroundingSquares) {
        // handling edge cases [0, +1], [0, -1]
        // handling edge cases [+1, 0], [-1, 0]
        if (ship.direction === 0) {
          if (surrCoords[0] === 0 && surrCoords[1] === 1 && i !== ship.coords.length - 1) continue;
          if (surrCoords[0] === 0 && surrCoords[1] === -1 && i !== 0) continue;
        } else {
          if (surrCoords[0] === 1 && surrCoords[1] === 0 && i !== ship.coords.length - 1) continue;
          if (surrCoords[0] === -1 && surrCoords[1] === 0 && i !== 0) continue;
        }
        let validSquare = [coords[0] + surrCoords[0], coords[1] + surrCoords[1]];
        if (!checkBoundaries(validSquare)) {
          continue;
        }
        this.board[validSquare[0]][validSquare[1]] = '🚫';
      }
    }
  }
  resetShips(ships) {
    for (let ship in ships) {
      ships[ship].resetHits();
      ships[ship].resetCoords();
    }
  }
  gameOver(ships) {
    for (let ship in ships) {
      if (!ships[ship].isSunk()) {
        return false;
      }
    }
    this.resetShips(ships);
    return true;
  }
}
module.exports = Gameboard;

/***/ }),

/***/ "./src/logic/ship.js":
/*!***************************!*\
  !*** ./src/logic/ship.js ***!
  \***************************/
/***/ ((module) => {



class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.coords = [];
    this.direction = Math.floor(Math.random() * 2);
  }
  hit() {
    this.hits++;
    return this;
  }
  resetHits() {
    this.hits = 0;
  }
  resetCoords() {
    this.coords = [];
  }
  isSunk() {
    return this.hits === this.length;
  }
}
module.exports = Ship;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style/style.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style/style.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
}

h1 {
    color: royalblue;
}

.names {
    font-size: 2rem;
    color: royalblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content {
    display: flex;
    justify-content: space-between;
}

.board {
    border: 2px solid orange;
    display: grid;
    width: 340px;
    height: 340px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    padding: 2px;
    background-color: royalblue;
}

.user-board {
    margin-left: 48px;
}

.user {
    margin-left: calc(24px + 170px);
}

.pc-board {
    margin-right: 48px;
}

.pc, .error {
    margin-right: calc(24px + 170px);
}

.cell {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid orange;
    background-color: lightblue;
    cursor: pointer;
}

.pc-board > .cell:hover {
    filter: brightness(80%);
}

.fired {
    background-color: red;
}

.surrounded {
    background-color: blue;
}

.error {
    display: flex;
    justify-content: flex-end;
    color: red;
    font-size: 80%;
}

dialog {
    width: 1000px;
    height: 145px;
    position: fixed;
    top: 50%;
    left: 50%;
    border: 0;
    border-radius: 8px;
    background-color: #f0eef1;
    color: black;
    transform: translate(-50%, -50%);
}

dialog::backdrop {
    background-color: black;
    opacity: 0.8;
}

.dialog-content {
    height: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
}

.dialog-content > p {
    color: royalblue;
    font-size: 1.5rem;
}

.restart, .random {
    background-color: royalblue;
    padding: 10px;
    width: 150px;
    font-weight: bold;
    font-size: 1rem;
    border: 0;
    border-radius: 8px;
    transition: filter 0.15s ease-in-out;
    cursor: pointer;
}

.restart {
    padding: 16px;
    font-size: 1.75rem;
    width: 160px;
}

button:hover {
    filter: brightness(90%);
}

.rand-position {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}


`, "",{"version":3,"sources":["webpack://./src/style/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,wBAAwB;IACxB,aAAa;IACb,YAAY;IACZ,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,YAAY;IACZ,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,wBAAwB;IACxB,2BAA2B;IAC3B,eAAe;AACnB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,yBAAyB;IACzB,UAAU;IACV,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,eAAe;IACf,QAAQ;IACR,SAAS;IACT,SAAS;IACT,kBAAkB;IAClB,yBAAyB;IACzB,YAAY;IACZ,gCAAgC;AACpC;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,2BAA2B;IAC3B,aAAa;IACb,YAAY;IACZ,iBAAiB;IACjB,eAAe;IACf,SAAS;IACT,kBAAkB;IAClB,oCAAoC;IACpC,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    min-height: 100vh;\n    font-family: 'Roboto', sans-serif;\n}\n\nheader {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-bottom: 48px;\n}\n\nh1 {\n    color: royalblue;\n}\n\n.names {\n    font-size: 2rem;\n    color: royalblue;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.content {\n    display: flex;\n    justify-content: space-between;\n}\n\n.board {\n    border: 2px solid orange;\n    display: grid;\n    width: 340px;\n    height: 340px;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    padding: 2px;\n    background-color: royalblue;\n}\n\n.user-board {\n    margin-left: 48px;\n}\n\n.user {\n    margin-left: calc(24px + 170px);\n}\n\n.pc-board {\n    margin-right: 48px;\n}\n\n.pc, .error {\n    margin-right: calc(24px + 170px);\n}\n\n.cell {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    font-size: 1.5rem;\n    border: 1px solid orange;\n    background-color: lightblue;\n    cursor: pointer;\n}\n\n.pc-board > .cell:hover {\n    filter: brightness(80%);\n}\n\n.fired {\n    background-color: red;\n}\n\n.surrounded {\n    background-color: blue;\n}\n\n.error {\n    display: flex;\n    justify-content: flex-end;\n    color: red;\n    font-size: 80%;\n}\n\ndialog {\n    width: 1000px;\n    height: 145px;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    border: 0;\n    border-radius: 8px;\n    background-color: #f0eef1;\n    color: black;\n    transform: translate(-50%, -50%);\n}\n\ndialog::backdrop {\n    background-color: black;\n    opacity: 0.8;\n}\n\n.dialog-content {\n    height: 145px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 24px;\n}\n\n.dialog-content > p {\n    color: royalblue;\n    font-size: 1.5rem;\n}\n\n.restart, .random {\n    background-color: royalblue;\n    padding: 10px;\n    width: 150px;\n    font-weight: bold;\n    font-size: 1rem;\n    border: 0;\n    border-radius: 8px;\n    transition: filter 0.15s ease-in-out;\n    cursor: pointer;\n}\n\n.restart {\n    padding: 16px;\n    font-size: 1.75rem;\n    width: 160px;\n}\n\nbutton:hover {\n    filter: brightness(90%);\n}\n\n.rand-position {\n    margin-top: 24px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/logic/ui.mjs":
/*!**************************!*\
  !*** ./src/logic/ui.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   screenController: () => (/* binding */ screenController)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/logic/gameboard.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./src/logic/ship.js");
/* harmony import */ var _ai_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai.js */ "./src/logic/ai.js");





const errorMsg = document.querySelector('.error');
const dialog = document.querySelector('dialog');
const restartBtn = document.querySelector('.restart');
const randomBtn = document.querySelector('.random');
const players = {
  0: new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__(10),
  1: new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__(10)
};

// I will try to make an algorithm later to make the coordinate search work for all ships
// so far it works only if you exclude Ship with size 1 and 2
const userShips = {
  // '1': new Ship(1),
  '2': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '3': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '4': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  // '5': new Ship(2),
  '6': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '7': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '8': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '9': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '10': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(4)
};
const pcShips = {
  // '1': new Ship(1),
  '2': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '3': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '4': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  // '5': new Ship(2),
  '6': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '7': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '8': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '9': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '10': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(4)
};
let activePlayer = 0;
function changePlayer() {
  return activePlayer = activePlayer === 0 ? 1 : 0;
}
players[activePlayer].placeShips(userShips);
changePlayer();
players[activePlayer].placeShips(pcShips);
changePlayer();
function gameOverModal(text) {
  const congratulations = document.querySelector('.congratulations');
  congratulations.textContent = text;
  dialog.showModal();
}
function userRender() {
  const board = document.querySelector('.user-board');
  const active = players[0];
  board.innerHTML = '';
  for (let i = 0; i < active.rows; i++) {
    for (let j = 0; j < active.columns; j++) {
      const btn = document.createElement('button');
      if (active.board[i][j] === '💢') btn.classList.add('fired');else if (active.board[i][j] === '🚫') btn.classList.add('surrounded');else btn.classList.add('cell');
      btn.textContent = active.board[i][j];
      board.appendChild(btn);
    }
  }
}
function pcRender() {
  const board = document.querySelector('.pc-board');
  const active = players[1];
  board.innerHTML = '';
  for (let i = 0; i < active.rows; i++) {
    for (let j = 0; j < active.columns; j++) {
      const btn = document.createElement('button');
      btn.dataset.y = `${i}`;
      btn.dataset.x = `${j}`;
      if (active.board[i][j] === '💢') {
        btn.textContent = active.board[i][j];
        btn.classList.add('fired');
      } else if (active.board[i][j] === '🚫') {
        btn.textContent = active.board[i][j];
        btn.classList.add('surrounded');
      } else btn.classList.add('cell');
      btn.textContent = active.board[i][j];
      board.appendChild(btn);
    }
  }
}
function fireUser() {
  const board = document.querySelector('.pc-board');
  board.addEventListener('click', attackHandler);
}
function attackHandler(event) {
  if (event.target.dataset.y && event.target.dataset.x && activePlayer === 0) {
    const active = players[1];
    const squareY = event.target.dataset.y;
    const squareX = event.target.dataset.x;
    if (!active.receiveAttack([+squareY, +squareX], pcShips)) {
      // if this square was attacked already
      errorMsg.textContent = `*Square ${[squareY, squareX]} already was attacked!`;
    } else {
      // we don't let pc fire, if our last attacked square was a hit
      if (active.board[+squareY][+squareX] === '💢') {
        active.receiveAttack([+squareY, +squareX], pcShips);
        pcRender();
        if (active.gameOver(pcShips)) {
          gameOverModal('Congratulations with victory!');
          return;
        }
        return;
      }
      errorMsg.textContent = "";
      pcRender();
      changePlayer();
      handleFire();
    }
  }
}
function getRandomCoordinates() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}
function pcFire() {
  const active = players[0];
  let y, x;
  do {
    [y, x] = getRandomCoordinates();
  } while (!active.receiveAttack([y, x], userShips));
  if (active.gameOver(userShips)) {
    gameOverModal(`Noooo you lost to pc you've made`);
    return;
  }
  if (active.board[y][x] === '💢') {
    // if pc hits user's ship
    if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, y, x)) {
      console.log('test');
      userRender();
      setTimeout(pcFire, 500);
      return;
    } else {
      setTimeout(() => targetFire(y, x), 500);
      return;
    }
  }
  userRender();
  changePlayer();
}
let tmpSquare = null;
let start = null;
let queue = [];
function targetFire(y, x) {
  const gameBoard = players[0];
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsHoriz)(gameBoard.board, y, x)) {
    // after handling ship of size 2, we determined that ship size is > 2
    // now we will handle this ship, if that ship is horizontal
    // compare only horizontal coords
    if (x >= start[1]) {
      queue = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireRight)(gameBoard.board, y, x);
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 500);
        tmpSquare = null;
        return;
      } else if (gameBoard.board[next[0]][next[1]] === '💢') {
        // ship size is more than 3
        setTimeout(() => targetFire(next[0], next[1]), 500);
        return;
      } else {
        changePlayer();
        return;
      }
    } else {
      queue = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireLeft)(gameBoard.board, y, x);
      if (queue.length === 0) {
        setTimeout(() => targetFire(start[0], start[1]), 500);
        return;
      }
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 500);
        tmpSquare = null;
        return;
      } else if (gameBoard.board[next[0]][next[1]] === '💢') {
        // ship size is more than 3
        if (next[1] - 1 >= 0) {
          gameBoard.receiveAttack([next[0], next[1] - 1], userShips);
          userRender();
          if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1] - 1)) {
            setTimeout(pcFire, 500);
            return;
          } else {
            setTimeout(() => targetFire(start[0], start[1]), 500);
            return;
          }
        } else {
          tmpSquare = [start[0], start[1]];
          changePlayer();
          return;
        }
      } else {
        tmpSquare = [start[0], start[1]];
        changePlayer();
        return;
      }
    }
  }
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsVert)(gameBoard.board, y, x)) {
    // after handling ship of size 2, we determined that ship size is > 2
    // now we will handle this ship, if that ship is vertical
    // compare only vertical coords
    if (y > start[0]) {
      queue = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireTop)(gameBoard.board, y, x);
      if (queue.length === 0) {
        setTimeout(() => targetFire(start[0], start[1]), 500);
        return;
      }
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 1000);
        tmpSquare = null;
        return;
      } else if (gameBoard.board[next[0]][next[1]] === '💢') {
        // ship size is more than 3
        setTimeout(() => targetFire(next[0], next[1]), 500);
        return;
      } else {
        changePlayer();
        return;
      }
    } else {
      queue = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireDown)(gameBoard.board, y, x);
      if (queue.length === 0) {
        setTimeout(() => targetFire(start[0], start[1]), 500);
        return;
      }
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 1000);
        tmpSquare = null;
        return;
      } else if (gameBoard.board[next[0]][next[1]] === '💢') {
        // ship size is more than 3
        if (next[0] - 1 >= 0) {
          gameBoard.receiveAttack([next[0] - 1, next[1]], userShips);
          userRender();
          if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0] - 1, next[1])) {
            setTimeout(pcFire, 500);
            return;
          } else {
            setTimeout(() => targetFire(start[0], start[1]), 500);
            return;
          }
        } else {
          tmpSquare = [start[0], start[1]];
          changePlayer();
          return;
        }
      } else {
        tmpSquare = [start[0], start[1]];
        changePlayer();
        return;
      }
    }
  }
  console.log('test');
  const q = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireMainDirections)(gameBoard.board, y, x);
  const next = q.shift();
  gameBoard.receiveAttack(next, userShips);
  userRender();
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
    // ship size was 2
    console.log('ship with length 2 was sunk!');
    setTimeout(pcFire, 500);
    tmpSquare = null;
  } else if (gameBoard.board[next[0]][next[1]] === '💢') {
    // ship size is more than 2, we need additional function-handler
    start = [y, x];
    setTimeout(() => targetFire(next[0], next[1]), 500);
  } else {
    // ship was not sunk, pc missed
    tmpSquare = [y, x];
    changePlayer();
  }
}
function handleFire() {
  if (activePlayer === 0) {
    fireUser();
  } else if (activePlayer === 1 && tmpSquare) {
    setTimeout(() => targetFire(tmpSquare[0], tmpSquare[1]), 500);
  } else {
    setTimeout(pcFire, 500);
  }
}
function restart() {
  restartBtn.addEventListener('click', function () {
    dialog.close();
    players[0].fillBoard();
    players[1].fillBoard();
    players[0].placeShips(userShips);
    players[1].placeShips(pcShips);
    screenController();
  });
}
function random() {
  randomBtn.addEventListener('click', function () {
    players[0].fillBoard();
    players[1].fillBoard();
    players[0].resetShips(userShips);
    players[1].resetShips(pcShips);
    players[0].placeShips(userShips);
    players[1].placeShips(pcShips);
    screenController();
  });
}
restart();
random();
function screenController() {
  userRender();
  pcRender();
  handleFire();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (screenController);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _logic_ui_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/ui.mjs */ "./src/logic/ui.mjs");




(0,_logic_ui_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTyxzRkFBc0YsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVks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eEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FhOztBQUVjO0FBRW1CO0FBRTlDQSx5REFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvYWkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvc3R5bGUvc3R5bGUuY3NzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL3N0eWxlL3N0eWxlLmNzcz9jOWYwIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL3VpLm1qcyIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vVGhlIGFsZ29yaXRobSBpcyBxdWl0ZSBzdHJhaWdodGZvcndhcmQsIHdoZW4gcGMgc2hvb3RzLCB3ZSBjaGVjayBpZiB0aGlzIHNob3Qgd2FzIGEgaGl0IChjaGFuZ2luZyB0aGUgY2VsbCBmcm9tIGVtcHR5IHRvIPCfkqIpXG4vLyBJZiB5ZXMsIHdlIGNoZWNrIGlmIHRoZSBzaGlwIHdhcyBzdW5rIC0gYnkgY2hlY2tpbmcgdGhpcyBzaGlwIGluIHVzZXJTaGlwcyBvYmplY3QgKFdlIGhhdmUgYWNjZXNzIHRvIGFsbCBzaGlwcyBhbmQgdGhlaXJcbi8vIGlzU3VuaygpIHByb3BlcnR5LCB3ZSBjYW4gZmluZCB0aGUgc2hpcCB3ZSBoaXQgYnkgY29vcmRpbmF0ZXMgYW5kIHRoZW4gY2hlY2sgdGhpcyBwcm9wZXJ0eS4gVGhpcyBpcyBjaGVhdGluZywgYnV0IEkgaGF2ZW4ndFxuLy8gZm91bmQgYSBiZXR0ZXIgc29sdXRpb24pLiBJZiB0aGUgY29tcHV0ZXIgaXMgaGl0IGFuZCBpc1N1bmsoKSA9IGZhbHNlLCB0aGVuIHRoZSBzaGlwIHNpemUgaXMgZ3JlYXRlciB0aGFuIDEgYW5kIHdlIHJ1biB0aGVcbi8vIFRhcmdldEZpcmUgZnVuY3Rpb24gd2hpY2ggd2lsbCB3b3JrIHVudGlsIGl0IGZsb29kcyB0aGUgc2hpcC4gRmlyc3Qgb2YgYWxsIGl0IHNob290cyBpbiA0IGRpcmVjdGlvbnMsIGlmIGl0IG1pc3NlcyB0aGVuIHRoZVxuLy8gcmlnaHQgdG8gbW92ZSBnb2VzIHRvIHRoZSBwbGF5ZXIsIGJ1dCB3ZSBzYXZlIHRoZSBsYXN0IGNvb3JkaW5hdGUgb2YgdGhlIGhpdCBhbmQgb24gdGhlIG5leHQgbW92ZSB0aGUgY29tcHV0ZXIgc2hvb3RzIGluIGFub3RoZXJcbi8vIGRpcmVjdGlvbiwgd2hlbiB0aGUgY29tcHV0ZXIgaGl0cyB3ZSBjaGVjayBpZiBpdCBpcyBzdW5rIG9yIG5vdCwgaWYgeWVzIHRoZW4gd2UgcnVuIHRoZSB1c3VhbCBwY0ZpcmUgZnVuY3Rpb24gd2hpY2ggc2hvb3RzIGF0IHJhbmRvbVxuLy8gY29vcmRpbmF0ZXMsIGlmIHBjIGhpdCBidXQgdGhlIHNoaXAgaXMgbm90IHN1bmsgdGhlbiB0aGUgc2hpcCBzaXplIGlzIGdyZWF0ZXIgdGhhbiAyIGFuZCB3ZSBjYW4gZmluZCBvdXQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgc2hpcFxuLy8gaG9yaXogb3IgdmVydC4gTm93IHdlIGp1c3QgY29tcGFyZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGxhc3QgaGl0IGFuZCBpZiB0aGUgbGFzdCBoaXQgaXMgYmlnZ2VyIHRoYW4gdGhlIHN0YXJ0aW5nIG9uZSB0aGVuIHdlIHNob290XG4vLyBvbmx5IHRvIHRoZSByaWdodCBob3Jpem9udGFsbHksIG90aGVyd2lzZSB0byB0aGUgbGVmdCBhbmQgc28gd2UgcmVwZWF0IGl0LlxuXG5cbmxldCBtYWluU3F1YXJlcyA9IFtcbiAgICBbMCwgLTFdLFxuICAgIFswLCAxXSxcbiAgICBbMSwgMF0sXG4gICAgWy0xLCAwXSxcbl1cblxubGV0IGhvcml6U3F1YXJlcyA9IFtcbiAgICBbMCwgLTFdLFxuICAgIFswLCAxXSxcbl1cblxubGV0IHZlcnRTcXVhcmVzID0gW1xuICAgIFstMSwgMF0sXG4gICAgWzEsIDBdLFxuXVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kYXJpZXMoW3gsIHldKSB7XG4gICAgcmV0dXJuICh4ID49IDAgJiYgeCA8IDEwKSAmJiAoeSA+PSAwICYmIHkgPCAxMClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBXYXNTdW5rKHNoaXBzLCB5LCB4KSB7XG4gICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcykge1xuICAgICAgICBmb3IgKGxldCBjb29yZHMgb2Ygc2hpcHNbc2hpcF0uY29vcmRzKSB7XG4gICAgICAgICAgICBpZiAoY29vcmRzWzBdID09PSB5ICYmIGNvb3Jkc1sxXSA9PT0geCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwc1tzaGlwXS5pc1N1bmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVNYWluRGlyZWN0aW9ucyhib2FyZCwgeSwgeCkge1xuICAgIGJvYXJkID0gYm9hcmQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKSBjZWxsID0gJyAnO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9KSk7XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIG1haW5TcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXTtcbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlwSXNIb3Jpeihib2FyZCwgeSwgeCkge1xuICAgIGZvciAobGV0IHNxdWFyZSBvZiBob3JpelNxdWFyZXMpIHtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dXG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGlmIChib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBJc1ZlcnQoYm9hcmQsIHksIHgpIHtcbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgdmVydFNxdWFyZXMpIHtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dXG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGlmIChib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxubGV0IGxlZnRTcXVhcmVzID0gW1xuICAgIFswLCAtMV0sXG4gICAgWzAsIC0yXSxcbl1cblxubGV0IHJpZ2h0U3F1YXJlcyA9IFtcbiAgICBbMCwgMV0sXG4gICAgWzAsIDJdLFxuXVxuXG5sZXQgZG93blNxdWFyZXMgPSBbXG4gICAgWy0xLCAwXSxcbiAgICBbLTIsIDBdLFxuXVxuXG5sZXQgdG9wU3F1YXJlcyA9IFtcbiAgICBbMSwgMF0sXG4gICAgWzIsIDBdLFxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUxlZnQoYm9hcmQsIHksIHgpIHtcbiAgICBib2FyZCA9IGJvYXJkLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgaWYgKGNlbGwgPT09ICcjJykgY2VsbCA9ICcgJztcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfSkpO1xuICAgIGxldCBvdXRwdXQgPSBbXVxuICAgIGZvciAobGV0IHNxdWFyZSBvZiBsZWZ0U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVSaWdodChib2FyZCwgeSwgeCkge1xuICAgIGJvYXJkID0gYm9hcmQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKSBjZWxsID0gJyAnO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9KSk7XG4gICAgbGV0IG91dHB1dCA9IFtdXG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIHJpZ2h0U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVEb3duKGJvYXJkLCB5LCB4KSB7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgZG93blNxdWFyZXMpIHtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dXG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGlmIChib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID09PSAnICcpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKHZhbGlkU3F1YXJlKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlVG9wKGJvYXJkLCB5LCB4KSB7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgdG9wU3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge3NoaXBXYXNTdW5rLCBmaXJlTWFpbkRpcmVjdGlvbnMsIHNoaXBJc1ZlcnQsIHNoaXBJc0hvcml6LCBmaXJlTGVmdCwgZmlyZVJpZ2h0LCBmaXJlVG9wLCBmaXJlRG93bn0iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5sZXQgc3Vycm91bmRpbmdTcXVhcmVzID0gW1xuICAgIFsxLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgMF0sXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMV0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgMV0sXG5dXG4vLyBqdXN0IGNvcHkgYXJyYXkgYWJvdmUgd2l0aCAuc2xpY2UgYW5kIHB1c2ggb25lIG1vcmUgc3F1YXJlIFswLDBdIGZvciBjaGVja0lmTm90RW1wdHkgZnVuY3Rpb25cbmxldCBwb3NzaWJsZVNxdWFyZXMgPSBzdXJyb3VuZGluZ1NxdWFyZXMuc2xpY2UoMCwgc3Vycm91bmRpbmdTcXVhcmVzLmxlbmd0aClcbnBvc3NpYmxlU3F1YXJlcy5wdXNoKFswLCAwXSlcblxuZnVuY3Rpb24gY2hlY2tCb3VuZGFyaWVzKFt4LCB5XSkge1xuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCAxMCkgJiYgKHkgPj0gMCAmJiB5IDwgMTApXG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICB0aGlzLnJvd3MgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBzaXplO1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIHRoaXMuZmlsbEJvYXJkKCk7IC8vIGZpbGxpbmcgYm9hcmQgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICB9XG5cbiAgICBmaWxsQm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldLnB1c2goJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJhbmRvbUNvb3JkcyhzaGlwKSB7XG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcbiAgICAgICAgbGV0IGxvb3BzID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gc21hbGwgb3B0aW1pemF0aW9uIG9mIGZpbmRpbmcgY29vcmRzXG4gICAgICAgICAgICBsb29wcyArPSAxO1xuICAgICAgICAgICAgaWYgKGxvb3BzID4gMjApe1xuICAgICAgICAgICAgICAgIHNoaXAuZGlyZWN0aW9uID0gc2hpcC5kaXJlY3Rpb24gPT09IDAgPyAxIDogMDtcbiAgICAgICAgICAgICAgICBsb29wcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDApIHsgLy8gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucm93cyk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmNvbHVtbnMgLSBzaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxseVxuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5yb3dzIC0gc2hpcC5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbid0IHB1dCBvdXIgc2hpcCBpbiByYW5nZSBvZiAoc2l6ZSBvZiBjb2x1bW5zIC0gc3RhcnQgY29vcmRpbmF0ZSBvZiBzaGlwKSwgdGhlbiB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgICAgICAvLyBpZiB3ZSBjYW4gcHV0IG91ciBzaGlwIGluIHRoaXMgcmFuZ2UsIGJ1dCBpZiBpbiByYW5nZSBvZiAtMSB0byArMSBzcXVhcmVzIGlzIG91ciBuZWlnaGJvdXIgc2hpcCwgd2UgZ2VuZXJhdGUgbmV3IGNvb3Jkc1xuICAgICAgICB9IHdoaWxlICghKHRoaXMuY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpKSlcblxuICAgICAgICByZXR1cm4gW3JhbmRvbVksIHJhbmRvbVhdO1xuICAgIH1cblxuICAgIGNoZWNrSWZOb3RFbXB0eShzaGlwLCByYW5kb21ZLCByYW5kb21YKSB7XG4gICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkgeyAvLyBob3JpelxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IHJhbmRvbVg7IGogPCByYW5kb21YICsgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3JhbmRvbVkgKyBzcXVhcmVbMF0sIGogKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsbHlcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzcXVhcmUgb2YgcG9zc2libGVTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtpICsgc3F1YXJlWzBdLCByYW5kb21YICsgc3F1YXJlWzFdXVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBwbGFjaW5nIHNoaXAgLT4gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyYW5kb21ZXVtqXSA9ICcjJztcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3JhbmRvbVksIGpdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm93IHdlIHBsYWNlIHNoaXAgdmVydGljYWxseSwgc28gd2UgaXRlcmF0ZSBvbmx5IGluIHJvd3NcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW3JhbmRvbVhdID0gJyMnO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbaSwgcmFuZG9tWF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcC5jb29yZHMgPSBzaGlwQ29vcmRzO1xuICAgIH1cblxuICAgIC8vIGhlbHBlciBmdW5jdGlvblxuICAgIHBsYWNlU2hpcHMoc2hpcHMpe1xuICAgICAgICBsZXQgaG9yaXpTdW0gPSAwXG4gICAgICAgIGxldCB2ZXJ0U3VtID0gMDtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uZGlyZWN0aW9uID09PSAwICkgaG9yaXpTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBlbHNlIHZlcnRTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5kaXJlY3Rpb24gPSBob3JpelN1bSA+IDggPyAxIDogMFxuICAgICAgICAgICAgbGV0IFt5LCB4XSA9IHRoaXMuZ2V0UmFuZG9tQ29vcmRzKHNoaXBzW3NoaXBdKVxuICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcHNbc2hpcF0sIHksIHgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcywgc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5qrJyB8fFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5KiJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gdGVtcG9yYXJ5IHN0dWJcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb29yZHMgb2Ygc2hpcHNbc2hpcF0uY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0Nvb3Jkc1swXSA9PT0gY29vcmRzWzBdICYmIGF0dGFja0Nvb3Jkc1sxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW3NoaXBdLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9ICfwn5KiJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGlwICR7c2hpcH0gd2FzIHN1bmshYClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcHNbc2hpcF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfmqsnXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1ha2VTdXJyb3VuZGluZ1dhdGVyKHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHNoaXAuY29vcmRzW2ldXG4gICAgICAgICAgICBmb3IgKGxldCBzdXJyQ29vcmRzIG9mIHN1cnJvdW5kaW5nU3F1YXJlcykge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWzAsICsxXSwgWzAsIC0xXVxuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWysxLCAwXSwgWy0xLCAwXVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDAgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMSkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAtMSkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAxICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IHNoaXAuY29vcmRzLmxlbmd0aCAtIDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IC0xICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IDApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbY29vcmRzWzBdICsgc3VyckNvb3Jkc1swXSwgY29vcmRzWzFdICsgc3VyckNvb3Jkc1sxXV1cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9ICfwn5qrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICByZXNldFNoaXBzKHNoaXBzKXtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5yZXNldEhpdHMoKTtcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLnJlc2V0Q29vcmRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnYW1lT3ZlcihzaGlwcykge1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBpZiAoIXNoaXBzW3NoaXBdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFNoaXBzKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyKVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXNldEhpdHMoKSB7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuICAgIHJlc2V0Q29vcmRzKCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgIH1cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoXG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xufVxuXG5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA0OHB4O1xufVxuXG5oMSB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLm5hbWVzIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5ib2FyZCB7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgd2lkdGg6IDM0MHB4O1xuICAgIGhlaWdodDogMzQwcHg7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLnVzZXItYm9hcmQge1xuICAgIG1hcmdpbi1sZWZ0OiA0OHB4O1xufVxuXG4udXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLnBjLWJvYXJkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XG59XG5cbi5wYywgLmVycm9yIHtcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLmNlbGwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcbn1cblxuLmZpcmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdXJyb3VuZGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4uZXJyb3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBjb2xvcjogcmVkO1xuICAgIGZvbnQtc2l6ZTogODAlO1xufVxuXG5kaWFsb2cge1xuICAgIHdpZHRoOiAxMDAwcHg7XG4gICAgaGVpZ2h0OiAxNDVweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbmRpYWxvZzo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgIG9wYWNpdHk6IDAuODtcbn1cblxuLmRpYWxvZy1jb250ZW50IHtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDI0cHg7XG59XG5cbi5kaWFsb2ctY29udGVudCA+IHAge1xuICAgIGNvbG9yOiByb3lhbGJsdWU7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5yZXN0YXJ0LCAucmFuZG9tIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2UtaW4tb3V0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnJlc3RhcnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xuICAgIHdpZHRoOiAxNjBweDtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcbn1cblxuLnJhbmQtcG9zaXRpb24ge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyxZQUFZO0lBQ1osMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsMkJBQTJCO0lBQzNCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixhQUFhO0lBQ2IsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixvQ0FBb0M7SUFDcEMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XFxufVxcblxcbmgxIHtcXG4gICAgY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLm5hbWVzIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHdpZHRoOiAzNDBweDtcXG4gICAgaGVpZ2h0OiAzNDBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBwYWRkaW5nOiAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLnVzZXItYm9hcmQge1xcbiAgICBtYXJnaW4tbGVmdDogNDhweDtcXG59XFxuXFxuLnVzZXIge1xcbiAgICBtYXJnaW4tbGVmdDogY2FsYygyNHB4ICsgMTcwcHgpO1xcbn1cXG5cXG4ucGMtYm9hcmQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XFxufVxcblxcbi5wYywgLmVycm9yIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBjYWxjKDI0cHggKyAxNzBweCk7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIG9yYW5nZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSk7XFxufVxcblxcbi5maXJlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnN1cnJvdW5kZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBjb2xvcjogcmVkO1xcbiAgICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuZGlhbG9nIHtcXG4gICAgd2lkdGg6IDEwMDBweDtcXG4gICAgaGVpZ2h0OiAxNDVweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuZGlhbG9nOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCB7XFxuICAgIGhlaWdodDogMTQ1cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDI0cHg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCA+IHAge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLnJlc3RhcnQsIC5yYW5kb20ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlLWluLW91dDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuICAgIHBhZGRpbmc6IDE2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS43NXJlbTtcXG4gICAgd2lkdGg6IDE2MHB4O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcXG59XFxuXFxuLnJhbmQtcG9zaXRpb24ge1xcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHtcbiAgICBmaXJlTWFpbkRpcmVjdGlvbnMsXG4gICAgc2hpcElzVmVydCxcbiAgICBzaGlwSXNIb3JpeixcbiAgICBzaGlwV2FzU3VuayxcbiAgICBmaXJlUmlnaHQsXG4gICAgZmlyZUxlZnQsXG4gICAgZmlyZVRvcCxcbiAgICBmaXJlRG93blxufSBmcm9tIFwiLi9haS5qc1wiO1xuXG5jb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpXG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cnKVxuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0JylcbmNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKVxuXG5jb25zdCBwbGF5ZXJzID0ge1xuICAgIDA6IG5ldyBHYW1lYm9hcmQoMTApLFxuICAgIDE6IG5ldyBHYW1lYm9hcmQoMTApLFxufVxuXG4vLyBJIHdpbGwgdHJ5IHRvIG1ha2UgYW4gYWxnb3JpdGhtIGxhdGVyIHRvIG1ha2UgdGhlIGNvb3JkaW5hdGUgc2VhcmNoIHdvcmsgZm9yIGFsbCBzaGlwc1xuLy8gc28gZmFyIGl0IHdvcmtzIG9ubHkgaWYgeW91IGV4Y2x1ZGUgU2hpcCB3aXRoIHNpemUgMSBhbmQgMlxuY29uc3QgdXNlclNoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgLy8gJzUnOiBuZXcgU2hpcCgyKSxcbiAgICAnNic6IG5ldyBTaGlwKDIpLFxuICAgICc3JzogbmV3IFNoaXAoMiksXG4gICAgJzgnOiBuZXcgU2hpcCgzKSxcbiAgICAnOSc6IG5ldyBTaGlwKDMpLFxuICAgICcxMCc6IG5ldyBTaGlwKDQpLFxufVxuXG5jb25zdCBwY1NoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgLy8gJzUnOiBuZXcgU2hpcCgyKSxcbiAgICAnNic6IG5ldyBTaGlwKDIpLFxuICAgICc3JzogbmV3IFNoaXAoMiksXG4gICAgJzgnOiBuZXcgU2hpcCgzKSxcbiAgICAnOSc6IG5ldyBTaGlwKDMpLFxuICAgICcxMCc6IG5ldyBTaGlwKDQpLFxufVxuXG5sZXQgYWN0aXZlUGxheWVyID0gMDtcblxuZnVuY3Rpb24gY2hhbmdlUGxheWVyKCkge1xuICAgIHJldHVybiBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcbn1cblxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcHModXNlclNoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKVxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwcyhwY1NoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKTtcblxuZnVuY3Rpb24gZ2FtZU92ZXJNb2RhbCh0ZXh0KSB7XG4gICAgY29uc3QgY29uZ3JhdHVsYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmdyYXR1bGF0aW9ucycpXG4gICAgY29uZ3JhdHVsYXRpb25zLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG59XG5cbmZ1bmN0aW9uIHVzZXJSZW5kZXIoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ib2FyZCcpO1xuICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMF07XG4gICAgYm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmUucm93czsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWN0aXZlLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgICAgIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5KiJykgYnRuLmNsYXNzTGlzdC5hZGQoJ2ZpcmVkJylcbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfmqsnKSBidG4uY2xhc3NMaXN0LmFkZCgnc3Vycm91bmRlZCcpXG4gICAgICAgICAgICBlbHNlIGJ0bi5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwY1JlbmRlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYy1ib2FyZCcpO1xuICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMV07XG4gICAgYm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmUucm93czsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWN0aXZlLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgICAgIGJ0bi5kYXRhc2V0LnkgPSBgJHtpfWA7XG4gICAgICAgICAgICBidG4uZGF0YXNldC54ID0gYCR7an1gO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2ZpcmVkJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+aqycpIHtcbiAgICAgICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc3Vycm91bmRlZCcpXG4gICAgICAgICAgICB9IGVsc2UgYnRuLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpcmVVc2VyKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBjLWJvYXJkJylcbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFja0hhbmRsZXIpXG59XG5cbmZ1bmN0aW9uIGF0dGFja0hhbmRsZXIoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSAmJiBldmVudC50YXJnZXQuZGF0YXNldC54ICYmIGFjdGl2ZVBsYXllciA9PT0gMCkge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSBwbGF5ZXJzWzFdXG4gICAgICAgIGNvbnN0IHNxdWFyZVkgPSBldmVudC50YXJnZXQuZGF0YXNldC55O1xuICAgICAgICBjb25zdCBzcXVhcmVYID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgICAgaWYgKCFhY3RpdmUucmVjZWl2ZUF0dGFjayhbK3NxdWFyZVksICtzcXVhcmVYXSwgcGNTaGlwcykpIHsgLy8gaWYgdGhpcyBzcXVhcmUgd2FzIGF0dGFja2VkIGFscmVhZHlcbiAgICAgICAgICAgIGVycm9yTXNnLnRleHRDb250ZW50ID0gYCpTcXVhcmUgJHtbc3F1YXJlWSwgc3F1YXJlWF19IGFscmVhZHkgd2FzIGF0dGFja2VkIWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGxldCBwYyBmaXJlLCBpZiBvdXIgbGFzdCBhdHRhY2tlZCBzcXVhcmUgd2FzIGEgaGl0XG4gICAgICAgICAgICBpZiAoYWN0aXZlLmJvYXJkWytzcXVhcmVZXVsrc3F1YXJlWF0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIGFjdGl2ZS5yZWNlaXZlQXR0YWNrKFsrc3F1YXJlWSwgK3NxdWFyZVhdLCBwY1NoaXBzKVxuICAgICAgICAgICAgICAgIHBjUmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZS5nYW1lT3ZlcihwY1NoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lT3Zlck1vZGFsKCdDb25ncmF0dWxhdGlvbnMgd2l0aCB2aWN0b3J5IScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3JNc2cudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgcGNSZW5kZXIoKTtcbiAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgaGFuZGxlRmlyZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db29yZGluYXRlcygpIHtcbiAgICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbn1cblxuZnVuY3Rpb24gcGNGaXJlKCkge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMF07XG4gICAgbGV0IHksIHg7XG4gICAgZG8ge1xuICAgICAgICBbeSwgeF0gPSBnZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgIH0gd2hpbGUgKCFhY3RpdmUucmVjZWl2ZUF0dGFjayhbeSwgeF0sIHVzZXJTaGlwcykpO1xuICAgIGlmIChhY3RpdmUuZ2FtZU92ZXIodXNlclNoaXBzKSkge1xuICAgICAgICBnYW1lT3Zlck1vZGFsKGBOb29vbyB5b3UgbG9zdCB0byBwYyB5b3UndmUgbWFkZWApXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFjdGl2ZS5ib2FyZFt5XVt4XSA9PT0gJ/CfkqInKSB7IC8vIGlmIHBjIGhpdHMgdXNlcidzIHNoaXBcbiAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgeSwgeCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHksIHgpLCA1MDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXNlclJlbmRlcigpO1xuICAgIGNoYW5nZVBsYXllcigpO1xufVxuXG5sZXQgdG1wU3F1YXJlID0gbnVsbDtcbmxldCBzdGFydCA9IG51bGw7XG5sZXQgcXVldWUgPSBbXVxuXG5mdW5jdGlvbiB0YXJnZXRGaXJlKHksIHgpIHtcblxuICAgIGNvbnN0IGdhbWVCb2FyZCA9IHBsYXllcnNbMF1cblxuICAgIGlmIChzaGlwSXNIb3JpeihnYW1lQm9hcmQuYm9hcmQsIHksIHgpKSB7XG4gICAgICAgIC8vIGFmdGVyIGhhbmRsaW5nIHNoaXAgb2Ygc2l6ZSAyLCB3ZSBkZXRlcm1pbmVkIHRoYXQgc2hpcCBzaXplIGlzID4gMlxuICAgICAgICAvLyBub3cgd2Ugd2lsbCBoYW5kbGUgdGhpcyBzaGlwLCBpZiB0aGF0IHNoaXAgaXMgaG9yaXpvbnRhbFxuICAgICAgICAvLyBjb21wYXJlIG9ubHkgaG9yaXpvbnRhbCBjb29yZHNcbiAgICAgICAgaWYgKHggPj0gc3RhcnRbMV0pIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZVJpZ2h0KGdhbWVCb2FyZC5ib2FyZCwgeSwgeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gM1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShuZXh0WzBdLCBuZXh0WzFdKSwgNTAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVldWUgPSBmaXJlTGVmdChnYW1lQm9hcmQuYm9hcmQsIHksIHgpXG4gICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKG5leHQsIHVzZXJTaGlwcyk7XG4gICAgICAgICAgICB1c2VyUmVuZGVyKCk7XG4gICAgICAgICAgICBpZiAoc2hpcFdhc1N1bmsodXNlclNoaXBzLCBuZXh0WzBdLCBuZXh0WzFdKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIHdpdGggc2l6ZSAzIHdhcyBzdW5rJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgNTAwKTtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW25leHRbMF1dW25leHRbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDNcbiAgICAgICAgICAgICAgICBpZiAobmV4dFsxXSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbbmV4dFswXSwgbmV4dFsxXSAtIDFdLCB1c2VyU2hpcHMpXG4gICAgICAgICAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShzdGFydFswXSwgc3RhcnRbMV0pLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wU3F1YXJlID0gW3N0YXJ0WzBdLCBzdGFydFsxXV1cbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IFtzdGFydFswXSwgc3RhcnRbMV1dXG4gICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwSXNWZXJ0KGdhbWVCb2FyZC5ib2FyZCwgeSwgeCkpIHtcbiAgICAgICAgLy8gYWZ0ZXIgaGFuZGxpbmcgc2hpcCBvZiBzaXplIDIsIHdlIGRldGVybWluZWQgdGhhdCBzaGlwIHNpemUgaXMgPiAyXG4gICAgICAgIC8vIG5vdyB3ZSB3aWxsIGhhbmRsZSB0aGlzIHNoaXAsIGlmIHRoYXQgc2hpcCBpcyB2ZXJ0aWNhbFxuICAgICAgICAvLyBjb21wYXJlIG9ubHkgdmVydGljYWwgY29vcmRzXG4gICAgICAgIGlmICh5ID4gc3RhcnRbMF0pIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZVRvcChnYW1lQm9hcmQuYm9hcmQsIHksIHgpO1xuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCAxMDAwKTtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW25leHRbMF1dW25leHRbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEZpcmUobmV4dFswXSwgbmV4dFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZURvd24oZ2FtZUJvYXJkLmJvYXJkLCB5LCB4KVxuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShzdGFydFswXSwgc3RhcnRbMV0pLCA1MDApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhuZXh0LCB1c2VyU2hpcHMpO1xuICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCB3aXRoIHNpemUgMyB3YXMgc3VuaycpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDEwMDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gM1xuICAgICAgICAgICAgICAgIGlmIChuZXh0WzBdIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFtuZXh0WzBdIC0gMSwgbmV4dFsxXV0sIHVzZXJTaGlwcylcbiAgICAgICAgICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcFdhc1N1bmsodXNlclNoaXBzLCBuZXh0WzBdIC0gMSwgbmV4dFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBbc3RhcnRbMF0sIHN0YXJ0WzFdXVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBbc3RhcnRbMF0sIHN0YXJ0WzFdXVxuICAgICAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgY29uc3QgcSA9IGZpcmVNYWluRGlyZWN0aW9ucyhnYW1lQm9hcmQuYm9hcmQsIHksIHgpXG4gICAgY29uc3QgbmV4dCA9IHEuc2hpZnQoKTtcblxuICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKG5leHQsIHVzZXJTaGlwcyk7XG4gICAgdXNlclJlbmRlcigpO1xuXG4gICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgLy8gc2hpcCBzaXplIHdhcyAyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIHdpdGggbGVuZ3RoIDIgd2FzIHN1bmshJylcbiAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDUwMCk7XG4gICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDIsIHdlIG5lZWQgYWRkaXRpb25hbCBmdW5jdGlvbi1oYW5kbGVyXG4gICAgICAgIHN0YXJ0ID0gW3ksIHhdXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShuZXh0WzBdLCBuZXh0WzFdKSwgNTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzaGlwIHdhcyBub3Qgc3VuaywgcGMgbWlzc2VkXG4gICAgICAgIHRtcFNxdWFyZSA9IFt5LCB4XVxuICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlRmlyZSgpIHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSAwKSB7XG4gICAgICAgIGZpcmVVc2VyKCk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVQbGF5ZXIgPT09IDEgJiYgdG1wU3F1YXJlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZSh0bXBTcXVhcmVbMF0sIHRtcFNxdWFyZVsxXSksIDUwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDUwMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICBwbGF5ZXJzWzBdLmZpbGxCb2FyZCgpO1xuICAgICAgICBwbGF5ZXJzWzFdLmZpbGxCb2FyZCgpO1xuXG4gICAgICAgIHBsYXllcnNbMF0ucGxhY2VTaGlwcyh1c2VyU2hpcHMpO1xuICAgICAgICBwbGF5ZXJzWzFdLnBsYWNlU2hpcHMocGNTaGlwcyk7XG5cbiAgICAgICAgc2NyZWVuQ29udHJvbGxlcigpO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICByYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBsYXllcnNbMF0uZmlsbEJvYXJkKCk7XG4gICAgICAgIHBsYXllcnNbMV0uZmlsbEJvYXJkKCk7XG5cbiAgICAgICAgcGxheWVyc1swXS5yZXNldFNoaXBzKHVzZXJTaGlwcyk7XG4gICAgICAgIHBsYXllcnNbMV0ucmVzZXRTaGlwcyhwY1NoaXBzKTtcblxuICAgICAgICBwbGF5ZXJzWzBdLnBsYWNlU2hpcHModXNlclNoaXBzKTtcbiAgICAgICAgcGxheWVyc1sxXS5wbGFjZVNoaXBzKHBjU2hpcHMpO1xuICAgICAgICBzY3JlZW5Db250cm9sbGVyKCk7XG4gICAgfSlcbn1cblxucmVzdGFydCgpO1xucmFuZG9tKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW5Db250cm9sbGVyKCkge1xuICAgIHVzZXJSZW5kZXIoKTtcbiAgICBwY1JlbmRlcigpO1xuICAgIGhhbmRsZUZpcmUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBcIi4vc3R5bGUvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL2xvZ2ljL3VpLm1qc1wiO1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuIl0sIm5hbWVzIjpbIm1haW5TcXVhcmVzIiwiaG9yaXpTcXVhcmVzIiwidmVydFNxdWFyZXMiLCJjaGVja0JvdW5kYXJpZXMiLCJfcmVmIiwieCIsInkiLCJzaGlwV2FzU3VuayIsInNoaXBzIiwic2hpcCIsImNvb3JkcyIsImlzU3VuayIsImZpcmVNYWluRGlyZWN0aW9ucyIsImJvYXJkIiwibWFwIiwicm93IiwiY2VsbCIsIm91dHB1dCIsInNxdWFyZSIsInZhbGlkU3F1YXJlIiwicHVzaCIsInNoaXBJc0hvcml6Iiwic2hpcElzVmVydCIsImxlZnRTcXVhcmVzIiwicmlnaHRTcXVhcmVzIiwiZG93blNxdWFyZXMiLCJ0b3BTcXVhcmVzIiwiZmlyZUxlZnQiLCJmaXJlUmlnaHQiLCJmaXJlRG93biIsImZpcmVUb3AiLCJzdXJyb3VuZGluZ1NxdWFyZXMiLCJwb3NzaWJsZVNxdWFyZXMiLCJzbGljZSIsImxlbmd0aCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwic2l6ZSIsInJvd3MiLCJjb2x1bW5zIiwiZmlsbEJvYXJkIiwiaSIsImoiLCJnZXRSYW5kb21Db29yZHMiLCJyYW5kb21ZIiwicmFuZG9tWCIsImxvb3BzIiwiZGlyZWN0aW9uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2hlY2tJZk5vdEVtcHR5IiwicGxhY2VTaGlwIiwic2hpcENvb3JkcyIsInBsYWNlU2hpcHMiLCJob3JpelN1bSIsInZlcnRTdW0iLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwiaGl0IiwiY29uc29sZSIsImxvZyIsIm1ha2VTdXJyb3VuZGluZ1dhdGVyIiwic3VyckNvb3JkcyIsInJlc2V0U2hpcHMiLCJyZXNldEhpdHMiLCJyZXNldENvb3JkcyIsImdhbWVPdmVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIlNoaXAiLCJoaXRzIiwiZXJyb3JNc2ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2ciLCJyZXN0YXJ0QnRuIiwicmFuZG9tQnRuIiwicGxheWVycyIsInVzZXJTaGlwcyIsInBjU2hpcHMiLCJhY3RpdmVQbGF5ZXIiLCJjaGFuZ2VQbGF5ZXIiLCJnYW1lT3Zlck1vZGFsIiwidGV4dCIsImNvbmdyYXR1bGF0aW9ucyIsInRleHRDb250ZW50Iiwic2hvd01vZGFsIiwidXNlclJlbmRlciIsImFjdGl2ZSIsImlubmVySFRNTCIsImJ0biIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInBjUmVuZGVyIiwiZGF0YXNldCIsImZpcmVVc2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFja0hhbmRsZXIiLCJldmVudCIsInRhcmdldCIsInNxdWFyZVkiLCJzcXVhcmVYIiwiaGFuZGxlRmlyZSIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGNGaXJlIiwic2V0VGltZW91dCIsInRhcmdldEZpcmUiLCJ0bXBTcXVhcmUiLCJzdGFydCIsInF1ZXVlIiwiZ2FtZUJvYXJkIiwibmV4dCIsInNoaWZ0IiwicSIsInJlc3RhcnQiLCJjbG9zZSIsInNjcmVlbkNvbnRyb2xsZXIiXSwic291cmNlUm9vdCI6IiJ9