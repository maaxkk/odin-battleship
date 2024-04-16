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
  '10': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3)
};
let activePlayer = 0;
function changePlayer() {
  return activePlayer = activePlayer === 0 ? 1 : 0;
}
players[activePlayer].placeShips(userShips);
changePlayer();
players[activePlayer].placeShips(pcShips);
changePlayer();
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
          dialog.showModal();
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
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 500);
        tmpSquare = null;
        return;
      } else {
        changePlayer();
        return;
      }
    } else {
      queue = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireDown)(gameBoard.board, y, x);
      const next = queue.shift();
      gameBoard.receiveAttack(next, userShips);
      userRender();
      if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipWasSunk)(userShips, next[0], next[1])) {
        console.log('ship with size 3 was sunk');
        setTimeout(pcFire, 500);
        tmpSquare = null;
        return;
      } else {
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
    console.log('ship with length was sunk!');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU8sc0ZBQXNGLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8s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Q0EseURBQWdCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL2FpLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzlmMCIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy91aS5tanMiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5sZXQgbWFpblNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMCwgMV0sXG4gICAgWzEsIDBdLFxuICAgIFstMSwgMF0sXG5dXG5cbmxldCBob3JpelNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMCwgMV0sXG5dXG5cbmxldCB2ZXJ0U3F1YXJlcyA9IFtcbiAgICBbLTEsIDBdLFxuICAgIFsxLCAwXSxcbl1cblxuZnVuY3Rpb24gY2hlY2tCb3VuZGFyaWVzKFt4LCB5XSkge1xuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCAxMCkgJiYgKHkgPj0gMCAmJiB5IDwgMTApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlwV2FzU3VuayhzaGlwcywgeSwgeCkge1xuICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpe1xuICAgICAgICBmb3IgKGxldCBjb29yZHMgb2Ygc2hpcHNbc2hpcF0uY29vcmRzKXtcbiAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPT09IHkgJiYgY29vcmRzWzFdID09PSB4KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpcHNbc2hpcF0uaXNTdW5rKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlTWFpbkRpcmVjdGlvbnMoYm9hcmQsIHksIHgpe1xuICAgIGJvYXJkID0gYm9hcmQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKSBjZWxsID0gJyAnO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9KSk7XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIG1haW5TcXVhcmVzKXtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dO1xuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBJc0hvcml6KGJvYXJkLCB5LCB4KSB7XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIGhvcml6U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpcElzVmVydChib2FyZCwgeSwgeCkge1xuICAgIGZvciAobGV0IHNxdWFyZSBvZiB2ZXJ0U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5sZXQgbGVmdFNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMCwgLTJdLFxuXVxuXG5sZXQgcmlnaHRTcXVhcmVzID0gW1xuICAgIFswLCAxXSxcbiAgICBbMCwgMl0sXG5dXG5cbmxldCBkb3duU3F1YXJlcyA9IFtcbiAgICBbLTEsIDBdLFxuICAgIFstMiwgMF0sXG5dXG5cbmxldCB0b3BTcXVhcmVzID0gW1xuICAgIFsxLCAwXSxcbiAgICBbMiwgMF0sXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlTGVmdChib2FyZCwgeSwgeCl7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgbGVmdFNxdWFyZXMpe1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVSaWdodChib2FyZCwgeSwgeCl7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgcmlnaHRTcXVhcmVzKXtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dXG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGlmIChib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID09PSAnICcpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKHZhbGlkU3F1YXJlKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRG93bihib2FyZCwgeSwgeCl7XG4gICAgYm9hcmQgPSBib2FyZC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGlmIChjZWxsID09PSAnIycpIGNlbGwgPSAnICc7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH0pKTtcbiAgICBsZXQgb3V0cHV0ID0gW11cbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgZG93blNxdWFyZXMpe1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVUb3AoYm9hcmQsIHksIHgpe1xuICAgIGJvYXJkID0gYm9hcmQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKSBjZWxsID0gJyAnO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9KSk7XG4gICAgbGV0IG91dHB1dCA9IFtdXG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIHRvcFNxdWFyZXMpe1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsaWRTcXVhcmUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge3NoaXBXYXNTdW5rLCBmaXJlTWFpbkRpcmVjdGlvbnMsIHNoaXBJc1ZlcnQsIHNoaXBJc0hvcml6LCBmaXJlTGVmdCwgZmlyZVJpZ2h0LCBmaXJlVG9wLCBmaXJlRG93bn0iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5sZXQgc3Vycm91bmRpbmdTcXVhcmVzID0gW1xuICAgIFsxLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgMF0sXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMV0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgMV0sXG5dXG4vLyBqdXN0IGNvcHkgYXJyYXkgYWJvdmUgd2l0aCAuc2xpY2UgYW5kIHB1c2ggb25lIG1vcmUgc3F1YXJlIFswLDBdIGZvciBjaGVja0lmTm90RW1wdHkgZnVuY3Rpb25cbmxldCBwb3NzaWJsZVNxdWFyZXMgPSBzdXJyb3VuZGluZ1NxdWFyZXMuc2xpY2UoMCwgc3Vycm91bmRpbmdTcXVhcmVzLmxlbmd0aClcbnBvc3NpYmxlU3F1YXJlcy5wdXNoKFswLCAwXSlcblxuZnVuY3Rpb24gY2hlY2tCb3VuZGFyaWVzKFt4LCB5XSkge1xuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCAxMCkgJiYgKHkgPj0gMCAmJiB5IDwgMTApXG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICB0aGlzLnJvd3MgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBzaXplO1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIHRoaXMuZmlsbEJvYXJkKCk7IC8vIGZpbGxpbmcgYm9hcmQgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICB9XG5cbiAgICBmaWxsQm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldLnB1c2goJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJhbmRvbUNvb3JkcyhzaGlwKSB7XG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcbiAgICAgICAgbGV0IGxvb3BzID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gc21hbGwgb3B0aW1pemF0aW9uIG9mIGZpbmRpbmcgY29vcmRzXG4gICAgICAgICAgICBsb29wcyArPSAxO1xuICAgICAgICAgICAgaWYgKGxvb3BzID4gMjApe1xuICAgICAgICAgICAgICAgIHNoaXAuZGlyZWN0aW9uID0gc2hpcC5kaXJlY3Rpb24gPT09IDAgPyAxIDogMDtcbiAgICAgICAgICAgICAgICBsb29wcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDApIHsgLy8gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucm93cyk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmNvbHVtbnMgLSBzaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxseVxuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5yb3dzIC0gc2hpcC5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbid0IHB1dCBvdXIgc2hpcCBpbiByYW5nZSBvZiAoc2l6ZSBvZiBjb2x1bW5zIC0gc3RhcnQgY29vcmRpbmF0ZSBvZiBzaGlwKSwgdGhlbiB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgICAgICAvLyBpZiB3ZSBjYW4gcHV0IG91ciBzaGlwIGluIHRoaXMgcmFuZ2UsIGJ1dCBpZiBpbiByYW5nZSBvZiAtMSB0byArMSBzcXVhcmVzIGlzIG91ciBuZWlnaGJvdXIgc2hpcCwgd2UgZ2VuZXJhdGUgbmV3IGNvb3Jkc1xuICAgICAgICB9IHdoaWxlICghKHRoaXMuY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpKSlcblxuICAgICAgICByZXR1cm4gW3JhbmRvbVksIHJhbmRvbVhdO1xuICAgIH1cblxuICAgIGNoZWNrSWZOb3RFbXB0eShzaGlwLCByYW5kb21ZLCByYW5kb21YKSB7XG4gICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkgeyAvLyBob3JpelxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IHJhbmRvbVg7IGogPCByYW5kb21YICsgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3JhbmRvbVkgKyBzcXVhcmVbMF0sIGogKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsbHlcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzcXVhcmUgb2YgcG9zc2libGVTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtpICsgc3F1YXJlWzBdLCByYW5kb21YICsgc3F1YXJlWzFdXVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBwbGFjaW5nIHNoaXAgLT4gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyYW5kb21ZXVtqXSA9ICcjJztcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3JhbmRvbVksIGpdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm93IHdlIHBsYWNlIHNoaXAgdmVydGljYWxseSwgc28gd2UgaXRlcmF0ZSBvbmx5IGluIHJvd3NcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW3JhbmRvbVhdID0gJyMnO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbaSwgcmFuZG9tWF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcC5jb29yZHMgPSBzaGlwQ29vcmRzO1xuICAgIH1cblxuICAgIC8vIGhlbHBlciBmdW5jdGlvblxuICAgIHBsYWNlU2hpcHMoc2hpcHMpe1xuICAgICAgICBsZXQgaG9yaXpTdW0gPSAwXG4gICAgICAgIGxldCB2ZXJ0U3VtID0gMDtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uZGlyZWN0aW9uID09PSAwICkgaG9yaXpTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBlbHNlIHZlcnRTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5kaXJlY3Rpb24gPSBob3JpelN1bSA+IDggPyAxIDogMFxuICAgICAgICAgICAgbGV0IFt5LCB4XSA9IHRoaXMuZ2V0UmFuZG9tQ29vcmRzKHNoaXBzW3NoaXBdKVxuICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcHNbc2hpcF0sIHksIHgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcywgc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5qrJyB8fFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5KiJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gdGVtcG9yYXJ5IHN0dWJcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb29yZHMgb2Ygc2hpcHNbc2hpcF0uY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0Nvb3Jkc1swXSA9PT0gY29vcmRzWzBdICYmIGF0dGFja0Nvb3Jkc1sxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW3NoaXBdLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9ICfwn5KiJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGlwICR7c2hpcH0gd2FzIHN1bmshYClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcHNbc2hpcF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfmqsnXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1ha2VTdXJyb3VuZGluZ1dhdGVyKHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHNoaXAuY29vcmRzW2ldXG4gICAgICAgICAgICBmb3IgKGxldCBzdXJyQ29vcmRzIG9mIHN1cnJvdW5kaW5nU3F1YXJlcykge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWzAsICsxXSwgWzAsIC0xXVxuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWysxLCAwXSwgWy0xLCAwXVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDAgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMSkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAtMSkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAxICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IHNoaXAuY29vcmRzLmxlbmd0aCAtIDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IC0xICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IDApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbY29vcmRzWzBdICsgc3VyckNvb3Jkc1swXSwgY29vcmRzWzFdICsgc3VyckNvb3Jkc1sxXV1cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9ICfwn5qrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICByZXNldFNoaXBzKHNoaXBzKXtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5yZXNldEhpdHMoKTtcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLnJlc2V0Q29vcmRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnYW1lT3ZlcihzaGlwcykge1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBpZiAoIXNoaXBzW3NoaXBdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFNoaXBzKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyKVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXNldEhpdHMoKSB7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuICAgIHJlc2V0Q29vcmRzKCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgIH1cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoXG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xufVxuXG5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA0OHB4O1xufVxuXG5oMSB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLm5hbWVzIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5ib2FyZCB7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgd2lkdGg6IDM0MHB4O1xuICAgIGhlaWdodDogMzQwcHg7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLnVzZXItYm9hcmQge1xuICAgIG1hcmdpbi1sZWZ0OiA0OHB4O1xufVxuXG4udXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLnBjLWJvYXJkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XG59XG5cbi5wYywgLmVycm9yIHtcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLmNlbGwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcbn1cblxuLmZpcmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdXJyb3VuZGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4uZXJyb3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBjb2xvcjogcmVkO1xuICAgIGZvbnQtc2l6ZTogODAlO1xufVxuXG5kaWFsb2cge1xuICAgIHdpZHRoOiAxMDAwcHg7XG4gICAgaGVpZ2h0OiAxNDVweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbmRpYWxvZzo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgIG9wYWNpdHk6IDAuODtcbn1cblxuLmRpYWxvZy1jb250ZW50IHtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDI0cHg7XG59XG5cbi5kaWFsb2ctY29udGVudCA+IHAge1xuICAgIGNvbG9yOiByb3lhbGJsdWU7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5yZXN0YXJ0LCAucmFuZG9tIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2UtaW4tb3V0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnJlc3RhcnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xuICAgIHdpZHRoOiAxNjBweDtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcbn1cblxuLnJhbmQtcG9zaXRpb24ge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyxZQUFZO0lBQ1osMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsMkJBQTJCO0lBQzNCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixhQUFhO0lBQ2IsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixvQ0FBb0M7SUFDcEMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XFxufVxcblxcbmgxIHtcXG4gICAgY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLm5hbWVzIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHdpZHRoOiAzNDBweDtcXG4gICAgaGVpZ2h0OiAzNDBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBwYWRkaW5nOiAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLnVzZXItYm9hcmQge1xcbiAgICBtYXJnaW4tbGVmdDogNDhweDtcXG59XFxuXFxuLnVzZXIge1xcbiAgICBtYXJnaW4tbGVmdDogY2FsYygyNHB4ICsgMTcwcHgpO1xcbn1cXG5cXG4ucGMtYm9hcmQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XFxufVxcblxcbi5wYywgLmVycm9yIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBjYWxjKDI0cHggKyAxNzBweCk7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIG9yYW5nZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSk7XFxufVxcblxcbi5maXJlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnN1cnJvdW5kZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBjb2xvcjogcmVkO1xcbiAgICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuZGlhbG9nIHtcXG4gICAgd2lkdGg6IDEwMDBweDtcXG4gICAgaGVpZ2h0OiAxNDVweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuZGlhbG9nOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCB7XFxuICAgIGhlaWdodDogMTQ1cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDI0cHg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCA+IHAge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLnJlc3RhcnQsIC5yYW5kb20ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlLWluLW91dDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuICAgIHBhZGRpbmc6IDE2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS43NXJlbTtcXG4gICAgd2lkdGg6IDE2MHB4O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcXG59XFxuXFxuLnJhbmQtcG9zaXRpb24ge1xcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHtcbiAgICBmaXJlTWFpbkRpcmVjdGlvbnMsXG4gICAgc2hpcElzVmVydCxcbiAgICBzaGlwSXNIb3JpeixcbiAgICBzaGlwV2FzU3VuayxcbiAgICBmaXJlUmlnaHQsXG4gICAgZmlyZUxlZnQsXG4gICAgZmlyZVRvcCxcbiAgICBmaXJlRG93blxufSBmcm9tIFwiLi9haS5qc1wiO1xuXG5jb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpXG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cnKVxuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0JylcbmNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKVxuXG5jb25zdCBwbGF5ZXJzID0ge1xuICAgIDA6IG5ldyBHYW1lYm9hcmQoMTApLFxuICAgIDE6IG5ldyBHYW1lYm9hcmQoMTApLFxufVxuXG4vLyBJIHdpbGwgdHJ5IHRvIG1ha2UgYW4gYWxnb3JpdGhtIGxhdGVyIHRvIG1ha2UgdGhlIGNvb3JkaW5hdGUgc2VhcmNoIHdvcmsgZm9yIGFsbCBzaGlwc1xuLy8gc28gZmFyIGl0IHdvcmtzIG9ubHkgaWYgeW91IGV4Y2x1ZGUgU2hpcCB3aXRoIHNpemUgMSBhbmQgMlxuY29uc3QgdXNlclNoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgLy8gJzUnOiBuZXcgU2hpcCgyKSxcbiAgICAnNic6IG5ldyBTaGlwKDIpLFxuICAgICc3JzogbmV3IFNoaXAoMiksXG4gICAgJzgnOiBuZXcgU2hpcCgzKSxcbiAgICAnOSc6IG5ldyBTaGlwKDMpLFxuICAgICcxMCc6IG5ldyBTaGlwKDQpLFxufVxuXG5jb25zdCBwY1NoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgLy8gJzUnOiBuZXcgU2hpcCgyKSxcbiAgICAnNic6IG5ldyBTaGlwKDIpLFxuICAgICc3JzogbmV3IFNoaXAoMiksXG4gICAgJzgnOiBuZXcgU2hpcCgzKSxcbiAgICAnOSc6IG5ldyBTaGlwKDMpLFxuICAgICcxMCc6IG5ldyBTaGlwKDMpLFxufVxuXG5sZXQgYWN0aXZlUGxheWVyID0gMDtcblxuZnVuY3Rpb24gY2hhbmdlUGxheWVyKCkge1xuICAgIHJldHVybiBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcbn1cblxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcHModXNlclNoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKVxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwcyhwY1NoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKTtcblxuZnVuY3Rpb24gdXNlclJlbmRlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfkqInKSBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+aqycpIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIGVsc2UgYnRuLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBjUmVuZGVyKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBjLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1sxXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgYnRuLmRhdGFzZXQueSA9IGAke2l9YDtcbiAgICAgICAgICAgIGJ0bi5kYXRhc2V0LnggPSBgJHtqfWA7XG4gICAgICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5qrJykge1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIH0gZWxzZSBidG4uY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICAvLyBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGJ0bilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlyZVVzZXIoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGMtYm9hcmQnKVxuICAgIGJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrSGFuZGxlcilcbn1cblxuZnVuY3Rpb24gYXR0YWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuZGF0YXNldC55ICYmIGV2ZW50LnRhcmdldC5kYXRhc2V0LnggJiYgYWN0aXZlUGxheWVyID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMV1cbiAgICAgICAgY29uc3Qgc3F1YXJlWSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgICAgIGNvbnN0IHNxdWFyZVggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgICAgICBpZiAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFsrc3F1YXJlWSwgK3NxdWFyZVhdLCBwY1NoaXBzKSkgeyAvLyBpZiB0aGlzIHNxdWFyZSB3YXMgYXR0YWNrZWQgYWxyZWFkeVxuICAgICAgICAgICAgZXJyb3JNc2cudGV4dENvbnRlbnQgPSBgKlNxdWFyZSAke1tzcXVhcmVZLCBzcXVhcmVYXX0gYWxyZWFkeSB3YXMgYXR0YWNrZWQhYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgbGV0IHBjIGZpcmUsIGlmIG91ciBsYXN0IGF0dGFja2VkIHNxdWFyZSB3YXMgYSBoaXRcbiAgICAgICAgICAgIGlmIChhY3RpdmUuYm9hcmRbK3NxdWFyZVldWytzcXVhcmVYXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLnJlY2VpdmVBdHRhY2soWytzcXVhcmVZLCArc3F1YXJlWF0sIHBjU2hpcHMpXG4gICAgICAgICAgICAgICAgcGNSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlLmdhbWVPdmVyKHBjU2hpcHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBwY1JlbmRlcigpO1xuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICBoYW5kbGVGaXJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufVxuXG5mdW5jdGlvbiBwY0ZpcmUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBsZXQgeSwgeDtcbiAgICBkbyB7XG4gICAgICAgIFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgfSB3aGlsZSAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFt5LCB4XSwgdXNlclNoaXBzKSk7XG4gICAgaWYgKGFjdGl2ZS5ib2FyZFt5XVt4XSA9PT0gJ/CfkqInKSB7IC8vIGlmIHBjIGhpdHMgdXNlcidzIHNoaXBcbiAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgeSwgeCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHksIHgpLCA1MDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXNlclJlbmRlcigpO1xuICAgIGNoYW5nZVBsYXllcigpO1xufVxuXG5sZXQgdG1wU3F1YXJlID0gbnVsbDtcbmxldCBzdGFydCA9IG51bGw7XG5sZXQgcXVldWUgPSBbXVxuXG5mdW5jdGlvbiB0YXJnZXRGaXJlKHksIHgpIHtcblxuICAgIGNvbnN0IGdhbWVCb2FyZCA9IHBsYXllcnNbMF1cblxuICAgIGlmIChzaGlwSXNIb3JpeihnYW1lQm9hcmQuYm9hcmQsIHksIHgpKSB7XG4gICAgICAgIC8vIGFmdGVyIGhhbmRsaW5nIHNoaXAgb2Ygc2l6ZSAyLCB3ZSBkZXRlcm1pbmVkIHRoYXQgc2hpcCBzaXplIGlzID4gMlxuICAgICAgICAvLyBub3cgd2Ugd2lsbCBoYW5kbGUgdGhpcyBzaGlwLCBpZiB0aGF0IHNoaXAgaXMgaG9yaXpvbnRhbFxuICAgICAgICAvLyBjb21wYXJlIG9ubHkgaG9yaXpvbnRhbCBjb29yZHNcbiAgICAgICAgaWYgKHggPj0gc3RhcnRbMV0pIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZVJpZ2h0KGdhbWVCb2FyZC5ib2FyZCwgeSwgeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbbmV4dFswXV1bbmV4dFsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gM1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0RmlyZShuZXh0WzBdLCBuZXh0WzFdKSwgNTAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXVlID0gZmlyZUxlZnQoZ2FtZUJvYXJkLmJvYXJkLCB5LCB4KVxuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhuZXh0LCB1c2VyU2hpcHMpO1xuICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCB3aXRoIHNpemUgMyB3YXMgc3VuaycpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDUwMCk7XG4gICAgICAgICAgICAgICAgdG1wU3F1YXJlID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZC5ib2FyZFtuZXh0WzBdXVtuZXh0WzFdXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hpcCBzaXplIGlzIG1vcmUgdGhhbiAzXG4gICAgICAgICAgICAgICAgaWYgKG5leHRbMV0gLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soW25leHRbMF0sIG5leHRbMV0tMV0sIHVzZXJTaGlwcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSAtIDEpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXRGaXJlKHN0YXJ0WzBdLCBzdGFydFsxXSksIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBTcXVhcmUgPSBbc3RhcnRbMF0sIHN0YXJ0WzFdXVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG1wU3F1YXJlID0gW3N0YXJ0WzBdLCBzdGFydFsxXV1cbiAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNoaXBJc1ZlcnQoZ2FtZUJvYXJkLmJvYXJkLCB5LCB4KSkge1xuICAgICAgICAvLyBhZnRlciBoYW5kbGluZyBzaGlwIG9mIHNpemUgMiwgd2UgZGV0ZXJtaW5lZCB0aGF0IHNoaXAgc2l6ZSBpcyA+IDJcbiAgICAgICAgLy8gbm93IHdlIHdpbGwgaGFuZGxlIHRoaXMgc2hpcCwgaWYgdGhhdCBzaGlwIGlzIHZlcnRpY2FsXG4gICAgICAgIC8vIGNvbXBhcmUgb25seSB2ZXJ0aWNhbCBjb29yZHNcbiAgICAgICAgaWYgKHkgPiBzdGFydFswXSkge1xuICAgICAgICAgICAgcXVldWUgPSBmaXJlVG9wKGdhbWVCb2FyZC5ib2FyZCwgeSwgeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gcXVldWUuc2hpZnQoKVxuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWV1ZSA9IGZpcmVEb3duKGdhbWVCb2FyZC5ib2FyZCwgeSwgeClcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dCwgdXNlclNoaXBzKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIGlmIChzaGlwV2FzU3Vuayh1c2VyU2hpcHMsIG5leHRbMF0sIG5leHRbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgIHRtcFNxdWFyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoYW5nZVBsYXllcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgY29uc3QgcSA9IGZpcmVNYWluRGlyZWN0aW9ucyhnYW1lQm9hcmQuYm9hcmQsIHksIHgpXG4gICAgY29uc3QgbmV4dCA9IHEuc2hpZnQoKTtcblxuICAgIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKG5leHQsIHVzZXJTaGlwcyk7XG4gICAgdXNlclJlbmRlcigpO1xuXG4gICAgaWYgKHNoaXBXYXNTdW5rKHVzZXJTaGlwcywgbmV4dFswXSwgbmV4dFsxXSkpIHtcbiAgICAgICAgLy8gc2hpcCBzaXplIHdhcyAyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIHdpdGggbGVuZ3RoIHdhcyBzdW5rIScpXG4gICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICB0bXBTcXVhcmUgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW25leHRbMF1dW25leHRbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgLy8gc2hpcCBzaXplIGlzIG1vcmUgdGhhbiAyLCB3ZSBuZWVkIGFkZGl0aW9uYWwgZnVuY3Rpb24taGFuZGxlclxuICAgICAgICBzdGFydCA9IFt5LCB4XVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEZpcmUobmV4dFswXSwgbmV4dFsxXSksIDUwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2hpcCB3YXMgbm90IHN1bmssIHBjIG1pc3NlZFxuICAgICAgICB0bXBTcXVhcmUgPSBbeSwgeF1cbiAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZUZpcmUoKSB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gMCkge1xuICAgICAgICBmaXJlVXNlcigpO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlUGxheWVyID09PSAxICYmIHRtcFNxdWFyZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldEZpcmUodG1wU3F1YXJlWzBdLCB0bXBTcXVhcmVbMV0pLCA1MDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgcGxheWVyc1swXS5maWxsQm9hcmQoKTtcbiAgICAgICAgcGxheWVyc1sxXS5maWxsQm9hcmQoKTtcblxuICAgICAgICBwbGF5ZXJzWzBdLnBsYWNlU2hpcHModXNlclNoaXBzKTtcbiAgICAgICAgcGxheWVyc1sxXS5wbGFjZVNoaXBzKHBjU2hpcHMpO1xuXG4gICAgICAgIHNjcmVlbkNvbnRyb2xsZXIoKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByYW5kb20oKSB7XG4gICAgcmFuZG9tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbGF5ZXJzWzBdLmZpbGxCb2FyZCgpO1xuICAgICAgICBwbGF5ZXJzWzFdLmZpbGxCb2FyZCgpO1xuXG4gICAgICAgIHBsYXllcnNbMF0ucmVzZXRTaGlwcyh1c2VyU2hpcHMpO1xuICAgICAgICBwbGF5ZXJzWzFdLnJlc2V0U2hpcHMocGNTaGlwcyk7XG5cbiAgICAgICAgcGxheWVyc1swXS5wbGFjZVNoaXBzKHVzZXJTaGlwcyk7XG4gICAgICAgIHBsYXllcnNbMV0ucGxhY2VTaGlwcyhwY1NoaXBzKTtcbiAgICAgICAgc2NyZWVuQ29udHJvbGxlcigpO1xuICAgIH0pXG59XG5cbnJlc3RhcnQoKTtcbnJhbmRvbSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcigpIHtcbiAgICB1c2VyUmVuZGVyKCk7XG4gICAgcGNSZW5kZXIoKTtcbiAgICBoYW5kbGVGaXJlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgXCIuL3N0eWxlL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgc2NyZWVuQ29udHJvbGxlciBmcm9tIFwiLi9sb2dpYy91aS5tanNcIjtcblxuc2NyZWVuQ29udHJvbGxlcigpXG5cbiJdLCJuYW1lcyI6WyJtYWluU3F1YXJlcyIsImhvcml6U3F1YXJlcyIsInZlcnRTcXVhcmVzIiwiY2hlY2tCb3VuZGFyaWVzIiwiX3JlZiIsIngiLCJ5Iiwic2hpcFdhc1N1bmsiLCJzaGlwcyIsInNoaXAiLCJjb29yZHMiLCJpc1N1bmsiLCJmaXJlTWFpbkRpcmVjdGlvbnMiLCJib2FyZCIsIm1hcCIsInJvdyIsImNlbGwiLCJvdXRwdXQiLCJzcXVhcmUiLCJ2YWxpZFNxdWFyZSIsInB1c2giLCJzaGlwSXNIb3JpeiIsInNoaXBJc1ZlcnQiLCJsZWZ0U3F1YXJlcyIsInJpZ2h0U3F1YXJlcyIsImRvd25TcXVhcmVzIiwidG9wU3F1YXJlcyIsImZpcmVMZWZ0IiwiZmlyZVJpZ2h0IiwiZmlyZURvd24iLCJmaXJlVG9wIiwic3Vycm91bmRpbmdTcXVhcmVzIiwicG9zc2libGVTcXVhcmVzIiwic2xpY2UiLCJsZW5ndGgiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJyb3dzIiwiY29sdW1ucyIsImZpbGxCb2FyZCIsImkiLCJqIiwiZ2V0UmFuZG9tQ29vcmRzIiwicmFuZG9tWSIsInJhbmRvbVgiLCJsb29wcyIsImRpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNoZWNrSWZOb3RFbXB0eSIsInBsYWNlU2hpcCIsInNoaXBDb29yZHMiLCJwbGFjZVNoaXBzIiwiaG9yaXpTdW0iLCJ2ZXJ0U3VtIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja0Nvb3JkcyIsImhpdCIsImNvbnNvbGUiLCJsb2ciLCJtYWtlU3Vycm91bmRpbmdXYXRlciIsInN1cnJDb29yZHMiLCJyZXNldFNoaXBzIiwicmVzZXRIaXRzIiwicmVzZXRDb29yZHMiLCJnYW1lT3ZlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJTaGlwIiwiaGl0cyIsImVycm9yTXNnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9nIiwicmVzdGFydEJ0biIsInJhbmRvbUJ0biIsInBsYXllcnMiLCJ1c2VyU2hpcHMiLCJwY1NoaXBzIiwiYWN0aXZlUGxheWVyIiwiY2hhbmdlUGxheWVyIiwidXNlclJlbmRlciIsImFjdGl2ZSIsImlubmVySFRNTCIsImJ0biIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwicGNSZW5kZXIiLCJkYXRhc2V0IiwiZmlyZVVzZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNrSGFuZGxlciIsImV2ZW50IiwidGFyZ2V0Iiwic3F1YXJlWSIsInNxdWFyZVgiLCJzaG93TW9kYWwiLCJoYW5kbGVGaXJlIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJwY0ZpcmUiLCJzZXRUaW1lb3V0IiwidGFyZ2V0RmlyZSIsInRtcFNxdWFyZSIsInN0YXJ0IiwicXVldWUiLCJnYW1lQm9hcmQiLCJuZXh0Iiwic2hpZnQiLCJxIiwicmVzdGFydCIsImNsb3NlIiwic2NyZWVuQ29udHJvbGxlciJdLCJzb3VyY2VSb290IjoiIn0=