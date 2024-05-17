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
      // btn.textContent = active.board[i][j]
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
    userRender();
    gameOverModal(`PC won!`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTyxzRkFBc0YsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLDZCQUE2QixnQkFBZ0IsaUJBQWlCLEdBQUcsVUFBVSx3QkFBd0Isd0NBQXdDLEdBQUcsWUFBWSxvQkFBb0IsOEJBQThCLDBCQUEwQiwwQkFBMEIsR0FBRyxRQUFRLHVCQUF1QixHQUFHLFlBQVksc0JBQXNCLHVCQUF1QixvQkFBb0IscUNBQXFDLDBCQUEwQixHQUFHLGNBQWMsb0JBQW9CLHFDQUFxQyxHQUFHLFlBQVksK0JBQStCLG9CQUFvQixtQkFBbUIsb0JBQW9CLDZDQUE2QywwQ0FBMEMsbUJBQW1CLGtDQUFrQyxHQUFHLGlCQUFpQix3QkFBd0IsR0FBRyxXQUFXLHNDQUFzQyxHQUFHLGVBQWUseUJBQXlCLEdBQUcsaUJBQWlCLHVDQUF1QyxHQUFHLFdBQVcsb0JBQW9CLDhCQUE4QiwwQkFBMEIseUJBQXlCLHdCQUF3QiwrQkFBK0Isa0NBQWtDLHNCQUFzQixHQUFHLDZCQUE2Qiw4QkFBOEIsR0FBRyxZQUFZLDRCQUE0QixHQUFHLGlCQUFpQiw2QkFBNkIsR0FBRyxZQUFZLG9CQUFvQixnQ0FBZ0MsaUJBQWlCLHFCQUFxQixHQUFHLFlBQVksb0JBQW9CLG9CQUFvQixzQkFBc0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLHlCQUF5QixnQ0FBZ0MsbUJBQW1CLHVDQUF1QyxHQUFHLHNCQUFzQiw4QkFBOEIsbUJBQW1CLEdBQUcscUJBQXFCLG9CQUFvQixvQkFBb0IsOEJBQThCLDBCQUEwQixnQkFBZ0IsR0FBRyx5QkFBeUIsdUJBQXVCLHdCQUF3QixHQUFHLHVCQUF1QixrQ0FBa0Msb0JBQW9CLG1CQUFtQix3QkFBd0Isc0JBQXNCLGdCQUFnQix5QkFBeUIsMkNBQTJDLHNCQUFzQixHQUFHLGNBQWMsb0JBQW9CLHlCQUF5QixtQkFBbUIsR0FBRyxrQkFBa0IsOEJBQThCLEdBQUcsb0JBQW9CLHVCQUF1QixvQkFBb0IsOEJBQThCLDBCQUEwQixHQUFHLHlCQUF5QjtBQUN2ckg7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUMvSjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFzRztBQUN0RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSWdEO0FBQ3hFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiYTs7QUFFMEI7QUFDVjtBQVVaO0FBRWpCLE1BQU1FLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQ2pELE1BQU1DLE1BQU0sR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQy9DLE1BQU1FLFVBQVUsR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU1HLFNBQVMsR0FBR0osUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDO0FBRW5ELE1BQU1JLE9BQU8sR0FBRztFQUNaLENBQUMsRUFBRSxJQUFJM0MsMENBQVMsQ0FBQyxFQUFFLENBQUM7RUFDcEIsQ0FBQyxFQUFFLElBQUlBLDBDQUFTLENBQUMsRUFBRTtBQUN2QixDQUFDOztBQUVEO0FBQ0E7QUFDQSxNQUFNNEMsU0FBUyxHQUFHO0VBQ2Q7RUFDQSxHQUFHLEVBQUUsSUFBSVQscUNBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsR0FBRyxFQUFFLElBQUlBLHFDQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hCLEdBQUcsRUFBRSxJQUFJQSxxQ0FBSSxDQUFDLENBQUMsQ0FBQztFQUNoQjtFQUNBLEdBQUcsRUFBRSxJQUFJQSxxQ0FBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixHQUFHLEVBQUUsSUFBSUEscUNBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsR0FBRyxFQUFFLElBQUlBLHFDQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hCLEdBQUcsRUFBRSxJQUFJQSxxQ0FBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixJQUFJLEVBQUUsSUFBSUEscUNBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNVSxPQUFPLEdBQUc7RUFDWjtFQUNBLEdBQUcsRUFBRSxJQUFJVixxQ0FBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixHQUFHLEVBQUUsSUFBSUEscUNBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsR0FBRyxFQUFFLElBQUlBLHFDQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hCO0VBQ0EsR0FBRyxFQUFFLElBQUlBLHFDQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hCLEdBQUcsRUFBRSxJQUFJQSxxQ0FBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixHQUFHLEVBQUUsSUFBSUEscUNBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsR0FBRyxFQUFFLElBQUlBLHFDQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hCLElBQUksRUFBRSxJQUFJQSxxQ0FBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUVELElBQUlXLFlBQVksR0FBRyxDQUFDO0FBRXBCLFNBQVNDLFlBQVlBLENBQUEsRUFBRztFQUNwQixPQUFPRCxZQUFZLEdBQUdBLFlBQVksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDcEQ7QUFFQUgsT0FBTyxDQUFDRyxZQUFZLENBQUMsQ0FBQzNCLFVBQVUsQ0FBQ3lCLFNBQVMsQ0FBQztBQUUzQ0csWUFBWSxDQUFDLENBQUM7QUFFZEosT0FBTyxDQUFDRyxZQUFZLENBQUMsQ0FBQzNCLFVBQVUsQ0FBQzBCLE9BQU8sQ0FBQztBQUV6Q0UsWUFBWSxDQUFDLENBQUM7QUFFZCxTQUFTQyxhQUFhQSxDQUFDQyxJQUFJLEVBQUU7RUFDekIsTUFBTUMsZUFBZSxHQUFHWixRQUFRLENBQUNDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztFQUNsRVcsZUFBZSxDQUFDQyxXQUFXLEdBQUdGLElBQUk7RUFDbENULE1BQU0sQ0FBQ1ksU0FBUyxDQUFDLENBQUM7QUFDdEI7QUFFQSxTQUFTQyxVQUFVQSxDQUFBLEVBQUc7RUFDbEIsTUFBTTNFLEtBQUssR0FBRzRELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUNuRCxNQUFNZSxNQUFNLEdBQUdYLE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDekJqRSxLQUFLLENBQUM2RSxTQUFTLEdBQUcsRUFBRTtFQUNwQixLQUFLLElBQUlqRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdnRCxNQUFNLENBQUNuRCxJQUFJLEVBQUVHLENBQUMsRUFBRSxFQUFFO0lBQ2xDLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHK0MsTUFBTSxDQUFDbEQsT0FBTyxFQUFFRyxDQUFDLEVBQUUsRUFBRTtNQUNyQyxNQUFNaUQsR0FBRyxHQUFHbEIsUUFBUSxDQUFDbUIsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUM1QyxJQUFJSCxNQUFNLENBQUM1RSxLQUFLLENBQUM0QixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFaUQsR0FBRyxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFDdEQsSUFBSUwsTUFBTSxDQUFDNUUsS0FBSyxDQUFDNEIsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRWlELEdBQUcsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQ2hFSCxHQUFHLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUM5QkgsR0FBRyxDQUFDTCxXQUFXLEdBQUdHLE1BQU0sQ0FBQzVFLEtBQUssQ0FBQzRCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUM7TUFDcEM3QixLQUFLLENBQUNrRixXQUFXLENBQUNKLEdBQUcsQ0FBQztJQUMxQjtFQUNKO0FBQ0o7QUFFQSxTQUFTSyxRQUFRQSxDQUFBLEVBQUc7RUFDaEIsTUFBTW5GLEtBQUssR0FBRzRELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUNqRCxNQUFNZSxNQUFNLEdBQUdYLE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDekJqRSxLQUFLLENBQUM2RSxTQUFTLEdBQUcsRUFBRTtFQUNwQixLQUFLLElBQUlqRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdnRCxNQUFNLENBQUNuRCxJQUFJLEVBQUVHLENBQUMsRUFBRSxFQUFFO0lBQ2xDLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHK0MsTUFBTSxDQUFDbEQsT0FBTyxFQUFFRyxDQUFDLEVBQUUsRUFBRTtNQUNyQyxNQUFNaUQsR0FBRyxHQUFHbEIsUUFBUSxDQUFDbUIsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUM1Q0QsR0FBRyxDQUFDTSxPQUFPLENBQUMzRixDQUFDLEdBQUksR0FBRW1DLENBQUUsRUFBQztNQUN0QmtELEdBQUcsQ0FBQ00sT0FBTyxDQUFDNUYsQ0FBQyxHQUFJLEdBQUVxQyxDQUFFLEVBQUM7TUFDdEIsSUFBSStDLE1BQU0sQ0FBQzVFLEtBQUssQ0FBQzRCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDN0JpRCxHQUFHLENBQUNMLFdBQVcsR0FBR0csTUFBTSxDQUFDNUUsS0FBSyxDQUFDNEIsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQztRQUNwQ2lELEdBQUcsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQzlCLENBQUMsTUFBTSxJQUFJTCxNQUFNLENBQUM1RSxLQUFLLENBQUM0QixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3BDaUQsR0FBRyxDQUFDTCxXQUFXLEdBQUdHLE1BQU0sQ0FBQzVFLEtBQUssQ0FBQzRCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUM7UUFDcENpRCxHQUFHLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUNuQyxDQUFDLE1BQU1ILEdBQUcsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQ2hDO01BQ0FqRixLQUFLLENBQUNrRixXQUFXLENBQUNKLEdBQUcsQ0FBQztJQUMxQjtFQUNKO0FBQ0o7QUFFQSxTQUFTTyxRQUFRQSxDQUFBLEVBQUc7RUFDaEIsTUFBTXJGLEtBQUssR0FBRzRELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUNqRDdELEtBQUssQ0FBQ3NGLGdCQUFnQixDQUFDLE9BQU8sRUFBRUMsYUFBYSxDQUFDO0FBQ2xEO0FBRUEsU0FBU0EsYUFBYUEsQ0FBQ0MsS0FBSyxFQUFFO0VBQzFCLElBQUlBLEtBQUssQ0FBQ0MsTUFBTSxDQUFDTCxPQUFPLENBQUMzRixDQUFDLElBQUkrRixLQUFLLENBQUNDLE1BQU0sQ0FBQ0wsT0FBTyxDQUFDNUYsQ0FBQyxJQUFJNEUsWUFBWSxLQUFLLENBQUMsRUFBRTtJQUN4RSxNQUFNUSxNQUFNLEdBQUdYLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekIsTUFBTXlCLE9BQU8sR0FBR0YsS0FBSyxDQUFDQyxNQUFNLENBQUNMLE9BQU8sQ0FBQzNGLENBQUM7SUFDdEMsTUFBTWtHLE9BQU8sR0FBR0gsS0FBSyxDQUFDQyxNQUFNLENBQUNMLE9BQU8sQ0FBQzVGLENBQUM7SUFDdEMsSUFBSSxDQUFDb0YsTUFBTSxDQUFDaEMsYUFBYSxDQUFDLENBQUMsQ0FBQzhDLE9BQU8sRUFBRSxDQUFDQyxPQUFPLENBQUMsRUFBRXhCLE9BQU8sQ0FBQyxFQUFFO01BQUU7TUFDeERSLFFBQVEsQ0FBQ2MsV0FBVyxHQUFJLFdBQVUsQ0FBQ2lCLE9BQU8sRUFBRUMsT0FBTyxDQUFFLHdCQUF1QjtJQUNoRixDQUFDLE1BQU07TUFDSDtNQUNBLElBQUlmLE1BQU0sQ0FBQzVFLEtBQUssQ0FBQyxDQUFDMEYsT0FBTyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzNDZixNQUFNLENBQUNoQyxhQUFhLENBQUMsQ0FBQyxDQUFDOEMsT0FBTyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxFQUFFeEIsT0FBTyxDQUFDO1FBQ25EZ0IsUUFBUSxDQUFDLENBQUM7UUFDVixJQUFJUCxNQUFNLENBQUN0QixRQUFRLENBQUNhLE9BQU8sQ0FBQyxFQUFFO1VBQzFCRyxhQUFhLENBQUMsK0JBQStCLENBQUM7VUFDOUM7UUFDSjtRQUNBO01BQ0o7TUFDQVgsUUFBUSxDQUFDYyxXQUFXLEdBQUcsRUFBRTtNQUN6QlUsUUFBUSxDQUFDLENBQUM7TUFDVmQsWUFBWSxDQUFDLENBQUM7TUFDZHVCLFVBQVUsQ0FBQyxDQUFDO0lBQ2hCO0VBQ0o7QUFDSjtBQUVBLFNBQVNDLG9CQUFvQkEsQ0FBQSxFQUFHO0VBQzVCLE9BQU8sQ0FBQzFELElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUVGLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDM0U7QUFFQSxTQUFTeUQsTUFBTUEsQ0FBQSxFQUFHO0VBQ2QsTUFBTWxCLE1BQU0sR0FBR1gsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUN6QixJQUFJeEUsQ0FBQyxFQUFFRCxDQUFDO0VBQ1IsR0FBRztJQUNDLENBQUNDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEdBQUdxRyxvQkFBb0IsQ0FBQyxDQUFDO0VBQ25DLENBQUMsUUFBUSxDQUFDakIsTUFBTSxDQUFDaEMsYUFBYSxDQUFDLENBQUNuRCxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFMEUsU0FBUyxDQUFDO0VBQ2pELElBQUlVLE1BQU0sQ0FBQ3RCLFFBQVEsQ0FBQ1ksU0FBUyxDQUFDLEVBQUU7SUFDNUJTLFVBQVUsQ0FBQyxDQUFDO0lBQ1pMLGFBQWEsQ0FBRSxTQUFRLENBQUM7SUFDeEI7RUFDSjtFQUNBLElBQUlNLE1BQU0sQ0FBQzVFLEtBQUssQ0FBQ1AsQ0FBQyxDQUFDLENBQUNELENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUFFO0lBQy9CLElBQUlFLG1EQUFXLENBQUN3RSxTQUFTLEVBQUV6RSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFO01BQzlCdUQsT0FBTyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQ25CMkIsVUFBVSxDQUFDLENBQUM7TUFDWm9CLFVBQVUsQ0FBQ0QsTUFBTSxFQUFFLEdBQUcsQ0FBQztNQUN2QjtJQUNKLENBQUMsTUFBTTtNQUNIQyxVQUFVLENBQUMsTUFBTUMsVUFBVSxDQUFDdkcsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7TUFDdkM7SUFDSjtFQUNKO0VBQ0FtRixVQUFVLENBQUMsQ0FBQztFQUNaTixZQUFZLENBQUMsQ0FBQztBQUNsQjtBQUVBLElBQUk0QixTQUFTLEdBQUcsSUFBSTtBQUNwQixJQUFJQyxLQUFLLEdBQUcsSUFBSTtBQUNoQixJQUFJQyxLQUFLLEdBQUcsRUFBRTtBQUVkLFNBQVNILFVBQVVBLENBQUN2RyxDQUFDLEVBQUVELENBQUMsRUFBRTtFQUV0QixNQUFNNEcsU0FBUyxHQUFHbkMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUU1QixJQUFJekQsbURBQVcsQ0FBQzRGLFNBQVMsQ0FBQ3BHLEtBQUssRUFBRVAsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRTtJQUNwQztJQUNBO0lBQ0E7SUFDQSxJQUFJQSxDQUFDLElBQUkwRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDZkMsS0FBSyxHQUFHcEYsaURBQVMsQ0FBQ3FGLFNBQVMsQ0FBQ3BHLEtBQUssRUFBRVAsQ0FBQyxFQUFFRCxDQUFDLENBQUM7TUFDeEMsTUFBTTZHLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUMxQkYsU0FBUyxDQUFDeEQsYUFBYSxDQUFDeUQsSUFBSSxFQUFFbkMsU0FBUyxDQUFDO01BQ3hDUyxVQUFVLENBQUMsQ0FBQztNQUNaLElBQUlqRixtREFBVyxDQUFDd0UsU0FBUyxFQUFFbUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQ3RELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQ3hDK0MsVUFBVSxDQUFDRCxNQUFNLEVBQUUsR0FBRyxDQUFDO1FBQ3ZCRyxTQUFTLEdBQUcsSUFBSTtRQUNoQjtNQUNKLENBQUMsTUFBTSxJQUFJRyxTQUFTLENBQUNwRyxLQUFLLENBQUNxRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25EO1FBQ0FOLFVBQVUsQ0FBQyxNQUFNQyxVQUFVLENBQUNLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ25EO01BQ0osQ0FBQyxNQUFNO1FBQ0hoQyxZQUFZLENBQUMsQ0FBQztRQUNkO01BQ0o7SUFDSixDQUFDLE1BQU07TUFDSDhCLEtBQUssR0FBR3JGLGdEQUFRLENBQUNzRixTQUFTLENBQUNwRyxLQUFLLEVBQUVQLENBQUMsRUFBRUQsQ0FBQyxDQUFDO01BQ3ZDLElBQUkyRyxLQUFLLENBQUM5RSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3BCMEUsVUFBVSxDQUFDLE1BQU1DLFVBQVUsQ0FBQ0UsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDckQ7TUFDSjtNQUNBLE1BQU1HLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUMxQkYsU0FBUyxDQUFDeEQsYUFBYSxDQUFDeUQsSUFBSSxFQUFFbkMsU0FBUyxDQUFDO01BQ3hDUyxVQUFVLENBQUMsQ0FBQztNQUNaLElBQUlqRixtREFBVyxDQUFDd0UsU0FBUyxFQUFFbUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQ3RELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQ3hDK0MsVUFBVSxDQUFDRCxNQUFNLEVBQUUsR0FBRyxDQUFDO1FBQ3ZCRyxTQUFTLEdBQUcsSUFBSTtRQUNoQjtNQUNKLENBQUMsTUFBTSxJQUFJRyxTQUFTLENBQUNwRyxLQUFLLENBQUNxRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25EO1FBQ0EsSUFBSUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7VUFDbEJELFNBQVMsQ0FBQ3hELGFBQWEsQ0FBQyxDQUFDeUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVuQyxTQUFTLENBQUM7VUFDMURTLFVBQVUsQ0FBQyxDQUFDO1VBQ1osSUFBSWpGLG1EQUFXLENBQUN3RSxTQUFTLEVBQUVtQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUVBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM5Q04sVUFBVSxDQUFDRCxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBQ3ZCO1VBQ0osQ0FBQyxNQUFNO1lBQ0hDLFVBQVUsQ0FBQyxNQUFNQyxVQUFVLENBQUNFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ3JEO1VBQ0o7UUFDSixDQUFDLE1BQU07VUFDSEQsU0FBUyxHQUFHLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ2hDN0IsWUFBWSxDQUFDLENBQUM7VUFDZDtRQUNKO01BQ0osQ0FBQyxNQUFNO1FBQ0g0QixTQUFTLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEM3QixZQUFZLENBQUMsQ0FBQztRQUNkO01BQ0o7SUFDSjtFQUNKO0VBQ0EsSUFBSTVELGtEQUFVLENBQUMyRixTQUFTLENBQUNwRyxLQUFLLEVBQUVQLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUU7SUFDbkM7SUFDQTtJQUNBO0lBQ0EsSUFBSUMsQ0FBQyxHQUFHeUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQ2RDLEtBQUssR0FBR2xGLCtDQUFPLENBQUNtRixTQUFTLENBQUNwRyxLQUFLLEVBQUVQLENBQUMsRUFBRUQsQ0FBQyxDQUFDO01BQ3RDLElBQUkyRyxLQUFLLENBQUM5RSxNQUFNLEtBQUssQ0FBQyxFQUFDO1FBQ25CMEUsVUFBVSxDQUFDLE1BQU1DLFVBQVUsQ0FBQ0UsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDckQ7TUFDSjtNQUNBLE1BQU1HLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUMxQkYsU0FBUyxDQUFDeEQsYUFBYSxDQUFDeUQsSUFBSSxFQUFFbkMsU0FBUyxDQUFDO01BQ3hDUyxVQUFVLENBQUMsQ0FBQztNQUNaLElBQUlqRixtREFBVyxDQUFDd0UsU0FBUyxFQUFFbUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQ3RELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQ3hDK0MsVUFBVSxDQUFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ3hCRyxTQUFTLEdBQUcsSUFBSTtRQUNoQjtNQUNKLENBQUMsTUFBTSxJQUFJRyxTQUFTLENBQUNwRyxLQUFLLENBQUNxRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25EO1FBQ0FOLFVBQVUsQ0FBQyxNQUFNQyxVQUFVLENBQUNLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ25EO01BQ0osQ0FBQyxNQUFNO1FBQ0hoQyxZQUFZLENBQUMsQ0FBQztRQUNkO01BQ0o7SUFDSixDQUFDLE1BQU07TUFDSDhCLEtBQUssR0FBR25GLGdEQUFRLENBQUNvRixTQUFTLENBQUNwRyxLQUFLLEVBQUVQLENBQUMsRUFBRUQsQ0FBQyxDQUFDO01BQ3ZDLElBQUkyRyxLQUFLLENBQUM5RSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3BCMEUsVUFBVSxDQUFDLE1BQU1DLFVBQVUsQ0FBQ0UsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDckQ7TUFDSjtNQUNBLE1BQU1HLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUMxQkYsU0FBUyxDQUFDeEQsYUFBYSxDQUFDeUQsSUFBSSxFQUFFbkMsU0FBUyxDQUFDO01BQ3hDUyxVQUFVLENBQUMsQ0FBQztNQUNaLElBQUlqRixtREFBVyxDQUFDd0UsU0FBUyxFQUFFbUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQ3RELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQ3hDK0MsVUFBVSxDQUFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ3hCRyxTQUFTLEdBQUcsSUFBSTtRQUNoQjtNQUNKLENBQUMsTUFBTSxJQUFJRyxTQUFTLENBQUNwRyxLQUFLLENBQUNxRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25EO1FBQ0EsSUFBSUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7VUFDbEJELFNBQVMsQ0FBQ3hELGFBQWEsQ0FBQyxDQUFDeUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVuQyxTQUFTLENBQUM7VUFDMURTLFVBQVUsQ0FBQyxDQUFDO1VBQ1osSUFBSWpGLG1EQUFXLENBQUN3RSxTQUFTLEVBQUVtQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5Q04sVUFBVSxDQUFDRCxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBQ3ZCO1VBQ0osQ0FBQyxNQUFNO1lBQ0hDLFVBQVUsQ0FBQyxNQUFNQyxVQUFVLENBQUNFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ3JEO1VBQ0o7UUFDSixDQUFDLE1BQU07VUFDSEQsU0FBUyxHQUFHLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ2hDN0IsWUFBWSxDQUFDLENBQUM7VUFDZDtRQUNKO01BRUosQ0FBQyxNQUFNO1FBQ0g0QixTQUFTLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEM3QixZQUFZLENBQUMsQ0FBQztRQUNkO01BQ0o7SUFDSjtFQUNKO0VBQ0F0QixPQUFPLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDbkIsTUFBTXVELENBQUMsR0FBR3hHLDBEQUFrQixDQUFDcUcsU0FBUyxDQUFDcEcsS0FBSyxFQUFFUCxDQUFDLEVBQUVELENBQUMsQ0FBQztFQUNuRCxNQUFNNkcsSUFBSSxHQUFHRSxDQUFDLENBQUNELEtBQUssQ0FBQyxDQUFDO0VBRXRCRixTQUFTLENBQUN4RCxhQUFhLENBQUN5RCxJQUFJLEVBQUVuQyxTQUFTLENBQUM7RUFDeENTLFVBQVUsQ0FBQyxDQUFDO0VBRVosSUFBSWpGLG1EQUFXLENBQUN3RSxTQUFTLEVBQUVtQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUVBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzFDO0lBQ0F0RCxPQUFPLENBQUNDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztJQUMzQytDLFVBQVUsQ0FBQ0QsTUFBTSxFQUFFLEdBQUcsQ0FBQztJQUN2QkcsU0FBUyxHQUFHLElBQUk7RUFDcEIsQ0FBQyxNQUFNLElBQUlHLFNBQVMsQ0FBQ3BHLEtBQUssQ0FBQ3FHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDbkQ7SUFDQUgsS0FBSyxHQUFHLENBQUN6RyxDQUFDLEVBQUVELENBQUMsQ0FBQztJQUNkdUcsVUFBVSxDQUFDLE1BQU1DLFVBQVUsQ0FBQ0ssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDdkQsQ0FBQyxNQUFNO0lBQ0g7SUFDQUosU0FBUyxHQUFHLENBQUN4RyxDQUFDLEVBQUVELENBQUMsQ0FBQztJQUNsQjZFLFlBQVksQ0FBQyxDQUFDO0VBQ2xCO0FBQ0o7QUFHQSxTQUFTdUIsVUFBVUEsQ0FBQSxFQUFHO0VBQ2xCLElBQUl4QixZQUFZLEtBQUssQ0FBQyxFQUFFO0lBQ3BCaUIsUUFBUSxDQUFDLENBQUM7RUFDZCxDQUFDLE1BQU0sSUFBSWpCLFlBQVksS0FBSyxDQUFDLElBQUk2QixTQUFTLEVBQUU7SUFDeENGLFVBQVUsQ0FBQyxNQUFNQyxVQUFVLENBQUNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQ2pFLENBQUMsTUFBTTtJQUNIRixVQUFVLENBQUNELE1BQU0sRUFBRSxHQUFHLENBQUM7RUFDM0I7QUFDSjtBQUVBLFNBQVNVLE9BQU9BLENBQUEsRUFBRztFQUNmekMsVUFBVSxDQUFDdUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDN0N4QixNQUFNLENBQUMyQyxLQUFLLENBQUMsQ0FBQztJQUNkeEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDdEMsU0FBUyxDQUFDLENBQUM7SUFDdEJzQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUN0QyxTQUFTLENBQUMsQ0FBQztJQUV0QnNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3hCLFVBQVUsQ0FBQ3lCLFNBQVMsQ0FBQztJQUNoQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDeEIsVUFBVSxDQUFDMEIsT0FBTyxDQUFDO0lBRTlCdUMsZ0JBQWdCLENBQUMsQ0FBQztFQUN0QixDQUFDLENBQUM7QUFDTjtBQUVBLFNBQVNyRSxNQUFNQSxDQUFBLEVBQUc7RUFDZDJCLFNBQVMsQ0FBQ3NCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQzVDckIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDdEMsU0FBUyxDQUFDLENBQUM7SUFDdEJzQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUN0QyxTQUFTLENBQUMsQ0FBQztJQUV0QnNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ2QsVUFBVSxDQUFDZSxTQUFTLENBQUM7SUFDaENELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ2QsVUFBVSxDQUFDZ0IsT0FBTyxDQUFDO0lBRTlCRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUN4QixVQUFVLENBQUN5QixTQUFTLENBQUM7SUFDaENELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3hCLFVBQVUsQ0FBQzBCLE9BQU8sQ0FBQztJQUM5QnVDLGdCQUFnQixDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0FBQ047QUFFQUYsT0FBTyxDQUFDLENBQUM7QUFDVG5FLE1BQU0sQ0FBQyxDQUFDO0FBRUQsU0FBU3FFLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQy9CL0IsVUFBVSxDQUFDLENBQUM7RUFDWlEsUUFBUSxDQUFDLENBQUM7RUFDVlMsVUFBVSxDQUFDLENBQUM7QUFDaEI7QUFFQSxpRUFBZWMsZ0JBQWdCOzs7Ozs7VUN2WC9CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQWE7O0FBRWM7QUFFbUI7QUFFOUNBLHlEQUFnQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy9haS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvc3R5bGUvc3R5bGUuY3NzP2M5ZjAiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvdWkubWpzIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2VzbGludC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLy9UaGUgYWxnb3JpdGhtIGlzIHF1aXRlIHN0cmFpZ2h0Zm9yd2FyZCwgd2hlbiBwYyBzaG9vdHMsIHdlIGNoZWNrIGlmIHRoaXMgc2hvdCB3YXMgYSBoaXQgKGNoYW5naW5nIHRoZSBjZWxsIGZyb20gZW1wdHkgdG8g8J+Soilcbi8vIElmIHllcywgd2UgY2hlY2sgaWYgdGhlIHNoaXAgd2FzIHN1bmsgLSBieSBjaGVja2luZyB0aGlzIHNoaXAgaW4gdXNlclNoaXBzIG9iamVjdCAoV2UgaGF2ZSBhY2Nlc3MgdG8gYWxsIHNoaXBzIGFuZCB0aGVpclxuLy8gaXNTdW5rKCkgcHJvcGVydHksIHdlIGNhbiBmaW5kIHRoZSBzaGlwIHdlIGhpdCBieSBjb29yZGluYXRlcyBhbmQgdGhlbiBjaGVjayB0aGlzIHByb3BlcnR5LiBUaGlzIGlzIGNoZWF0aW5nLCBidXQgSSBoYXZlbid0XG4vLyBmb3VuZCBhIGJldHRlciBzb2x1dGlvbikuIElmIHRoZSBjb21wdXRlciBpcyBoaXQgYW5kIGlzU3VuaygpID0gZmFsc2UsIHRoZW4gdGhlIHNoaXAgc2l6ZSBpcyBncmVhdGVyIHRoYW4gMSBhbmQgd2UgcnVuIHRoZVxuLy8gVGFyZ2V0RmlyZSBmdW5jdGlvbiB3aGljaCB3aWxsIHdvcmsgdW50aWwgaXQgZmxvb2RzIHRoZSBzaGlwLiBGaXJzdCBvZiBhbGwgaXQgc2hvb3RzIGluIDQgZGlyZWN0aW9ucywgaWYgaXQgbWlzc2VzIHRoZW4gdGhlXG4vLyByaWdodCB0byBtb3ZlIGdvZXMgdG8gdGhlIHBsYXllciwgYnV0IHdlIHNhdmUgdGhlIGxhc3QgY29vcmRpbmF0ZSBvZiB0aGUgaGl0IGFuZCBvbiB0aGUgbmV4dCBtb3ZlIHRoZSBjb21wdXRlciBzaG9vdHMgaW4gYW5vdGhlclxuLy8gZGlyZWN0aW9uLCB3aGVuIHRoZSBjb21wdXRlciBoaXRzIHdlIGNoZWNrIGlmIGl0IGlzIHN1bmsgb3Igbm90LCBpZiB5ZXMgdGhlbiB3ZSBydW4gdGhlIHVzdWFsIHBjRmlyZSBmdW5jdGlvbiB3aGljaCBzaG9vdHMgYXQgcmFuZG9tXG4vLyBjb29yZGluYXRlcywgaWYgcGMgaGl0IGJ1dCB0aGUgc2hpcCBpcyBub3Qgc3VuayB0aGVuIHRoZSBzaGlwIHNpemUgaXMgZ3JlYXRlciB0aGFuIDIgYW5kIHdlIGNhbiBmaW5kIG91dCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBzaGlwXG4vLyBob3JpeiBvciB2ZXJ0LiBOb3cgd2UganVzdCBjb21wYXJlIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgbGFzdCBoaXQgYW5kIGlmIHRoZSBsYXN0IGhpdCBpcyBiaWdnZXIgdGhhbiB0aGUgc3RhcnRpbmcgb25lIHRoZW4gd2Ugc2hvb3Rcbi8vIG9ubHkgdG8gdGhlIHJpZ2h0IGhvcml6b250YWxseSwgb3RoZXJ3aXNlIHRvIHRoZSBsZWZ0IGFuZCBzbyB3ZSByZXBlYXQgaXQuXG5cblxubGV0IG1haW5TcXVhcmVzID0gW1xuICAgIFswLCAtMV0sXG4gICAgWzAsIDFdLFxuICAgIFsxLCAwXSxcbiAgICBbLTEsIDBdLFxuXVxuXG5sZXQgaG9yaXpTcXVhcmVzID0gW1xuICAgIFswLCAtMV0sXG4gICAgWzAsIDFdLFxuXVxuXG5sZXQgdmVydFNxdWFyZXMgPSBbXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMF0sXG5dXG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRhcmllcyhbeCwgeV0pIHtcbiAgICByZXR1cm4gKHggPj0gMCAmJiB4IDwgMTApICYmICh5ID49IDAgJiYgeSA8IDEwKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpcFdhc1N1bmsoc2hpcHMsIHksIHgpIHtcbiAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgIGZvciAobGV0IGNvb3JkcyBvZiBzaGlwc1tzaGlwXS5jb29yZHMpIHtcbiAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPT09IHkgJiYgY29vcmRzWzFdID09PSB4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBzW3NoaXBdLmlzU3VuaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZU1haW5EaXJlY3Rpb25zKGJvYXJkLCB5LCB4KSB7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgbWFpblNxdWFyZXMpIHtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dO1xuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBJc0hvcml6KGJvYXJkLCB5LCB4KSB7XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIGhvcml6U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpcElzVmVydChib2FyZCwgeSwgeCkge1xuICAgIGZvciAobGV0IHNxdWFyZSBvZiB2ZXJ0U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5sZXQgbGVmdFNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMCwgLTJdLFxuXVxuXG5sZXQgcmlnaHRTcXVhcmVzID0gW1xuICAgIFswLCAxXSxcbiAgICBbMCwgMl0sXG5dXG5cbmxldCBkb3duU3F1YXJlcyA9IFtcbiAgICBbLTEsIDBdLFxuICAgIFstMiwgMF0sXG5dXG5cbmxldCB0b3BTcXVhcmVzID0gW1xuICAgIFsxLCAwXSxcbiAgICBbMiwgMF0sXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlTGVmdChib2FyZCwgeSwgeCkge1xuICAgIGJvYXJkID0gYm9hcmQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKSBjZWxsID0gJyAnO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9KSk7XG4gICAgbGV0IG91dHB1dCA9IFtdXG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIGxlZnRTcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXVxuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZVJpZ2h0KGJvYXJkLCB5LCB4KSB7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgcmlnaHRTcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXVxuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZURvd24oYm9hcmQsIHksIHgpIHtcbiAgICBib2FyZCA9IGJvYXJkLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgaWYgKGNlbGwgPT09ICcjJykgY2VsbCA9ICcgJztcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfSkpO1xuICAgIGxldCBvdXRwdXQgPSBbXVxuICAgIGZvciAobGV0IHNxdWFyZSBvZiBkb3duU3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVUb3AoYm9hcmQsIHksIHgpIHtcbiAgICBib2FyZCA9IGJvYXJkLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgaWYgKGNlbGwgPT09ICcjJykgY2VsbCA9ICcgJztcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfSkpO1xuICAgIGxldCBvdXRwdXQgPSBbXVxuICAgIGZvciAobGV0IHNxdWFyZSBvZiB0b3BTcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXVxuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7c2hpcFdhc1N1bmssIGZpcmVNYWluRGlyZWN0aW9ucywgc2hpcElzVmVydCwgc2hpcElzSG9yaXosIGZpcmVMZWZ0LCBmaXJlUmlnaHQsIGZpcmVUb3AsIGZpcmVEb3dufSIsIlwidXNlIHN0cmljdFwiO1xuXG5cbmxldCBzdXJyb3VuZGluZ1NxdWFyZXMgPSBbXG4gICAgWzEsIC0xXSxcbiAgICBbMCwgLTFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAwXSxcbiAgICBbLTEsIDBdLFxuICAgIFsxLCAxXSxcbiAgICBbMCwgMV0sXG4gICAgWy0xLCAxXSxcbl1cbi8vIGp1c3QgY29weSBhcnJheSBhYm92ZSB3aXRoIC5zbGljZSBhbmQgcHVzaCBvbmUgbW9yZSBzcXVhcmUgWzAsMF0gZm9yIGNoZWNrSWZOb3RFbXB0eSBmdW5jdGlvblxubGV0IHBvc3NpYmxlU3F1YXJlcyA9IHN1cnJvdW5kaW5nU3F1YXJlcy5zbGljZSgwLCBzdXJyb3VuZGluZ1NxdWFyZXMubGVuZ3RoKVxucG9zc2libGVTcXVhcmVzLnB1c2goWzAsIDBdKVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kYXJpZXMoW3gsIHldKSB7XG4gICAgcmV0dXJuICh4ID49IDAgJiYgeCA8IDEwKSAmJiAoeSA+PSAwICYmIHkgPCAxMClcbn1cblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMucm93cyA9IHNpemU7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IHNpemU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5maWxsQm9hcmQoKTsgLy8gZmlsbGluZyBib2FyZCBhZnRlciBpbml0aWFsaXphdGlvblxuICAgIH1cblxuICAgIGZpbGxCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaCgnICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tQ29vcmRzKHNoaXApIHtcbiAgICAgICAgbGV0IHJhbmRvbVk7XG4gICAgICAgIGxldCByYW5kb21YO1xuICAgICAgICBsZXQgbG9vcHMgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBzbWFsbCBvcHRpbWl6YXRpb24gb2YgZmluZGluZyBjb29yZHNcbiAgICAgICAgICAgIGxvb3BzICs9IDE7XG4gICAgICAgICAgICBpZiAobG9vcHMgPiAyMCl7XG4gICAgICAgICAgICAgICAgc2hpcC5kaXJlY3Rpb24gPSBzaGlwLmRpcmVjdGlvbiA9PT0gMCA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIGxvb3BzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkgeyAvLyBob3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5yb3dzKTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuY29sdW1ucyAtIHNoaXAubGVuZ3RoKSk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLnJvd3MgLSBzaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgd2UgY2FuJ3QgcHV0IG91ciBzaGlwIGluIHJhbmdlIG9mIChzaXplIG9mIGNvbHVtbnMgLSBzdGFydCBjb29yZGluYXRlIG9mIHNoaXApLCB0aGVuIHdlIGdlbmVyYXRlIG5ldyBjb29yZHNcbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbiBwdXQgb3VyIHNoaXAgaW4gdGhpcyByYW5nZSwgYnV0IGlmIGluIHJhbmdlIG9mIC0xIHRvICsxIHNxdWFyZXMgaXMgb3VyIG5laWdoYm91ciBzaGlwLCB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgIH0gd2hpbGUgKCEodGhpcy5jaGVja0lmTm90RW1wdHkoc2hpcCwgcmFuZG9tWSwgcmFuZG9tWCkpKVxuXG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7IC8vIGhvcml6XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3F1YXJlIG9mIHBvc3NpYmxlU3F1YXJlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbcmFuZG9tWSArIHNxdWFyZVswXSwgaiArIHNxdWFyZVsxXV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxseVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmRvbVk7IGkgPCByYW5kb21ZICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW2kgKyBzcXVhcmVbMF0sIHJhbmRvbVggKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyYW5kb21ZLCByYW5kb21YXTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tWSwgcmFuZG9tWCkge1xuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIHBsYWNpbmcgc2hpcCAtPiBob3Jpem9udGFsbHlcbiAgICAgICAgICAgIGZvciAobGV0IGogPSByYW5kb21YOyBqIDwgcmFuZG9tWCArIHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3JhbmRvbVldW2pdID0gJyMnO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbcmFuZG9tWSwgal0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBub3cgd2UgcGxhY2Ugc2hpcCB2ZXJ0aWNhbGx5LCBzbyB3ZSBpdGVyYXRlIG9ubHkgaW4gcm93c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmRvbVk7IGkgPCByYW5kb21ZICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bcmFuZG9tWF0gPSAnIyc7XG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtpLCByYW5kb21YXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwLmNvb3JkcyA9IHNoaXBDb29yZHM7XG4gICAgfVxuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uXG4gICAgcGxhY2VTaGlwcyhzaGlwcyl7XG4gICAgICAgIGxldCBob3JpelN1bSA9IDBcbiAgICAgICAgbGV0IHZlcnRTdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKXtcbiAgICAgICAgICAgIGlmIChzaGlwc1tzaGlwXS5kaXJlY3Rpb24gPT09IDAgKSBob3JpelN1bSArPSBzaGlwc1tzaGlwXS5sZW5ndGhcbiAgICAgICAgICAgIGVsc2UgdmVydFN1bSArPSBzaGlwc1tzaGlwXS5sZW5ndGhcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLmRpcmVjdGlvbiA9IGhvcml6U3VtID4gOCA/IDEgOiAwXG4gICAgICAgICAgICBsZXQgW3ksIHhdID0gdGhpcy5nZXRSYW5kb21Db29yZHMoc2hpcHNbc2hpcF0pXG4gICAgICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwc1tzaGlwXSwgeSwgeClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRzLCBzaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9PT0gJ/CfmqsnIHx8XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9PT0gJ/CfkqInXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0ZW1wb3Jhcnkgc3R1YlxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvb3JkcyBvZiBzaGlwc1tzaGlwXS5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgYXR0YWNrQ29vcmRzWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbc2hpcF0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfkqInXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNoaXAgJHtzaGlwfSB3YXMgc3VuayFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlU3Vycm91bmRpbmdXYXRlcihzaGlwc1tzaGlwXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPSAn8J+aqydcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gc2hpcC5jb29yZHNbaV1cbiAgICAgICAgICAgIGZvciAobGV0IHN1cnJDb29yZHMgb2Ygc3Vycm91bmRpbmdTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbMCwgKzFdLCBbMCwgLTFdXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbKzEsIDBdLCBbLTEsIDBdXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAxKSAmJiBpICE9PSBzaGlwLmNvb3Jkcy5sZW5ndGggLSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAwICYmIHN1cnJDb29yZHNbMV0gPT09IC0xKSAmJiBpICE9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gLTEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtjb29yZHNbMF0gKyBzdXJyQ29vcmRzWzBdLCBjb29yZHNbMV0gKyBzdXJyQ29vcmRzWzFdXVxuICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID0gJ/CfmqsnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHJlc2V0U2hpcHMoc2hpcHMpe1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKXtcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLnJlc2V0SGl0cygpO1xuICAgICAgICAgICAgc2hpcHNbc2hpcF0ucmVzZXRDb29yZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdhbWVPdmVyKHNoaXBzKSB7XG4gICAgICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIGlmICghc2hpcHNbc2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0U2hpcHMoc2hpcHMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIpXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlc2V0SGl0cygpIHtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICB9XG4gICAgcmVzZXRDb29yZHMoKSB7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgfVxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGhcbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG59XG5cbmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XG59XG5cbmgxIHtcbiAgICBjb2xvcjogcm95YWxibHVlO1xufVxuXG4ubmFtZXMge1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBjb2xvcjogcm95YWxibHVlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmJvYXJkIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICB3aWR0aDogMzQwcHg7XG4gICAgaGVpZ2h0OiAzNDBweDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xufVxuXG4udXNlci1ib2FyZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDQ4cHg7XG59XG5cbi51c2VyIHtcbiAgICBtYXJnaW4tbGVmdDogY2FsYygyNHB4ICsgMTcwcHgpO1xufVxuXG4ucGMtYm9hcmQge1xuICAgIG1hcmdpbi1yaWdodDogNDhweDtcbn1cblxuLnBjLCAuZXJyb3Ige1xuICAgIG1hcmdpbi1yaWdodDogY2FsYygyNHB4ICsgMTcwcHgpO1xufVxuXG4uY2VsbCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBvcmFuZ2U7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnBjLWJvYXJkID4gLmNlbGw6aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg4MCUpO1xufVxuXG4uZmlyZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnN1cnJvdW5kZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5lcnJvciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC1zaXplOiA4MCU7XG59XG5cbmRpYWxvZyB7XG4gICAgd2lkdGg6IDEwMDBweDtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBlZWYxO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cblxuZGlhbG9nOjpiYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgb3BhY2l0eTogMC44O1xufVxuXG4uZGlhbG9nLWNvbnRlbnQge1xuICAgIGhlaWdodDogMTQ1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMjRweDtcbn1cblxuLmRpYWxvZy1jb250ZW50ID4gcCB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLnJlc3RhcnQsIC5yYW5kb20ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4xNXMgZWFzZS1pbi1vdXQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucmVzdGFydCB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBmb250LXNpemU6IDEuNzVyZW07XG4gICAgd2lkdGg6IDE2MHB4O1xufVxuXG5idXR0b246aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg5MCUpO1xufVxuXG4ucmFuZC1wb3NpdGlvbiB7XG4gICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cblxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLFlBQVk7SUFDWiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLGFBQWE7SUFDYixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLG9DQUFvQztJQUNwQyxlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgbWFyZ2luLWJvdHRvbTogNDhweDtcXG59XFxuXFxuaDEge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbn1cXG5cXG4ubmFtZXMge1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGNvbG9yOiByb3lhbGJsdWU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgd2lkdGg6IDM0MHB4O1xcbiAgICBoZWlnaHQ6IDM0MHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIHBhZGRpbmc6IDJweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcbn1cXG5cXG4udXNlci1ib2FyZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA0OHB4O1xcbn1cXG5cXG4udXNlciB7XFxuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDI0cHggKyAxNzBweCk7XFxufVxcblxcbi5wYy1ib2FyZCB7XFxuICAgIG1hcmdpbi1yaWdodDogNDhweDtcXG59XFxuXFxuLnBjLCAuZXJyb3Ige1xcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoMjRweCArIDE3MHB4KTtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBjLWJvYXJkID4gLmNlbGw6aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcXG59XFxuXFxuLmZpcmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3Vycm91bmRlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5lcnJvciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGNvbG9yOiByZWQ7XFxuICAgIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG5kaWFsb2cge1xcbiAgICB3aWR0aDogMTAwMHB4O1xcbiAgICBoZWlnaHQ6IDE0NXB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBlZWYxO1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG5kaWFsb2c6OmJhY2tkcm9wIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLmRpYWxvZy1jb250ZW50IHtcXG4gICAgaGVpZ2h0OiAxNDVweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMjRweDtcXG59XFxuXFxuLmRpYWxvZy1jb250ZW50ID4gcCB7XFxuICAgIGNvbG9yOiByb3lhbGJsdWU7XFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4ucmVzdGFydCwgLnJhbmRvbSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2UtaW4tb3V0O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5yZXN0YXJ0IHtcXG4gICAgcGFkZGluZzogMTZweDtcXG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xcbiAgICB3aWR0aDogMTYwcHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg5MCUpO1xcbn1cXG5cXG4ucmFuZC1wb3NpdGlvbiB7XFxuICAgIG1hcmdpbi10b3A6IDI0cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQge1xuICAgIGZpcmVNYWluRGlyZWN0aW9ucyxcbiAgICBzaGlwSXNWZXJ0LFxuICAgIHNoaXBJc0hvcml6LFxuICAgIHNoaXBXYXNTdW5rLFxuICAgIGZpcmVSaWdodCxcbiAgICBmaXJlTGVmdCxcbiAgICBmaXJlVG9wLFxuICAgIGZpcmVEb3duXG59IGZyb20gXCIuL2FpLmpzXCI7XG5cbmNvbnN0IGVycm9yTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpXG5jb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQnKVxuY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbScpXG5cbmNvbnN0IHBsYXllcnMgPSB7XG4gICAgMDogbmV3IEdhbWVib2FyZCgxMCksXG4gICAgMTogbmV3IEdhbWVib2FyZCgxMCksXG59XG5cbi8vIEkgd2lsbCB0cnkgdG8gbWFrZSBhbiBhbGdvcml0aG0gbGF0ZXIgdG8gbWFrZSB0aGUgY29vcmRpbmF0ZSBzZWFyY2ggd29yayBmb3IgYWxsIHNoaXBzXG4vLyBzbyBmYXIgaXQgd29ya3Mgb25seSBpZiB5b3UgZXhjbHVkZSBTaGlwIHdpdGggc2l6ZSAxIGFuZCAyXG5jb25zdCB1c2VyU2hpcHMgPSB7XG4gICAgLy8gJzEnOiBuZXcgU2hpcCgxKSxcbiAgICAnMic6IG5ldyBTaGlwKDEpLFxuICAgICczJzogbmV3IFNoaXAoMSksXG4gICAgJzQnOiBuZXcgU2hpcCgxKSxcbiAgICAvLyAnNSc6IG5ldyBTaGlwKDIpLFxuICAgICc2JzogbmV3IFNoaXAoMiksXG4gICAgJzcnOiBuZXcgU2hpcCgyKSxcbiAgICAnOCc6IG5ldyBTaGlwKDMpLFxuICAgICc5JzogbmV3IFNoaXAoMyksXG4gICAgJzEwJzogbmV3IFNoaXAoNCksXG59XG5cbmNvbnN0IHBjU2hpcHMgPSB7XG4gICAgLy8gJzEnOiBuZXcgU2hpcCgxKSxcbiAgICAnMic6IG5ldyBTaGlwKDEpLFxuICAgICczJzogbmV3IFNoaXAoMSksXG4gICAgJzQnOiBuZXcgU2hpcCgxKSxcbiAgICAvLyAnNSc6IG5ldyBTaGlwKDIpLFxuICAgICc2JzogbmV3IFNoaXAoMiksXG4gICAgJzcnOiBuZXcgU2hpcCgyKSxcbiAgICAnOCc6IG5ldyBTaGlwKDMpLFxuICAgICc5JzogbmV3IFNoaXAoMyksXG4gICAgJzEwJzogbmV3IFNoaXAoNCksXG59XG5cbmxldCBhY3RpdmVQbGF5ZXIgPSAwO1xuXG5mdW5jdGlvbiBjaGFuZ2VQbGF5ZXIoKSB7XG4gICAgcmV0dXJuIGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xufVxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwcyh1c2VyU2hpcHMpXG5cbmNoYW5nZVBsYXllcigpXG5cbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXBzKHBjU2hpcHMpXG5cbmNoYW5nZVBsYXllcigpO1xuXG5mdW5jdGlvbiBnYW1lT3Zlck1vZGFsKHRleHQpIHtcbiAgICBjb25zdCBjb25ncmF0dWxhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZ3JhdHVsYXRpb25zJylcbiAgICBjb25ncmF0dWxhdGlvbnMudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbn1cblxuZnVuY3Rpb24gdXNlclJlbmRlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfkqInKSBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+aqycpIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIGVsc2UgYnRuLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBjUmVuZGVyKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBjLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1sxXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgYnRuLmRhdGFzZXQueSA9IGAke2l9YDtcbiAgICAgICAgICAgIGJ0bi5kYXRhc2V0LnggPSBgJHtqfWA7XG4gICAgICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5qrJykge1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIH0gZWxzZSBidG4uY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICAvLyBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGJ0bilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlyZVVzZXIoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGMtYm9hcmQnKVxuICAgIGJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrSGFuZGxlcilcbn1cblxuZnVuY3Rpb24gYXR0YWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuZGF0YXNldC55ICYmIGV2ZW50LnRhcmdldC5kYXRhc2V0LnggJiYgYWN0aXZlUGxheWVyID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMV1cbiAgICAgICAgY29uc3Qgc3F1YXJlWSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgICAgIGNvbnN0IHNxdWFyZVggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgICAgICBpZiAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFsrc3F1YXJlWSwgK3NxdWFyZVhdLCBwY1NoaXBzKSkgeyAvLyBpZiB0aGlzIHNxdWFyZSB3YXMgYXR0YWNrZWQgYWxyZWFkeVxuICAgICAgICAgICAgZXJyb3JNc2cudGV4dENvbnRlbnQgPSBgKlNxdWFyZSAke1tzcXVhcmVZLCBzcXVhcmVYXX0gYWxyZWFkeSB3YXMgYXR0YWNrZWQhYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgbGV0IHBjIGZpcmUsIGlmIG91ciBsYXN0IGF0dGFja2VkIHNxdWFyZSB3YXMgYSBoaXRcbiAgICAgICAgICAgIGlmIChhY3RpdmUuYm9hcmRbK3NxdWFyZVldWytzcXVhcmVYXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLnJlY2VpdmVBdHRhY2soWytzcXVhcmVZLCArc3F1YXJlWF0sIHBjU2hpcHMpXG4gICAgICAgICAgICAgICAgcGNSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlLmdhbWVPdmVyKHBjU2hpcHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVPdmVyTW9kYWwoJ0NvbmdyYXR1bGF0aW9ucyB3aXRoIHZpY3RvcnkhJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBwY1JlbmRlcigpO1xuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICBoYW5kbGVGaXJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufVxuXG5mdW5jdGlvbiBwY0ZpcmUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBsZXQgeSwgeDtcbiAgICBkbyB7XG4gICAgICAgIFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgfSB3aGlsZSAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFt5LCB4XSwgdXNlclNoaXBzKSk7XG4gICAgaWYgKGFjdGl2ZS5nYW1lT3Zlcih1c2VyU2hpcHMpKSB7XG4gICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgZ2FtZU92ZXJNb2RhbChgUEMgd29uIWApXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFjdGl2ZS5ib2FyZFt5XVt4XSA9PT0gJ/CfkqInKSB7IC8vIGlmIHBjIGhpdHMgdXNlcidzIHNoaXBcbiAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgeSwgeCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHksIHgpLCA1MDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXNlclJlbmRlcigpO1xuICAgIGNoYW5nZVBsYXllcigpO1xufVxuXG5sZXQgdG1wU3F1YXJlID0gbnVsbDtcbmxldCBzdGFydCA9IG51bGw7XG5sZXQgcXVldWUgPSBbXVxuXG5mdW5jdGlvbiB0YXJnZXRGaXJlKHksIHgpIHtcblxuICAgIGNvbnN0IGdhbWVCb2FyZCA9IHBsYXllcnNbMF1cblxuICAgIGlmIChzaGlwSXNIb3JpeihnYW1lQm9hcmQuYm9hcmQsIHksIHgpKSB7XG4gICAgICAgIC8vIGFmdGVyIGhhbmRsaW5nIHNoaXAgb2Ygc2l6ZSAyLCB3ZSBkZXRlcm1pbmVkIHRoYXQgc2hpcCBzaXplIGlzID4gMlxuICAgICAgICAvLyBub3cgd2Ugd2lsbCBoYW5kbGUgdGhpcyBzaGlwLCBpZiB0aGF0IHNoaXAgaXMgaG9yaXpvbnRhbFxuICAgICAgICAvLyBjb21wYXJlIG9ubHkgaG9yaXpvbnRhbCBjb29yZHNcbiAgICAgICAgaWYgKHggPj0gc3RhcnRbMV0pIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZVJpZ2h0KGdhbWVCb2FyZC5ib2FyZCwgeSwgeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gM1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShuZXh0WzBdLCBuZXh0WzFdKSwgNTAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVldWUgPSBmaXJlTGVmdChnYW1lQm9hcmQuYm9hcmQsIHksIHgpXG4gICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKG5leHQsIHVzZXJTaGlwcyk7XG4gICAgICAgICAgICB1c2VyUmVuZGVyKCk7XG4gICAgICAgICAgICBpZiAoc2hpcFdhc1N1bmsodXNlclNoaXBzLCBuZXh0WzBdLCBuZXh0WzFdKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIHdpdGggc2l6ZSAzIHdhcyBzdW5rJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgNTAwKTtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW25leHRbMF1dW25leHRbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDNcbiAgICAgICAgICAgICAgICBpZiAobmV4dFsxXSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbbmV4dFswXSwgbmV4dFsxXSAtIDFdLCB1c2VyU2hpcHMpXG4gICAgICAgICAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShzdGFydFswXSwgc3RhcnRbMV0pLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wU3F1YXJlID0gW3N0YXJ0WzBdLCBzdGFydFsxXV1cbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IFtzdGFydFswXSwgc3RhcnRbMV1dXG4gICAgICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwSXNWZXJ0KGdhbWVCb2FyZC5ib2FyZCwgeSwgeCkpIHtcbiAgICAgICAgLy8gYWZ0ZXIgaGFuZGxpbmcgc2hpcCBvZiBzaXplIDIsIHdlIGRldGVybWluZWQgdGhhdCBzaGlwIHNpemUgaXMgPiAyXG4gICAgICAgIC8vIG5vdyB3ZSB3aWxsIGhhbmRsZSB0aGlzIHNoaXAsIGlmIHRoYXQgc2hpcCBpcyB2ZXJ0aWNhbFxuICAgICAgICAvLyBjb21wYXJlIG9ubHkgdmVydGljYWwgY29vcmRzXG4gICAgICAgIGlmICh5ID4gc3RhcnRbMF0pIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZVRvcChnYW1lQm9hcmQuYm9hcmQsIHksIHgpO1xuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCAxMDAwKTtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW25leHRbMF1dW25leHRbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEZpcmUobmV4dFswXSwgbmV4dFsxXSksIDUwMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZURvd24oZ2FtZUJvYXJkLmJvYXJkLCB5LCB4KVxuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShzdGFydFswXSwgc3RhcnRbMV0pLCA1MDApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhuZXh0LCB1c2VyU2hpcHMpO1xuICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCB3aXRoIHNpemUgMyB3YXMgc3VuaycpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDEwMDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gM1xuICAgICAgICAgICAgICAgIGlmIChuZXh0WzBdIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFtuZXh0WzBdIC0gMSwgbmV4dFsxXV0sIHVzZXJTaGlwcylcbiAgICAgICAgICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcFdhc1N1bmsodXNlclNoaXBzLCBuZXh0WzBdIC0gMSwgbmV4dFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBbc3RhcnRbMF0sIHN0YXJ0WzFdXVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBbc3RhcnRbMF0sIHN0YXJ0WzFdXVxuICAgICAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgY29uc3QgcSA9IGZpcmVNYWluRGlyZWN0aW9ucyhnYW1lQm9hcmQuYm9hcmQsIHksIHgpXG4gICAgY29uc3QgbmV4dCA9IHEuc2hpZnQoKTtcblxuICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKG5leHQsIHVzZXJTaGlwcyk7XG4gICAgdXNlclJlbmRlcigpO1xuXG4gICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgLy8gc2hpcCBzaXplIHdhcyAyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIHdpdGggbGVuZ3RoIDIgd2FzIHN1bmshJylcbiAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDUwMCk7XG4gICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAvLyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDIsIHdlIG5lZWQgYWRkaXRpb25hbCBmdW5jdGlvbi1oYW5kbGVyXG4gICAgICAgIHN0YXJ0ID0gW3ksIHhdXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShuZXh0WzBdLCBuZXh0WzFdKSwgNTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzaGlwIHdhcyBub3Qgc3VuaywgcGMgbWlzc2VkXG4gICAgICAgIHRtcFNxdWFyZSA9IFt5LCB4XVxuICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlRmlyZSgpIHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSAwKSB7XG4gICAgICAgIGZpcmVVc2VyKCk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVQbGF5ZXIgPT09IDEgJiYgdG1wU3F1YXJlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZSh0bXBTcXVhcmVbMF0sIHRtcFNxdWFyZVsxXSksIDUwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDUwMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICBwbGF5ZXJzWzBdLmZpbGxCb2FyZCgpO1xuICAgICAgICBwbGF5ZXJzWzFdLmZpbGxCb2FyZCgpO1xuXG4gICAgICAgIHBsYXllcnNbMF0ucGxhY2VTaGlwcyh1c2VyU2hpcHMpO1xuICAgICAgICBwbGF5ZXJzWzFdLnBsYWNlU2hpcHMocGNTaGlwcyk7XG5cbiAgICAgICAgc2NyZWVuQ29udHJvbGxlcigpO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICByYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBsYXllcnNbMF0uZmlsbEJvYXJkKCk7XG4gICAgICAgIHBsYXllcnNbMV0uZmlsbEJvYXJkKCk7XG5cbiAgICAgICAgcGxheWVyc1swXS5yZXNldFNoaXBzKHVzZXJTaGlwcyk7XG4gICAgICAgIHBsYXllcnNbMV0ucmVzZXRTaGlwcyhwY1NoaXBzKTtcblxuICAgICAgICBwbGF5ZXJzWzBdLnBsYWNlU2hpcHModXNlclNoaXBzKTtcbiAgICAgICAgcGxheWVyc1sxXS5wbGFjZVNoaXBzKHBjU2hpcHMpO1xuICAgICAgICBzY3JlZW5Db250cm9sbGVyKCk7XG4gICAgfSlcbn1cblxucmVzdGFydCgpO1xucmFuZG9tKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW5Db250cm9sbGVyKCkge1xuICAgIHVzZXJSZW5kZXIoKTtcbiAgICBwY1JlbmRlcigpO1xuICAgIGhhbmRsZUZpcmUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBcIi4vc3R5bGUvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL2xvZ2ljL3VpLm1qc1wiO1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuIl0sIm5hbWVzIjpbIm1haW5TcXVhcmVzIiwiaG9yaXpTcXVhcmVzIiwidmVydFNxdWFyZXMiLCJjaGVja0JvdW5kYXJpZXMiLCJfcmVmIiwieCIsInkiLCJzaGlwV2FzU3VuayIsInNoaXBzIiwic2hpcCIsImNvb3JkcyIsImlzU3VuayIsImZpcmVNYWluRGlyZWN0aW9ucyIsImJvYXJkIiwibWFwIiwicm93IiwiY2VsbCIsIm91dHB1dCIsInNxdWFyZSIsInZhbGlkU3F1YXJlIiwicHVzaCIsInNoaXBJc0hvcml6Iiwic2hpcElzVmVydCIsImxlZnRTcXVhcmVzIiwicmlnaHRTcXVhcmVzIiwiZG93blNxdWFyZXMiLCJ0b3BTcXVhcmVzIiwiZmlyZUxlZnQiLCJmaXJlUmlnaHQiLCJmaXJlRG93biIsImZpcmVUb3AiLCJzdXJyb3VuZGluZ1NxdWFyZXMiLCJwb3NzaWJsZVNxdWFyZXMiLCJzbGljZSIsImxlbmd0aCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwic2l6ZSIsInJvd3MiLCJjb2x1bW5zIiwiZmlsbEJvYXJkIiwiaSIsImoiLCJnZXRSYW5kb21Db29yZHMiLCJyYW5kb21ZIiwicmFuZG9tWCIsImxvb3BzIiwiZGlyZWN0aW9uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2hlY2tJZk5vdEVtcHR5IiwicGxhY2VTaGlwIiwic2hpcENvb3JkcyIsInBsYWNlU2hpcHMiLCJob3JpelN1bSIsInZlcnRTdW0iLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwiaGl0IiwiY29uc29sZSIsImxvZyIsIm1ha2VTdXJyb3VuZGluZ1dhdGVyIiwic3VyckNvb3JkcyIsInJlc2V0U2hpcHMiLCJyZXNldEhpdHMiLCJyZXNldENvb3JkcyIsImdhbWVPdmVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIlNoaXAiLCJoaXRzIiwiZXJyb3JNc2ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2ciLCJyZXN0YXJ0QnRuIiwicmFuZG9tQnRuIiwicGxheWVycyIsInVzZXJTaGlwcyIsInBjU2hpcHMiLCJhY3RpdmVQbGF5ZXIiLCJjaGFuZ2VQbGF5ZXIiLCJnYW1lT3Zlck1vZGFsIiwidGV4dCIsImNvbmdyYXR1bGF0aW9ucyIsInRleHRDb250ZW50Iiwic2hvd01vZGFsIiwidXNlclJlbmRlciIsImFjdGl2ZSIsImlubmVySFRNTCIsImJ0biIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInBjUmVuZGVyIiwiZGF0YXNldCIsImZpcmVVc2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFja0hhbmRsZXIiLCJldmVudCIsInRhcmdldCIsInNxdWFyZVkiLCJzcXVhcmVYIiwiaGFuZGxlRmlyZSIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGNGaXJlIiwic2V0VGltZW91dCIsInRhcmdldEZpcmUiLCJ0bXBTcXVhcmUiLCJzdGFydCIsInF1ZXVlIiwiZ2FtZUJvYXJkIiwibmV4dCIsInNoaWZ0IiwicSIsInJlc3RhcnQiLCJjbG9zZSIsInNjcmVlbkNvbnRyb2xsZXIiXSwic291cmNlUm9vdCI6IiJ9