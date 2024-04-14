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
/* harmony export */   fireMainDirections: () => (/* binding */ fireMainDirections),
/* harmony export */   shipIsHoriz: () => (/* binding */ shipIsHoriz),
/* harmony export */   shipIsVert: () => (/* binding */ shipIsVert),
/* harmony export */   shipOfOneSunk: () => (/* binding */ shipOfOneSunk)
/* harmony export */ });


let surroundingSquares = [
// diag
[1, -1], [-1, -1], [1, 1], [-1, 1],
// horiz
[0, -1], [0, 1],
// vert
[-1, 0], [1, 0]];
let diagonalSquares = [[1, -1], [-1, -1], [1, 1], [-1, 1]];
let mainSquares = [[0, -1], [1, 0], [0, 1], [-1, 0]];
let horizSquares = [[0, -1], [0, 1]];
let vertSquares = [[-1, 0], [1, 0]];
function checkBoundaries(_ref) {
  let [x, y] = _ref;
  return x >= 0 && x < 10 && y >= 0 && y < 10;
}

// check if ship with length 1 is Sunk and also checks if length of ship is more than 1
// If after hitting ship, water outside ship is not surrounded, it means ship size is more than 1

// ship with size of 1 is edge case, we check every square outside of this ship
function shipOfOneSunk(board, y, x) {
  let skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [100, 100];
  for (let surrCoords of surroundingSquares) {
    if (surrCoords[0] === skip[0] && surrCoords[1] === skip[1]) continue;
    let validSquare = [y + surrCoords[0], x + surrCoords[1]];
    if (!checkBoundaries(validSquare)) continue;else if (board[validSquare[0]][validSquare[1]] === ' ') {
      return false;
    }
  }
  return true;
}

// if function above returns false, it means ship length is more than 1
// now we can check main direction, horizontally and vertically and we will get direction of ship
// but firstly computer has to fire in 4 main directions

// Algorithm:
// 1) check if ship was size of 1, if true, ship size was only 1, and we can generate new random coords, otherwise ->
// 2) fire in 4 main directions E-W-N-S and after each of them check both directions and finding out what direction of ship
// 3) After finding direction of ship -> check their start-1 and end+1 if they are water -> then ship size is more than 2
// otherwise ship size was 2
// 4) Repeat process for ship with size 3 and 4

function fireMainDirections(board, y, x) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  shipOfOneSunk,
  fireMainDirections,
  shipIsVert,
  shipIsHoriz
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
  '5': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '6': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '11': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '12': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '13': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2)
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
    if (active.gameOver(pcShips)) {
      dialog.showModal();
      return;
    }
    if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, y, x)) {
      setTimeout(pcFire, 1000);
      userRender();
      console.log('ship with size 1 was sunk');
      return;
    } else {
      // if ship did not sink, his size is more than 2
      const boardFromPcView = active.board.map(row => row.map(cell => {
        if (cell === '#') {
          cell = ' ';
        }
        return cell;
      }));
      q = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireMainDirections)(boardFromPcView, y, x);
      startCoords = [y, x];
      setTimeout(() => smartPc(y, x), 1000);
      userRender();
      return;
    }
  }
  userRender();
  changePlayer();
}
let q = [];
let startCoords = [];
let wasHit = false;

// not finished bad solution
function smartPc(y, x) {
  if (q.length === 0) {
    console.log('q is empty');
    return;
  }
  let active = players[0];
  if (!(0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsHoriz)(active.board, y, x) || !(0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsVert)(active.board, y, x)) {
    const nextSquare = q.shift();
    active.receiveAttack(nextSquare, userShips);
    userRender();
    if (active.board[nextSquare[0]][nextSquare[1]] === '💢') {
      // if ship was size of 2
      // trying to find direction of ship
      const skip = [nextSquare[0] - startCoords[0], nextSquare[1] - startCoords[1]];
      const skip2 = [startCoords[0] - nextSquare[0], startCoords[1] - nextSquare[1]];
      if (nextSquare[1] > startCoords[1]) {
        // ship is horizontally
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip2)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 1000);
          return;
        } else {
          // if size is more than 2
          q = [];
          wasHit = false;
          if (startCoords[1] - 1 >= 0) q.push([startCoords[0], startCoords[1] - 1]);
          if (nextSquare[1] + 1 <= 9) q.push([nextSquare[0], nextSquare[1] + 1]);
          setTimeout(() => smartPc(y, x), 1000);
          return;
        }
      } else if (nextSquare[1] < startCoords[1]) {
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip2) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 1000);
          return;
        } else {
          // if size is more than 2
          q = [];
          wasHit = false;
          if (startCoords[1] + 1 <= 9) q.push([startCoords[0], startCoords[1] + 1]);
          if (nextSquare[1] - 1 >= 0) q.push([nextSquare[0], nextSquare[1] - 1]);
          smartPc(y, x);
          return;
        }
      } else if (nextSquare[0] > startCoords[0]) {
        // ship is vertically
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip2)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 1000);
          return;
        } else {
          // if size is more than 2
          q = [];
          wasHit = false;
          if (startCoords[0] - 1 >= 0) q.push([startCoords[0] - 1, startCoords[1]]);
          if (nextSquare[1] + 1 <= 9) q.push([nextSquare[0] + 1, nextSquare[1]]);
          smartPc(y, x);
          return;
        }
      } else if (nextSquare[0] < startCoords[0]) {
        // ship is vertically
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip2) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 1000);
          return;
        } else {
          // if size is more than 2
          q = [];
          wasHit = false;
          if (startCoords[0] + 1 <= 9) q.push([startCoords[0] + 1, startCoords[1]]);
          if (nextSquare[0] - 1 >= 0) q.push([nextSquare[0] - 1, nextSquare[1]]);
          smartPc(y, x);
          return;
        }
      }
    } else {
      wasHit = true;
      console.log(JSON.stringify(q));
      changePlayer();
      return;
    }
  }
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsHoriz)(active.board, y, x)) {
    const horNextSquare = q.shift();
    active.receiveAttack(horNextSquare, userShips);
    userRender();
    if (active.board[horNextSquare[0]][horNextSquare[1]] === '💢') {
      // if ship was size of 3
      console.log('Ship with size of 3 was sunk');
      wasHit = false;
      q = [];
      startCoords = [];
      pcFire();
      return;
    } else {
      wasHit = true;
      changePlayer();
      return;
    }
  } else {
    wasHit = true;
    changePlayer();
    // return;
  }
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsVert)(active.board, y, x)) {
    const verNextSquare = q.shift();
    active.receiveAttack(verNextSquare, userShips);
    userRender();
    if (active.board[verNextSquare[0]][verNextSquare[1]] === '💢') {
      // if ship was size of 3
      console.log('Ship with size of 3 was sunk');
      wasHit = false;
      q = [];
      startCoords = [];
      pcFire();
      return;
    } else {
      wasHit = true;
      changePlayer();
      return;
    }
  } else {
    wasHit = true;
    changePlayer();
    return;
  }
}
function handleFire() {
  if (activePlayer === 0) {
    fireUser();
  } else if (activePlayer === 1 && wasHit) {
    smartPc(startCoords[0], startCoords[1]);
  } else {
    pcFire();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxDQUFDekIsVUFBVSxDQUFDMEIsU0FBUyxDQUFDO0lBQ2hDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUN6QixVQUFVLENBQUMyQixPQUFPLENBQUM7SUFDOUIyQyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3RCLENBQUMsQ0FBQztBQUNOO0FBRUFGLE9BQU8sQ0FBQyxDQUFDO0FBQ1R6RSxNQUFNLENBQUMsQ0FBQztBQUVELFNBQVMyRSxnQkFBZ0JBLENBQUEsRUFBRztFQUMvQnhDLFVBQVUsQ0FBQyxDQUFDO0VBQ1pTLFFBQVEsQ0FBQyxDQUFDO0VBQ1ZVLFVBQVUsQ0FBQyxDQUFDO0FBQ2hCO0FBRUEsaUVBQWVxQixnQkFBZ0I7Ozs7OztVQ3RXL0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBYTs7QUFFYztBQUVtQjtBQUU5Q0EseURBQWdCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL2FpLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzlmMCIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy91aS5tanMiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5sZXQgc3Vycm91bmRpbmdTcXVhcmVzID0gW1xuICAgIC8vIGRpYWdcbiAgICBbMSwgLTFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAxXSxcbiAgICBbLTEsIDFdLFxuICAgIC8vIGhvcml6XG4gICAgWzAsIC0xXSxcbiAgICBbMCwgMV0sXG4gICAgLy8gdmVydFxuICAgIFstMSwgMF0sXG4gICAgWzEsIDBdLFxuXG5dXG5cbmxldCBkaWFnb25hbFNxdWFyZXMgPSBbXG4gICAgWzEsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgMV0sXG4gICAgWy0xLCAxXSxcbl1cblxubGV0IG1haW5TcXVhcmVzID0gW1xuICAgIFswLCAtMV0sXG4gICAgWzEsIDBdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsIDBdLFxuXVxuXG5sZXQgaG9yaXpTcXVhcmVzID0gW1xuICAgIFswLCAtMV0sXG4gICAgWzAsIDFdLFxuXVxuXG5sZXQgdmVydFNxdWFyZXMgPSBbXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMF0sXG5dXG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRhcmllcyhbeCwgeV0pIHtcbiAgICByZXR1cm4gKHggPj0gMCAmJiB4IDwgMTApICYmICh5ID49IDAgJiYgeSA8IDEwKVxufVxuXG4vLyBjaGVjayBpZiBzaGlwIHdpdGggbGVuZ3RoIDEgaXMgU3VuayBhbmQgYWxzbyBjaGVja3MgaWYgbGVuZ3RoIG9mIHNoaXAgaXMgbW9yZSB0aGFuIDFcbi8vIElmIGFmdGVyIGhpdHRpbmcgc2hpcCwgd2F0ZXIgb3V0c2lkZSBzaGlwIGlzIG5vdCBzdXJyb3VuZGVkLCBpdCBtZWFucyBzaGlwIHNpemUgaXMgbW9yZSB0aGFuIDFcblxuLy8gc2hpcCB3aXRoIHNpemUgb2YgMSBpcyBlZGdlIGNhc2UsIHdlIGNoZWNrIGV2ZXJ5IHNxdWFyZSBvdXRzaWRlIG9mIHRoaXMgc2hpcFxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBPZk9uZVN1bmsoYm9hcmQsIHksIHgsIHNraXAgPSBbMTAwLCAxMDBdKSB7XG4gICAgZm9yIChsZXQgc3VyckNvb3JkcyBvZiBzdXJyb3VuZGluZ1NxdWFyZXMpIHtcbiAgICAgICAgaWYgKHN1cnJDb29yZHNbMF0gPT09IHNraXBbMF0gJiYgc3VyckNvb3Jkc1sxXSA9PT0gc2tpcFsxXSkgY29udGludWU7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3VyckNvb3Jkc1swXSwgeCArIHN1cnJDb29yZHNbMV1dXG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGVsc2UgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICcgJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyBpZiBmdW5jdGlvbiBhYm92ZSByZXR1cm5zIGZhbHNlLCBpdCBtZWFucyBzaGlwIGxlbmd0aCBpcyBtb3JlIHRoYW4gMVxuLy8gbm93IHdlIGNhbiBjaGVjayBtYWluIGRpcmVjdGlvbiwgaG9yaXpvbnRhbGx5IGFuZCB2ZXJ0aWNhbGx5IGFuZCB3ZSB3aWxsIGdldCBkaXJlY3Rpb24gb2Ygc2hpcFxuLy8gYnV0IGZpcnN0bHkgY29tcHV0ZXIgaGFzIHRvIGZpcmUgaW4gNCBtYWluIGRpcmVjdGlvbnNcblxuXG4vLyBBbGdvcml0aG06XG4vLyAxKSBjaGVjayBpZiBzaGlwIHdhcyBzaXplIG9mIDEsIGlmIHRydWUsIHNoaXAgc2l6ZSB3YXMgb25seSAxLCBhbmQgd2UgY2FuIGdlbmVyYXRlIG5ldyByYW5kb20gY29vcmRzLCBvdGhlcndpc2UgLT5cbi8vIDIpIGZpcmUgaW4gNCBtYWluIGRpcmVjdGlvbnMgRS1XLU4tUyBhbmQgYWZ0ZXIgZWFjaCBvZiB0aGVtIGNoZWNrIGJvdGggZGlyZWN0aW9ucyBhbmQgZmluZGluZyBvdXQgd2hhdCBkaXJlY3Rpb24gb2Ygc2hpcFxuLy8gMykgQWZ0ZXIgZmluZGluZyBkaXJlY3Rpb24gb2Ygc2hpcCAtPiBjaGVjayB0aGVpciBzdGFydC0xIGFuZCBlbmQrMSBpZiB0aGV5IGFyZSB3YXRlciAtPiB0aGVuIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuLy8gb3RoZXJ3aXNlIHNoaXAgc2l6ZSB3YXMgMlxuLy8gNCkgUmVwZWF0IHByb2Nlc3MgZm9yIHNoaXAgd2l0aCBzaXplIDMgYW5kIDRcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVNYWluRGlyZWN0aW9ucyhib2FyZCwgeSwgeCl7XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIG1haW5TcXVhcmVzKXtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzcXVhcmVbMF0sIHggKyBzcXVhcmVbMV1dO1xuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh2YWxpZFNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBJc0hvcml6KGJvYXJkLCB5LCB4KSB7XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIGhvcml6U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpcElzVmVydChib2FyZCwgeSwgeCkge1xuICAgIGZvciAobGV0IHNxdWFyZSBvZiB2ZXJ0U3F1YXJlcykge1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7c2hpcE9mT25lU3VuaywgZmlyZU1haW5EaXJlY3Rpb25zLCBzaGlwSXNWZXJ0LCBzaGlwSXNIb3Jpen0iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5sZXQgc3Vycm91bmRpbmdTcXVhcmVzID0gW1xuICAgIFsxLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgMF0sXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMV0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgMV0sXG5dXG4vLyBqdXN0IGNvcHkgYXJyYXkgYWJvdmUgd2l0aCAuc2xpY2UgYW5kIHB1c2ggb25lIG1vcmUgc3F1YXJlIFswLDBdIGZvciBjaGVja0lmTm90RW1wdHkgZnVuY3Rpb25cbmxldCBwb3NzaWJsZVNxdWFyZXMgPSBzdXJyb3VuZGluZ1NxdWFyZXMuc2xpY2UoMCwgc3Vycm91bmRpbmdTcXVhcmVzLmxlbmd0aClcbnBvc3NpYmxlU3F1YXJlcy5wdXNoKFswLCAwXSlcblxuZnVuY3Rpb24gY2hlY2tCb3VuZGFyaWVzKFt4LCB5XSkge1xuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCAxMCkgJiYgKHkgPj0gMCAmJiB5IDwgMTApXG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICB0aGlzLnJvd3MgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBzaXplO1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIHRoaXMuZmlsbEJvYXJkKCk7IC8vIGZpbGxpbmcgYm9hcmQgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICB9XG5cbiAgICBmaWxsQm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldLnB1c2goJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJhbmRvbUNvb3JkcyhzaGlwKSB7XG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcbiAgICAgICAgbGV0IGxvb3BzID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gc21hbGwgb3B0aW1pemF0aW9uIG9mIGZpbmRpbmcgY29vcmRzXG4gICAgICAgICAgICBsb29wcyArPSAxO1xuICAgICAgICAgICAgaWYgKGxvb3BzID4gMjApe1xuICAgICAgICAgICAgICAgIHNoaXAuZGlyZWN0aW9uID0gc2hpcC5kaXJlY3Rpb24gPT09IDAgPyAxIDogMDtcbiAgICAgICAgICAgICAgICBsb29wcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDApIHsgLy8gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucm93cyk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmNvbHVtbnMgLSBzaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxseVxuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5yb3dzIC0gc2hpcC5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbid0IHB1dCBvdXIgc2hpcCBpbiByYW5nZSBvZiAoc2l6ZSBvZiBjb2x1bW5zIC0gc3RhcnQgY29vcmRpbmF0ZSBvZiBzaGlwKSwgdGhlbiB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgICAgICAvLyBpZiB3ZSBjYW4gcHV0IG91ciBzaGlwIGluIHRoaXMgcmFuZ2UsIGJ1dCBpZiBpbiByYW5nZSBvZiAtMSB0byArMSBzcXVhcmVzIGlzIG91ciBuZWlnaGJvdXIgc2hpcCwgd2UgZ2VuZXJhdGUgbmV3IGNvb3Jkc1xuICAgICAgICB9IHdoaWxlICghKHRoaXMuY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpKSlcblxuICAgICAgICByZXR1cm4gW3JhbmRvbVksIHJhbmRvbVhdO1xuICAgIH1cblxuICAgIGNoZWNrSWZOb3RFbXB0eShzaGlwLCByYW5kb21ZLCByYW5kb21YKSB7XG4gICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkgeyAvLyBob3JpelxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IHJhbmRvbVg7IGogPCByYW5kb21YICsgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3JhbmRvbVkgKyBzcXVhcmVbMF0sIGogKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsbHlcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzcXVhcmUgb2YgcG9zc2libGVTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtpICsgc3F1YXJlWzBdLCByYW5kb21YICsgc3F1YXJlWzFdXVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3ZhbGlkU3F1YXJlWzBdXVt2YWxpZFNxdWFyZVsxXV0gIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBwbGFjaW5nIHNoaXAgLT4gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyYW5kb21ZXVtqXSA9ICcjJztcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3JhbmRvbVksIGpdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm93IHdlIHBsYWNlIHNoaXAgdmVydGljYWxseSwgc28gd2UgaXRlcmF0ZSBvbmx5IGluIHJvd3NcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByYW5kb21ZOyBpIDwgcmFuZG9tWSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW3JhbmRvbVhdID0gJyMnO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbaSwgcmFuZG9tWF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcC5jb29yZHMgPSBzaGlwQ29vcmRzO1xuICAgIH1cblxuICAgIC8vIGhlbHBlciBmdW5jdGlvblxuICAgIHBsYWNlU2hpcHMoc2hpcHMpe1xuICAgICAgICBsZXQgaG9yaXpTdW0gPSAwXG4gICAgICAgIGxldCB2ZXJ0U3VtID0gMDtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uZGlyZWN0aW9uID09PSAwICkgaG9yaXpTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBlbHNlIHZlcnRTdW0gKz0gc2hpcHNbc2hpcF0ubGVuZ3RoXG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5kaXJlY3Rpb24gPSBob3JpelN1bSA+IDggPyAxIDogMFxuICAgICAgICAgICAgbGV0IFt5LCB4XSA9IHRoaXMuZ2V0UmFuZG9tQ29vcmRzKHNoaXBzW3NoaXBdKVxuICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcHNbc2hpcF0sIHksIHgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcywgc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5qrJyB8fFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5KiJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gdGVtcG9yYXJ5IHN0dWJcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb29yZHMgb2Ygc2hpcHNbc2hpcF0uY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0Nvb3Jkc1swXSA9PT0gY29vcmRzWzBdICYmIGF0dGFja0Nvb3Jkc1sxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW3NoaXBdLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9ICfwn5KiJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbc2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGlwICR7c2hpcH0gd2FzIHN1bmshYClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcHNbc2hpcF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfmqsnXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1ha2VTdXJyb3VuZGluZ1dhdGVyKHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHNoaXAuY29vcmRzW2ldXG4gICAgICAgICAgICBmb3IgKGxldCBzdXJyQ29vcmRzIG9mIHN1cnJvdW5kaW5nU3F1YXJlcykge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWzAsICsxXSwgWzAsIC0xXVxuICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGVkZ2UgY2FzZXMgWysxLCAwXSwgWy0xLCAwXVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDAgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMSkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAtMSkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAxICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IHNoaXAuY29vcmRzLmxlbmd0aCAtIDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IC0xICYmIHN1cnJDb29yZHNbMV0gPT09IDApICYmIGkgIT09IDApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbY29vcmRzWzBdICsgc3VyckNvb3Jkc1swXSwgY29vcmRzWzFdICsgc3VyckNvb3Jkc1sxXV1cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9ICfwn5qrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICByZXNldFNoaXBzKHNoaXBzKXtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcyl7XG4gICAgICAgICAgICBzaGlwc1tzaGlwXS5yZXNldEhpdHMoKTtcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLnJlc2V0Q29vcmRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnYW1lT3ZlcihzaGlwcykge1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBpZiAoIXNoaXBzW3NoaXBdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFNoaXBzKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyKVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXNldEhpdHMoKSB7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuICAgIHJlc2V0Q29vcmRzKCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgIH1cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoXG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xufVxuXG5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA0OHB4O1xufVxuXG5oMSB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLm5hbWVzIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5ib2FyZCB7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgd2lkdGg6IDM0MHB4O1xuICAgIGhlaWdodDogMzQwcHg7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLnVzZXItYm9hcmQge1xuICAgIG1hcmdpbi1sZWZ0OiA0OHB4O1xufVxuXG4udXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLnBjLWJvYXJkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XG59XG5cbi5wYywgLmVycm9yIHtcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoMjRweCArIDE3MHB4KTtcbn1cblxuLmNlbGwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcbn1cblxuLmZpcmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zdXJyb3VuZGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4uZXJyb3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBjb2xvcjogcmVkO1xuICAgIGZvbnQtc2l6ZTogODAlO1xufVxuXG5kaWFsb2cge1xuICAgIHdpZHRoOiAxMDAwcHg7XG4gICAgaGVpZ2h0OiAxNDVweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbmRpYWxvZzo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgIG9wYWNpdHk6IDAuODtcbn1cblxuLmRpYWxvZy1jb250ZW50IHtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDI0cHg7XG59XG5cbi5kaWFsb2ctY29udGVudCA+IHAge1xuICAgIGNvbG9yOiByb3lhbGJsdWU7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5yZXN0YXJ0LCAucmFuZG9tIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2UtaW4tb3V0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnJlc3RhcnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xuICAgIHdpZHRoOiAxNjBweDtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcbn1cblxuLnJhbmQtcG9zaXRpb24ge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSx3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyxZQUFZO0lBQ1osMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsMkJBQTJCO0lBQzNCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixhQUFhO0lBQ2IsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixvQ0FBb0M7SUFDcEMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XFxufVxcblxcbmgxIHtcXG4gICAgY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLm5hbWVzIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHdpZHRoOiAzNDBweDtcXG4gICAgaGVpZ2h0OiAzNDBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBwYWRkaW5nOiAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcXG59XFxuXFxuLnVzZXItYm9hcmQge1xcbiAgICBtYXJnaW4tbGVmdDogNDhweDtcXG59XFxuXFxuLnVzZXIge1xcbiAgICBtYXJnaW4tbGVmdDogY2FsYygyNHB4ICsgMTcwcHgpO1xcbn1cXG5cXG4ucGMtYm9hcmQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XFxufVxcblxcbi5wYywgLmVycm9yIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBjYWxjKDI0cHggKyAxNzBweCk7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIG9yYW5nZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wYy1ib2FyZCA+IC5jZWxsOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSk7XFxufVxcblxcbi5maXJlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnN1cnJvdW5kZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBjb2xvcjogcmVkO1xcbiAgICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuZGlhbG9nIHtcXG4gICAgd2lkdGg6IDEwMDBweDtcXG4gICAgaGVpZ2h0OiAxNDVweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWVmMTtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuZGlhbG9nOjpiYWNrZHJvcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCB7XFxuICAgIGhlaWdodDogMTQ1cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDI0cHg7XFxufVxcblxcbi5kaWFsb2ctY29udGVudCA+IHAge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLnJlc3RhcnQsIC5yYW5kb20ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlLWluLW91dDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuICAgIHBhZGRpbmc6IDE2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS43NXJlbTtcXG4gICAgd2lkdGg6IDE2MHB4O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoOTAlKTtcXG59XFxuXFxuLnJhbmQtcG9zaXRpb24ge1xcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHtzaGlwT2ZPbmVTdW5rLCBmaXJlTWFpbkRpcmVjdGlvbnMsIHNoaXBJc1ZlcnQsIHNoaXBJc0hvcml6fSBmcm9tIFwiLi9haS5qc1wiO1xuXG5jb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpXG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cnKVxuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0JylcbmNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKVxuXG5jb25zdCBwbGF5ZXJzID0ge1xuICAgIDA6IG5ldyBHYW1lYm9hcmQoMTApLFxuICAgIDE6IG5ldyBHYW1lYm9hcmQoMTApLFxufVxuXG4vLyBJIHdpbGwgdHJ5IHRvIG1ha2UgYW4gYWxnb3JpdGhtIGxhdGVyIHRvIG1ha2UgdGhlIGNvb3JkaW5hdGUgc2VhcmNoIHdvcmsgZm9yIGFsbCBzaGlwc1xuLy8gc28gZmFyIGl0IHdvcmtzIG9ubHkgaWYgeW91IGV4Y2x1ZGUgU2hpcCB3aXRoIHNpemUgMSBhbmQgMlxuY29uc3QgdXNlclNoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgJzUnOiBuZXcgU2hpcCgzKSxcbiAgICAnNic6IG5ldyBTaGlwKDMpLFxuICAgICcxMSc6IG5ldyBTaGlwKDIpLFxuICAgICcxMic6IG5ldyBTaGlwKDIpLFxuICAgICcxMyc6IG5ldyBTaGlwKDIpLFxuXG59XG5cbmNvbnN0IHBjU2hpcHMgPSB7XG4gICAgLy8gJzEnOiBuZXcgU2hpcCgxKSxcbiAgICAnMic6IG5ldyBTaGlwKDEpLFxuICAgICczJzogbmV3IFNoaXAoMSksXG4gICAgJzQnOiBuZXcgU2hpcCgxKSxcbiAgICAvLyAnNSc6IG5ldyBTaGlwKDIpLFxuICAgICc2JzogbmV3IFNoaXAoMiksXG4gICAgJzcnOiBuZXcgU2hpcCgyKSxcbiAgICAnOCc6IG5ldyBTaGlwKDMpLFxuICAgICc5JzogbmV3IFNoaXAoMyksXG4gICAgJzEwJzogbmV3IFNoaXAoNCksXG59XG5cbmxldCBhY3RpdmVQbGF5ZXIgPSAwO1xuXG5mdW5jdGlvbiBjaGFuZ2VQbGF5ZXIoKSB7XG4gICAgcmV0dXJuIGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gMCA/IDEgOiAwO1xufVxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwcyh1c2VyU2hpcHMpXG5cbmNoYW5nZVBsYXllcigpXG5cbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXBzKHBjU2hpcHMpXG5cbmNoYW5nZVBsYXllcigpO1xuXG5mdW5jdGlvbiB1c2VyUmVuZGVyKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYm9hcmQnKTtcbiAgICBjb25zdCBhY3RpdmUgPSBwbGF5ZXJzWzBdO1xuICAgIGJvYXJkLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlLnJvd3M7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjdGl2ZS5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+SoicpIGJ0bi5jbGFzc0xpc3QuYWRkKCdmaXJlZCcpXG4gICAgICAgICAgICBlbHNlIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5qrJykgYnRuLmNsYXNzTGlzdC5hZGQoJ3N1cnJvdW5kZWQnKVxuICAgICAgICAgICAgZWxzZSBidG4uY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGJ0bilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGNSZW5kZXIoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGMtYm9hcmQnKTtcbiAgICBjb25zdCBhY3RpdmUgPSBwbGF5ZXJzWzFdO1xuICAgIGJvYXJkLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlLnJvd3M7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjdGl2ZS5jb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAgICBidG4uZGF0YXNldC55ID0gYCR7aX1gO1xuICAgICAgICAgICAgYnRuLmRhdGFzZXQueCA9IGAke2p9YDtcbiAgICAgICAgICAgIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5KiJykge1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdmaXJlZCcpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfmqsnKSB7XG4gICAgICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3N1cnJvdW5kZWQnKVxuICAgICAgICAgICAgfSBlbHNlIGJ0bi5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaXJlVXNlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYy1ib2FyZCcpXG4gICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tIYW5kbGVyKVxufVxuXG5mdW5jdGlvbiBhdHRhY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkgJiYgZXZlbnQudGFyZ2V0LmRhdGFzZXQueCAmJiBhY3RpdmVQbGF5ZXIgPT09IDApIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1sxXVxuICAgICAgICBjb25zdCBzcXVhcmVZID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueTtcbiAgICAgICAgY29uc3Qgc3F1YXJlWCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICAgIGlmICghYWN0aXZlLnJlY2VpdmVBdHRhY2soWytzcXVhcmVZLCArc3F1YXJlWF0sIHBjU2hpcHMpKSB7IC8vIGlmIHRoaXMgc3F1YXJlIHdhcyBhdHRhY2tlZCBhbHJlYWR5XG4gICAgICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9IGAqU3F1YXJlICR7W3NxdWFyZVksIHNxdWFyZVhdfSBhbHJlYWR5IHdhcyBhdHRhY2tlZCFgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBsZXQgcGMgZmlyZSwgaWYgb3VyIGxhc3QgYXR0YWNrZWQgc3F1YXJlIHdhcyBhIGhpdFxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFsrc3F1YXJlWV1bK3NxdWFyZVhdID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmUucmVjZWl2ZUF0dGFjayhbK3NxdWFyZVksICtzcXVhcmVYXSwgcGNTaGlwcylcbiAgICAgICAgICAgICAgICBwY1JlbmRlcigpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUuZ2FtZU92ZXIocGNTaGlwcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yTXNnLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIHBjUmVuZGVyKCk7XG4gICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgICAgIGhhbmRsZUZpcmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG59XG5cbmZ1bmN0aW9uIHBjRmlyZSgpIHtcbiAgICBjb25zdCBhY3RpdmUgPSBwbGF5ZXJzWzBdO1xuICAgIGxldCB5LCB4O1xuICAgIGRvIHtcbiAgICAgICAgW3ksIHhdID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICB9IHdoaWxlICghYWN0aXZlLnJlY2VpdmVBdHRhY2soW3ksIHhdLCB1c2VyU2hpcHMpKTtcbiAgICBpZiAoYWN0aXZlLmJvYXJkW3ldW3hdID09PSAn8J+SoicpIHsgLy8gaWYgcGMgaGl0cyB1c2VyJ3Mgc2hpcFxuICAgICAgICBpZiAoYWN0aXZlLmdhbWVPdmVyKHBjU2hpcHMpKSB7XG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoaXBPZk9uZVN1bmsoYWN0aXZlLmJvYXJkLCB5LCB4KSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDEwMDApXG4gICAgICAgICAgICB1c2VyUmVuZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2hpcCB3aXRoIHNpemUgMSB3YXMgc3VuaycpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7IC8vIGlmIHNoaXAgZGlkIG5vdCBzaW5rLCBoaXMgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuICAgICAgICAgICAgY29uc3QgYm9hcmRGcm9tUGNWaWV3ID0gYWN0aXZlLmJvYXJkLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9ICcgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIHEgPSBmaXJlTWFpbkRpcmVjdGlvbnMoYm9hcmRGcm9tUGNWaWV3LCB5LCB4KVxuICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbeSwgeF1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc21hcnRQYyh5LCB4KSwgMTAwMCk7XG4gICAgICAgICAgICB1c2VyUmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXNlclJlbmRlcigpO1xuICAgIGNoYW5nZVBsYXllcigpO1xufVxuXG5sZXQgcSA9IFtdXG5sZXQgc3RhcnRDb29yZHMgPSBbXVxubGV0IHdhc0hpdCA9IGZhbHNlO1xuXG5cbi8vIG5vdCBmaW5pc2hlZCBiYWQgc29sdXRpb25cbmZ1bmN0aW9uIHNtYXJ0UGMoeSwgeCkge1xuICAgIGlmIChxLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdxIGlzIGVtcHR5JylcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYWN0aXZlID0gcGxheWVyc1swXVxuICAgIGlmICghc2hpcElzSG9yaXooYWN0aXZlLmJvYXJkLCB5LCB4KSB8fCAhc2hpcElzVmVydChhY3RpdmUuYm9hcmQsIHksIHgpKXtcbiAgICAgICAgY29uc3QgbmV4dFNxdWFyZSA9IHEuc2hpZnQoKVxuICAgICAgICBhY3RpdmUucmVjZWl2ZUF0dGFjayhuZXh0U3F1YXJlLCB1c2VyU2hpcHMpXG4gICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtuZXh0U3F1YXJlWzBdXVtuZXh0U3F1YXJlWzFdXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAvLyBpZiBzaGlwIHdhcyBzaXplIG9mIDJcbiAgICAgICAgICAgIC8vIHRyeWluZyB0byBmaW5kIGRpcmVjdGlvbiBvZiBzaGlwXG4gICAgICAgICAgICBjb25zdCBza2lwID0gW25leHRTcXVhcmVbMF0gLSBzdGFydENvb3Jkc1swXSwgbmV4dFNxdWFyZVsxXSAtIHN0YXJ0Q29vcmRzWzFdXVxuICAgICAgICAgICAgY29uc3Qgc2tpcDIgPSBbc3RhcnRDb29yZHNbMF0gLSBuZXh0U3F1YXJlWzBdLCBzdGFydENvb3Jkc1sxXSAtIG5leHRTcXVhcmVbMV1dXG4gICAgICAgICAgICBpZiAobmV4dFNxdWFyZVsxXSA+IHN0YXJ0Q29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hpcCBpcyBob3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICBpZiAoc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIHN0YXJ0Q29vcmRzWzBdLCBzdGFydENvb3Jkc1sxXSwgc2tpcCkgJiYgc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIG5leHRTcXVhcmVbMF0sIG5leHRTcXVhcmVbMV0sIHNraXAyKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaGlwIHdhcyBzdW5rXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHNpemUgaXMgbW9yZSB0aGFuIDJcbiAgICAgICAgICAgICAgICAgICAgcSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB3YXNIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Q29vcmRzWzFdIC0gMSA+PSAwKSBxLnB1c2goW3N0YXJ0Q29vcmRzWzBdLCBzdGFydENvb3Jkc1sxXSAtIDFdKVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNxdWFyZVsxXSArIDEgPD0gOSkgcS5wdXNoKFtuZXh0U3F1YXJlWzBdLCBuZXh0U3F1YXJlWzFdICsgMV0pXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc21hcnRQYyh5LCB4KSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRTcXVhcmVbMV0gPCBzdGFydENvb3Jkc1sxXSl7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBPZk9uZVN1bmsoYWN0aXZlLmJvYXJkLCBzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0sIHNraXAyKSAmJiBzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgbmV4dFNxdWFyZVswXSwgbmV4dFNxdWFyZVsxXSwgc2tpcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hpcCB3YXMgc3Vua1xuICAgICAgICAgICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHdhc0hpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBzaXplIGlzIG1vcmUgdGhhbiAyXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydENvb3Jkc1sxXSArIDEgPD0gOSkgcS5wdXNoKFtzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0gKyAxXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTcXVhcmVbMV0gLSAxID49IDApIHEucHVzaChbbmV4dFNxdWFyZVswXSwgbmV4dFNxdWFyZVsxXSAtIDFdKVxuICAgICAgICAgICAgICAgICAgICBzbWFydFBjKHksIHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0U3F1YXJlWzBdID4gc3RhcnRDb29yZHNbMF0pe1xuICAgICAgICAgICAgICAgIC8vIHNoaXAgaXMgdmVydGljYWxseVxuICAgICAgICAgICAgICAgIGlmIChzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgc3RhcnRDb29yZHNbMF0sIHN0YXJ0Q29vcmRzWzFdLCBza2lwKSAmJiBzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgbmV4dFNxdWFyZVswXSwgbmV4dFNxdWFyZVsxXSwgc2tpcDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNoaXAgd2FzIHN1bmtcbiAgICAgICAgICAgICAgICAgICAgcSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB3YXNIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChwY0ZpcmUsIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuICAgICAgICAgICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICAgICAgICAgIHdhc0hpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRDb29yZHNbMF0gLSAxID49IDApIHEucHVzaChbc3RhcnRDb29yZHNbMF0gLSAxLCBzdGFydENvb3Jkc1sxXV0pXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3F1YXJlWzFdICsgMSA8PSA5KSBxLnB1c2goW25leHRTcXVhcmVbMF0gKyAxLCBuZXh0U3F1YXJlWzFdXSlcbiAgICAgICAgICAgICAgICAgICAgc21hcnRQYyh5LCB4KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFNxdWFyZVswXSA8IHN0YXJ0Q29vcmRzWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hpcCBpcyB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBPZk9uZVN1bmsoYWN0aXZlLmJvYXJkLCBzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0sIHNraXAyKSAmJiBzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgbmV4dFNxdWFyZVswXSwgbmV4dFNxdWFyZVsxXSwgc2tpcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hpcCB3YXMgc3Vua1xuICAgICAgICAgICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHdhc0hpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBzaXplIGlzIG1vcmUgdGhhbiAyXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydENvb3Jkc1swXSArIDEgPD0gOSkgcS5wdXNoKFtzdGFydENvb3Jkc1swXSArIDEsIHN0YXJ0Q29vcmRzWzFdXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTcXVhcmVbMF0gLSAxID49IDApIHEucHVzaChbbmV4dFNxdWFyZVswXSAtIDEsIG5leHRTcXVhcmVbMV1dKVxuICAgICAgICAgICAgICAgICAgICBzbWFydFBjKHksIHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHEpKVxuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNoaXBJc0hvcml6KGFjdGl2ZS5ib2FyZCwgeSwgeCkpIHtcbiAgICAgICAgY29uc3QgaG9yTmV4dFNxdWFyZSA9IHEuc2hpZnQoKTtcbiAgICAgICAgYWN0aXZlLnJlY2VpdmVBdHRhY2soaG9yTmV4dFNxdWFyZSwgdXNlclNoaXBzKTtcbiAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW2hvck5leHRTcXVhcmVbMF1dW2hvck5leHRTcXVhcmVbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgIC8vIGlmIHNoaXAgd2FzIHNpemUgb2YgM1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NoaXAgd2l0aCBzaXplIG9mIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICBzdGFydENvb3JkcyA9IFtdO1xuICAgICAgICAgICAgcGNGaXJlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNIaXQgPSB0cnVlO1xuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB3YXNIaXQgPSB0cnVlO1xuICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc2hpcElzVmVydChhY3RpdmUuYm9hcmQsIHksIHgpKXtcbiAgICAgICAgY29uc3QgdmVyTmV4dFNxdWFyZSA9IHEuc2hpZnQoKTtcbiAgICAgICAgYWN0aXZlLnJlY2VpdmVBdHRhY2sodmVyTmV4dFNxdWFyZSwgdXNlclNoaXBzKTtcbiAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW3Zlck5leHRTcXVhcmVbMF1dW3Zlck5leHRTcXVhcmVbMV1dID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgIC8vIGlmIHNoaXAgd2FzIHNpemUgb2YgM1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NoaXAgd2l0aCBzaXplIG9mIDMgd2FzIHN1bmsnKVxuICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICBzdGFydENvb3JkcyA9IFtdO1xuICAgICAgICAgICAgcGNGaXJlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNIaXQgPSB0cnVlO1xuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB3YXNIaXQgPSB0cnVlO1xuICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVGaXJlKCkge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IDApIHtcbiAgICAgICAgZmlyZVVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVBsYXllciA9PT0gMSAmJiB3YXNIaXQpIHtcbiAgICAgICAgc21hcnRQYyhzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBjRmlyZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgcGxheWVyc1swXS5maWxsQm9hcmQoKTtcbiAgICAgICAgcGxheWVyc1sxXS5maWxsQm9hcmQoKTtcblxuICAgICAgICBwbGF5ZXJzWzBdLnBsYWNlU2hpcHModXNlclNoaXBzKTtcbiAgICAgICAgcGxheWVyc1sxXS5wbGFjZVNoaXBzKHBjU2hpcHMpO1xuXG4gICAgICAgIHNjcmVlbkNvbnRyb2xsZXIoKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByYW5kb20oKSB7XG4gICAgcmFuZG9tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbGF5ZXJzWzBdLmZpbGxCb2FyZCgpO1xuICAgICAgICBwbGF5ZXJzWzFdLmZpbGxCb2FyZCgpO1xuXG4gICAgICAgIHBsYXllcnNbMF0ucmVzZXRTaGlwcyh1c2VyU2hpcHMpO1xuICAgICAgICBwbGF5ZXJzWzFdLnJlc2V0U2hpcHMocGNTaGlwcyk7XG5cbiAgICAgICAgcGxheWVyc1swXS5wbGFjZVNoaXBzKHVzZXJTaGlwcyk7XG4gICAgICAgIHBsYXllcnNbMV0ucGxhY2VTaGlwcyhwY1NoaXBzKTtcbiAgICAgICAgc2NyZWVuQ29udHJvbGxlcigpO1xuICAgIH0pXG59XG5cbnJlc3RhcnQoKTtcbnJhbmRvbSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcigpIHtcbiAgICB1c2VyUmVuZGVyKCk7XG4gICAgcGNSZW5kZXIoKTtcbiAgICBoYW5kbGVGaXJlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgXCIuL3N0eWxlL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgc2NyZWVuQ29udHJvbGxlciBmcm9tIFwiLi9sb2dpYy91aS5tanNcIjtcblxuc2NyZWVuQ29udHJvbGxlcigpXG5cbiJdLCJuYW1lcyI6WyJzdXJyb3VuZGluZ1NxdWFyZXMiLCJkaWFnb25hbFNxdWFyZXMiLCJtYWluU3F1YXJlcyIsImhvcml6U3F1YXJlcyIsInZlcnRTcXVhcmVzIiwiY2hlY2tCb3VuZGFyaWVzIiwiX3JlZiIsIngiLCJ5Iiwic2hpcE9mT25lU3VuayIsImJvYXJkIiwic2tpcCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInN1cnJDb29yZHMiLCJ2YWxpZFNxdWFyZSIsImZpcmVNYWluRGlyZWN0aW9ucyIsIm91dHB1dCIsInNxdWFyZSIsInB1c2giLCJzaGlwSXNIb3JpeiIsInNoaXBJc1ZlcnQiLCJwb3NzaWJsZVNxdWFyZXMiLCJzbGljZSIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwic2l6ZSIsInJvd3MiLCJjb2x1bW5zIiwiZmlsbEJvYXJkIiwiaSIsImoiLCJnZXRSYW5kb21Db29yZHMiLCJzaGlwIiwicmFuZG9tWSIsInJhbmRvbVgiLCJsb29wcyIsImRpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNoZWNrSWZOb3RFbXB0eSIsInBsYWNlU2hpcCIsInNoaXBDb29yZHMiLCJjb29yZHMiLCJwbGFjZVNoaXBzIiwic2hpcHMiLCJob3JpelN1bSIsInZlcnRTdW0iLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwiaGl0IiwiaXNTdW5rIiwiY29uc29sZSIsImxvZyIsIm1ha2VTdXJyb3VuZGluZ1dhdGVyIiwicmVzZXRTaGlwcyIsInJlc2V0SGl0cyIsInJlc2V0Q29vcmRzIiwiZ2FtZU92ZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiU2hpcCIsImhpdHMiLCJlcnJvck1zZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpYWxvZyIsInJlc3RhcnRCdG4iLCJyYW5kb21CdG4iLCJwbGF5ZXJzIiwidXNlclNoaXBzIiwicGNTaGlwcyIsImFjdGl2ZVBsYXllciIsImNoYW5nZVBsYXllciIsInVzZXJSZW5kZXIiLCJhY3RpdmUiLCJpbm5lckhUTUwiLCJidG4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInBjUmVuZGVyIiwiZGF0YXNldCIsImZpcmVVc2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFja0hhbmRsZXIiLCJldmVudCIsInRhcmdldCIsInNxdWFyZVkiLCJzcXVhcmVYIiwic2hvd01vZGFsIiwiaGFuZGxlRmlyZSIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGNGaXJlIiwic2V0VGltZW91dCIsImJvYXJkRnJvbVBjVmlldyIsIm1hcCIsInJvdyIsImNlbGwiLCJxIiwic3RhcnRDb29yZHMiLCJzbWFydFBjIiwid2FzSGl0IiwibmV4dFNxdWFyZSIsInNoaWZ0Iiwic2tpcDIiLCJKU09OIiwic3RyaW5naWZ5IiwiaG9yTmV4dFNxdWFyZSIsInZlck5leHRTcXVhcmUiLCJyZXN0YXJ0IiwiY2xvc2UiLCJzY3JlZW5Db250cm9sbGVyIl0sInNvdXJjZVJvb3QiOiIifQ==