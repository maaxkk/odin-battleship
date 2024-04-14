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
  '6': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '7': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '8': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '11': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '12': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '13': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '14': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '5': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2)
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
    if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, y, x)) {
      setTimeout(pcFire, 1000);
      userRender();
      console.log('ship with size 1 was sunk');
      return;
    } else {
      const boardFromPcView = active.board.map(row => row.map(cell => {
        if (cell === '#') {
          cell = ' ';
        }
        return cell;
      }));
      q = (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.fireMainDirections)(boardFromPcView, y, x);
      startCoords = [y, x];
      setTimeout(() => smartPc(y, x), 500);
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
          setTimeout(pcFire, 500);
          return;
        } else {
          // if size is more than 2
        }
      } else if (nextSquare[1] < startCoords[1]) {
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip2) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 500);
          return;
        } else {
          // if size is more than 2
        }
      } else if (nextSquare[0] > startCoords[0]) {
        // ship is vertically
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip2)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 500);
          return;
        } else {
          // if size is more than 2
        }
      } else if (nextSquare[0] < startCoords[0]) {
        // ship is vertically
        if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, startCoords[0], startCoords[1], skip2) && (0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipOfOneSunk)(active.board, nextSquare[0], nextSquare[1], skip)) {
          // ship was sunk
          q = [];
          startCoords = [];
          wasHit = false;
          setTimeout(pcFire, 500);
          return;
        } else {
          // if size is more than 2
        }
      }
    } else {
      wasHit = true;
      console.log(JSON.stringify(q));
      changePlayer();
    }
  }
  if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsHoriz)(active.board, y, x)) {} else if ((0,_ai_js__WEBPACK_IMPORTED_MODULE_2__.shipIsVert)(active.board, y, x)) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUMsQ0FBQ2QsVUFBVSxDQUFDZSxTQUFTLENBQUM7SUFDaENELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ2QsVUFBVSxDQUFDZ0IsT0FBTyxDQUFDO0lBRTlCRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUN6QixVQUFVLENBQUMwQixTQUFTLENBQUM7SUFDaENELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3pCLFVBQVUsQ0FBQzJCLE9BQU8sQ0FBQztJQUM5QnlDLGdCQUFnQixDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0FBQ047QUFFQUYsT0FBTyxDQUFDLENBQUM7QUFDVHZFLE1BQU0sQ0FBQyxDQUFDO0FBRUQsU0FBU3lFLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQy9CdEMsVUFBVSxDQUFDLENBQUM7RUFDWlMsUUFBUSxDQUFDLENBQUM7RUFDVlUsVUFBVSxDQUFDLENBQUM7QUFDaEI7QUFFQSxpRUFBZW1CLGdCQUFnQjs7Ozs7O1VDblMvQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FhOztBQUVjO0FBRW1CO0FBRTlDQSx5REFBZ0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvYWkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvc3R5bGUvc3R5bGUuY3NzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL3N0eWxlL3N0eWxlLmNzcz9jOWYwIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vc3JjL2xvZ2ljL3VpLm1qcyIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBzdXJyb3VuZGluZ1NxdWFyZXMgPSBbXG4gICAgLy8gZGlhZ1xuICAgIFsxLCAtMV0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzEsIDFdLFxuICAgIFstMSwgMV0sXG4gICAgLy8gaG9yaXpcbiAgICBbMCwgLTFdLFxuICAgIFswLCAxXSxcbiAgICAvLyB2ZXJ0XG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMF0sXG5cbl1cblxubGV0IGRpYWdvbmFsU3F1YXJlcyA9IFtcbiAgICBbMSwgLTFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAxXSxcbiAgICBbLTEsIDFdLFxuXVxuXG5sZXQgbWFpblNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMSwgMF0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgMF0sXG5dXG5cbmxldCBob3JpelNxdWFyZXMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbMCwgMV0sXG5dXG5cbmxldCB2ZXJ0U3F1YXJlcyA9IFtcbiAgICBbLTEsIDBdLFxuICAgIFsxLCAwXSxcbl1cblxuZnVuY3Rpb24gY2hlY2tCb3VuZGFyaWVzKFt4LCB5XSkge1xuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCAxMCkgJiYgKHkgPj0gMCAmJiB5IDwgMTApXG59XG5cbi8vIGNoZWNrIGlmIHNoaXAgd2l0aCBsZW5ndGggMSBpcyBTdW5rIGFuZCBhbHNvIGNoZWNrcyBpZiBsZW5ndGggb2Ygc2hpcCBpcyBtb3JlIHRoYW4gMVxuLy8gSWYgYWZ0ZXIgaGl0dGluZyBzaGlwLCB3YXRlciBvdXRzaWRlIHNoaXAgaXMgbm90IHN1cnJvdW5kZWQsIGl0IG1lYW5zIHNoaXAgc2l6ZSBpcyBtb3JlIHRoYW4gMVxuXG4vLyBzaGlwIHdpdGggc2l6ZSBvZiAxIGlzIGVkZ2UgY2FzZSwgd2UgY2hlY2sgZXZlcnkgc3F1YXJlIG91dHNpZGUgb2YgdGhpcyBzaGlwXG5leHBvcnQgZnVuY3Rpb24gc2hpcE9mT25lU3Vuayhib2FyZCwgeSwgeCwgc2tpcCA9IFsxMDAsIDEwMF0pIHtcbiAgICBmb3IgKGxldCBzdXJyQ29vcmRzIG9mIHN1cnJvdW5kaW5nU3F1YXJlcykge1xuICAgICAgICBpZiAoc3VyckNvb3Jkc1swXSA9PT0gc2tpcFswXSAmJiBzdXJyQ29vcmRzWzFdID09PSBza2lwWzFdKSBjb250aW51ZTtcbiAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3kgKyBzdXJyQ29vcmRzWzBdLCB4ICsgc3VyckNvb3Jkc1sxXV1cbiAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSBjb250aW51ZTtcbiAgICAgICAgZWxzZSBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGlmIGZ1bmN0aW9uIGFib3ZlIHJldHVybnMgZmFsc2UsIGl0IG1lYW5zIHNoaXAgbGVuZ3RoIGlzIG1vcmUgdGhhbiAxXG4vLyBub3cgd2UgY2FuIGNoZWNrIG1haW4gZGlyZWN0aW9uLCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkgYW5kIHdlIHdpbGwgZ2V0IGRpcmVjdGlvbiBvZiBzaGlwXG4vLyBidXQgZmlyc3RseSBjb21wdXRlciBoYXMgdG8gZmlyZSBpbiA0IG1haW4gZGlyZWN0aW9uc1xuXG5cbi8vIEFsZ29yaXRobTpcbi8vIDEpIGNoZWNrIGlmIHNoaXAgd2FzIHNpemUgb2YgMSwgaWYgdHJ1ZSwgc2hpcCBzaXplIHdhcyBvbmx5IDEsIGFuZCB3ZSBjYW4gZ2VuZXJhdGUgbmV3IHJhbmRvbSBjb29yZHMsIG90aGVyd2lzZSAtPlxuLy8gMikgZmlyZSBpbiA0IG1haW4gZGlyZWN0aW9ucyBFLVctTi1TIGFuZCBhZnRlciBlYWNoIG9mIHRoZW0gY2hlY2sgYm90aCBkaXJlY3Rpb25zIGFuZCBmaW5kaW5nIG91dCB3aGF0IGRpcmVjdGlvbiBvZiBzaGlwXG4vLyAzKSBBZnRlciBmaW5kaW5nIGRpcmVjdGlvbiBvZiBzaGlwIC0+IGNoZWNrIHRoZWlyIHN0YXJ0LTEgYW5kIGVuZCsxIGlmIHRoZXkgYXJlIHdhdGVyIC0+IHRoZW4gc2hpcCBzaXplIGlzIG1vcmUgdGhhbiAyXG4vLyBvdGhlcndpc2Ugc2hpcCBzaXplIHdhcyAyXG4vLyA0KSBSZXBlYXQgcHJvY2VzcyBmb3Igc2hpcCB3aXRoIHNpemUgMyBhbmQgNFxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZU1haW5EaXJlY3Rpb25zKGJvYXJkLCB5LCB4KXtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgbWFpblNxdWFyZXMpe1xuICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbeSArIHNxdWFyZVswXSwgeCArIHNxdWFyZVsxXV07XG4gICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkgY29udGludWU7XG4gICAgICAgIGlmIChib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID09PSAnICcpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKHZhbGlkU3F1YXJlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpcElzSG9yaXooYm9hcmQsIHksIHgpIHtcbiAgICBmb3IgKGxldCBzcXVhcmUgb2YgaG9yaXpTcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXVxuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlwSXNWZXJ0KGJvYXJkLCB5LCB4KSB7XG4gICAgZm9yIChsZXQgc3F1YXJlIG9mIHZlcnRTcXVhcmVzKSB7XG4gICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFt5ICsgc3F1YXJlWzBdLCB4ICsgc3F1YXJlWzFdXVxuICAgICAgICBpZiAoIWNoZWNrQm91bmRhcmllcyh2YWxpZFNxdWFyZSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtzaGlwT2ZPbmVTdW5rLCBmaXJlTWFpbkRpcmVjdGlvbnMsIHNoaXBJc1ZlcnQsIHNoaXBJc0hvcml6fSIsIlwidXNlIHN0cmljdFwiO1xuXG5cbmxldCBzdXJyb3VuZGluZ1NxdWFyZXMgPSBbXG4gICAgWzEsIC0xXSxcbiAgICBbMCwgLTFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAwXSxcbiAgICBbLTEsIDBdLFxuICAgIFsxLCAxXSxcbiAgICBbMCwgMV0sXG4gICAgWy0xLCAxXSxcbl1cbi8vIGp1c3QgY29weSBhcnJheSBhYm92ZSB3aXRoIC5zbGljZSBhbmQgcHVzaCBvbmUgbW9yZSBzcXVhcmUgWzAsMF0gZm9yIGNoZWNrSWZOb3RFbXB0eSBmdW5jdGlvblxubGV0IHBvc3NpYmxlU3F1YXJlcyA9IHN1cnJvdW5kaW5nU3F1YXJlcy5zbGljZSgwLCBzdXJyb3VuZGluZ1NxdWFyZXMubGVuZ3RoKVxucG9zc2libGVTcXVhcmVzLnB1c2goWzAsIDBdKVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kYXJpZXMoW3gsIHldKSB7XG4gICAgcmV0dXJuICh4ID49IDAgJiYgeCA8IDEwKSAmJiAoeSA+PSAwICYmIHkgPCAxMClcbn1cblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMucm93cyA9IHNpemU7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IHNpemU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5maWxsQm9hcmQoKTsgLy8gZmlsbGluZyBib2FyZCBhZnRlciBpbml0aWFsaXphdGlvblxuICAgIH1cblxuICAgIGZpbGxCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaCgnICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tQ29vcmRzKHNoaXApIHtcbiAgICAgICAgbGV0IHJhbmRvbVk7XG4gICAgICAgIGxldCByYW5kb21YO1xuICAgICAgICBsZXQgbG9vcHMgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvLyBzbWFsbCBvcHRpbWl6YXRpb24gb2YgZmluZGluZyBjb29yZHNcbiAgICAgICAgICAgIGxvb3BzICs9IDE7XG4gICAgICAgICAgICBpZiAobG9vcHMgPiAyMCl7XG4gICAgICAgICAgICAgICAgc2hpcC5kaXJlY3Rpb24gPSBzaGlwLmRpcmVjdGlvbiA9PT0gMCA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIGxvb3BzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkgeyAvLyBob3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5yb3dzKTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuY29sdW1ucyAtIHNoaXAubGVuZ3RoKSk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLnJvd3MgLSBzaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgd2UgY2FuJ3QgcHV0IG91ciBzaGlwIGluIHJhbmdlIG9mIChzaXplIG9mIGNvbHVtbnMgLSBzdGFydCBjb29yZGluYXRlIG9mIHNoaXApLCB0aGVuIHdlIGdlbmVyYXRlIG5ldyBjb29yZHNcbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbiBwdXQgb3VyIHNoaXAgaW4gdGhpcyByYW5nZSwgYnV0IGlmIGluIHJhbmdlIG9mIC0xIHRvICsxIHNxdWFyZXMgaXMgb3VyIG5laWdoYm91ciBzaGlwLCB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgIH0gd2hpbGUgKCEodGhpcy5jaGVja0lmTm90RW1wdHkoc2hpcCwgcmFuZG9tWSwgcmFuZG9tWCkpKVxuXG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7IC8vIGhvcml6XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3F1YXJlIG9mIHBvc3NpYmxlU3F1YXJlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbcmFuZG9tWSArIHNxdWFyZVswXSwgaiArIHNxdWFyZVsxXV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gdmVydGljYWxseVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmRvbVk7IGkgPCByYW5kb21ZICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW2kgKyBzcXVhcmVbMF0sIHJhbmRvbVggKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyYW5kb21ZLCByYW5kb21YXTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCwgcmFuZG9tWSwgcmFuZG9tWCkge1xuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIHBsYWNpbmcgc2hpcCAtPiBob3Jpem9udGFsbHlcbiAgICAgICAgICAgIGZvciAobGV0IGogPSByYW5kb21YOyBqIDwgcmFuZG9tWCArIHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3JhbmRvbVldW2pdID0gJyMnO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbcmFuZG9tWSwgal0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBub3cgd2UgcGxhY2Ugc2hpcCB2ZXJ0aWNhbGx5LCBzbyB3ZSBpdGVyYXRlIG9ubHkgaW4gcm93c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmRvbVk7IGkgPCByYW5kb21ZICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bcmFuZG9tWF0gPSAnIyc7XG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtpLCByYW5kb21YXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwLmNvb3JkcyA9IHNoaXBDb29yZHM7XG4gICAgfVxuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uXG4gICAgcGxhY2VTaGlwcyhzaGlwcyl7XG4gICAgICAgIGxldCBob3JpelN1bSA9IDBcbiAgICAgICAgbGV0IHZlcnRTdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKXtcbiAgICAgICAgICAgIGlmIChzaGlwc1tzaGlwXS5kaXJlY3Rpb24gPT09IDAgKSBob3JpelN1bSArPSBzaGlwc1tzaGlwXS5sZW5ndGhcbiAgICAgICAgICAgIGVsc2UgdmVydFN1bSArPSBzaGlwc1tzaGlwXS5sZW5ndGhcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLmRpcmVjdGlvbiA9IGhvcml6U3VtID4gOCA/IDEgOiAwXG4gICAgICAgICAgICBsZXQgW3ksIHhdID0gdGhpcy5nZXRSYW5kb21Db29yZHMoc2hpcHNbc2hpcF0pXG4gICAgICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwc1tzaGlwXSwgeSwgeClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRzLCBzaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9PT0gJ/CfmqsnIHx8XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2F0dGFja0Nvb3Jkc1swXV1bYXR0YWNrQ29vcmRzWzFdXSA9PT0gJ/CfkqInXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0ZW1wb3Jhcnkgc3R1YlxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvb3JkcyBvZiBzaGlwc1tzaGlwXS5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgYXR0YWNrQ29vcmRzWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbc2hpcF0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfkqInXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNoaXAgJHtzaGlwfSB3YXMgc3VuayFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlU3Vycm91bmRpbmdXYXRlcihzaGlwc1tzaGlwXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPSAn8J+aqydcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gc2hpcC5jb29yZHNbaV1cbiAgICAgICAgICAgIGZvciAobGV0IHN1cnJDb29yZHMgb2Ygc3Vycm91bmRpbmdTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbMCwgKzFdLCBbMCwgLTFdXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbKzEsIDBdLCBbLTEsIDBdXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAxKSAmJiBpICE9PSBzaGlwLmNvb3Jkcy5sZW5ndGggLSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAwICYmIHN1cnJDb29yZHNbMV0gPT09IC0xKSAmJiBpICE9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gLTEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtjb29yZHNbMF0gKyBzdXJyQ29vcmRzWzBdLCBjb29yZHNbMV0gKyBzdXJyQ29vcmRzWzFdXVxuICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID0gJ/CfmqsnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHJlc2V0U2hpcHMoc2hpcHMpe1xuICAgICAgICBmb3IgKGxldCBzaGlwIGluIHNoaXBzKXtcbiAgICAgICAgICAgIHNoaXBzW3NoaXBdLnJlc2V0SGl0cygpO1xuICAgICAgICAgICAgc2hpcHNbc2hpcF0ucmVzZXRDb29yZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdhbWVPdmVyKHNoaXBzKSB7XG4gICAgICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIGlmICghc2hpcHNbc2hpcF0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0U2hpcHMoc2hpcHMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjIpXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlc2V0SGl0cygpIHtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICB9XG4gICAgcmVzZXRDb29yZHMoKSB7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgfVxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGhcbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG59XG5cbmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XG59XG5cbmgxIHtcbiAgICBjb2xvcjogcm95YWxibHVlO1xufVxuXG4ubmFtZXMge1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBjb2xvcjogcm95YWxibHVlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmJvYXJkIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICB3aWR0aDogMzQwcHg7XG4gICAgaGVpZ2h0OiAzNDBweDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xufVxuXG4udXNlci1ib2FyZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDQ4cHg7XG59XG5cbi51c2VyIHtcbiAgICBtYXJnaW4tbGVmdDogY2FsYygyNHB4ICsgMTcwcHgpO1xufVxuXG4ucGMtYm9hcmQge1xuICAgIG1hcmdpbi1yaWdodDogNDhweDtcbn1cblxuLnBjLCAuZXJyb3Ige1xuICAgIG1hcmdpbi1yaWdodDogY2FsYygyNHB4ICsgMTcwcHgpO1xufVxuXG4uY2VsbCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBvcmFuZ2U7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnBjLWJvYXJkID4gLmNlbGw6aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg4MCUpO1xufVxuXG4uZmlyZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnN1cnJvdW5kZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5lcnJvciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC1zaXplOiA4MCU7XG59XG5cbmRpYWxvZyB7XG4gICAgd2lkdGg6IDEwMDBweDtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBlZWYxO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cblxuZGlhbG9nOjpiYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgb3BhY2l0eTogMC44O1xufVxuXG4uZGlhbG9nLWNvbnRlbnQge1xuICAgIGhlaWdodDogMTQ1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMjRweDtcbn1cblxuLmRpYWxvZy1jb250ZW50ID4gcCB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLnJlc3RhcnQsIC5yYW5kb20ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4xNXMgZWFzZS1pbi1vdXQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucmVzdGFydCB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBmb250LXNpemU6IDEuNzVyZW07XG4gICAgd2lkdGg6IDE2MHB4O1xufVxuXG5idXR0b246aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg5MCUpO1xufVxuXG4ucmFuZC1wb3NpdGlvbiB7XG4gICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cblxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLFlBQVk7SUFDWiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLGFBQWE7SUFDYixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLG9DQUFvQztJQUNwQyxlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgbWFyZ2luLWJvdHRvbTogNDhweDtcXG59XFxuXFxuaDEge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbn1cXG5cXG4ubmFtZXMge1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGNvbG9yOiByb3lhbGJsdWU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgd2lkdGg6IDM0MHB4O1xcbiAgICBoZWlnaHQ6IDM0MHB4O1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIHBhZGRpbmc6IDJweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcm95YWxibHVlO1xcbn1cXG5cXG4udXNlci1ib2FyZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA0OHB4O1xcbn1cXG5cXG4udXNlciB7XFxuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDI0cHggKyAxNzBweCk7XFxufVxcblxcbi5wYy1ib2FyZCB7XFxuICAgIG1hcmdpbi1yaWdodDogNDhweDtcXG59XFxuXFxuLnBjLCAuZXJyb3Ige1xcbiAgICBtYXJnaW4tcmlnaHQ6IGNhbGMoMjRweCArIDE3MHB4KTtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBjLWJvYXJkID4gLmNlbGw6aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcXG59XFxuXFxuLmZpcmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3Vycm91bmRlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5lcnJvciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGNvbG9yOiByZWQ7XFxuICAgIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG5kaWFsb2cge1xcbiAgICB3aWR0aDogMTAwMHB4O1xcbiAgICBoZWlnaHQ6IDE0NXB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBlZWYxO1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG5kaWFsb2c6OmJhY2tkcm9wIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLmRpYWxvZy1jb250ZW50IHtcXG4gICAgaGVpZ2h0OiAxNDVweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMjRweDtcXG59XFxuXFxuLmRpYWxvZy1jb250ZW50ID4gcCB7XFxuICAgIGNvbG9yOiByb3lhbGJsdWU7XFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4ucmVzdGFydCwgLnJhbmRvbSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJveWFsYmx1ZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2UtaW4tb3V0O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5yZXN0YXJ0IHtcXG4gICAgcGFkZGluZzogMTZweDtcXG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xcbiAgICB3aWR0aDogMTYwcHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcyg5MCUpO1xcbn1cXG5cXG4ucmFuZC1wb3NpdGlvbiB7XFxuICAgIG1hcmdpbi10b3A6IDI0cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQge3NoaXBPZk9uZVN1bmssIGZpcmVNYWluRGlyZWN0aW9ucywgc2hpcElzVmVydCwgc2hpcElzSG9yaXp9IGZyb20gXCIuL2FpLmpzXCI7XG5cbmNvbnN0IGVycm9yTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpXG5jb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQnKVxuY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbScpXG5cbmNvbnN0IHBsYXllcnMgPSB7XG4gICAgMDogbmV3IEdhbWVib2FyZCgxMCksXG4gICAgMTogbmV3IEdhbWVib2FyZCgxMCksXG59XG5cbi8vIEkgd2lsbCB0cnkgdG8gbWFrZSBhbiBhbGdvcml0aG0gbGF0ZXIgdG8gbWFrZSB0aGUgY29vcmRpbmF0ZSBzZWFyY2ggd29yayBmb3IgYWxsIHNoaXBzXG4vLyBzbyBmYXIgaXQgd29ya3Mgb25seSBpZiB5b3UgZXhjbHVkZSBTaGlwIHdpdGggc2l6ZSAxIGFuZCAyXG5jb25zdCB1c2VyU2hpcHMgPSB7XG4gICAgLy8gJzEnOiBuZXcgU2hpcCgxKSxcbiAgICAnMic6IG5ldyBTaGlwKDEpLFxuICAgICczJzogbmV3IFNoaXAoMSksXG4gICAgJzQnOiBuZXcgU2hpcCgxKSxcbiAgICAnNic6IG5ldyBTaGlwKDEpLFxuICAgICc3JzogbmV3IFNoaXAoMSksXG4gICAgJzgnOiBuZXcgU2hpcCgxKSxcbiAgICAnMTEnOiBuZXcgU2hpcCgyKSxcbiAgICAnMTInOiBuZXcgU2hpcCgyKSxcbiAgICAnMTMnOiBuZXcgU2hpcCgyKSxcbiAgICAnMTQnOiBuZXcgU2hpcCgyKSxcbiAgICAnNSc6IG5ldyBTaGlwKDIpLFxufVxuXG5jb25zdCBwY1NoaXBzID0ge1xuICAgIC8vICcxJzogbmV3IFNoaXAoMSksXG4gICAgJzInOiBuZXcgU2hpcCgxKSxcbiAgICAnMyc6IG5ldyBTaGlwKDEpLFxuICAgICc0JzogbmV3IFNoaXAoMSksXG4gICAgLy8gJzUnOiBuZXcgU2hpcCgyKSxcbiAgICAnNic6IG5ldyBTaGlwKDIpLFxuICAgICc3JzogbmV3IFNoaXAoMiksXG4gICAgJzgnOiBuZXcgU2hpcCgzKSxcbiAgICAnOSc6IG5ldyBTaGlwKDMpLFxuICAgICcxMCc6IG5ldyBTaGlwKDQpLFxufVxuXG5sZXQgYWN0aXZlUGxheWVyID0gMDtcblxuZnVuY3Rpb24gY2hhbmdlUGxheWVyKCkge1xuICAgIHJldHVybiBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcbn1cblxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcHModXNlclNoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKVxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwcyhwY1NoaXBzKVxuXG5jaGFuZ2VQbGF5ZXIoKTtcblxuZnVuY3Rpb24gdXNlclJlbmRlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtpXVtqXSA9PT0gJ/CfkqInKSBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+aqycpIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIGVsc2UgYnRuLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gYWN0aXZlLmJvYXJkW2ldW2pdXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBjUmVuZGVyKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBjLWJvYXJkJyk7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1sxXTtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZS5yb3dzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUuY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgYnRuLmRhdGFzZXQueSA9IGAke2l9YDtcbiAgICAgICAgICAgIGJ0bi5kYXRhc2V0LnggPSBgJHtqfWA7XG4gICAgICAgICAgICBpZiAoYWN0aXZlLmJvYXJkW2ldW2pdID09PSAn8J+SoicpIHtcbiAgICAgICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZmlyZWQnKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUuYm9hcmRbaV1bal0gPT09ICfwn5qrJykge1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGFjdGl2ZS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdXJyb3VuZGVkJylcbiAgICAgICAgICAgIH0gZWxzZSBidG4uY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBhY3RpdmUuYm9hcmRbaV1bal1cbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGJ0bilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlyZVVzZXIoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGMtYm9hcmQnKVxuICAgIGJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrSGFuZGxlcilcbn1cblxuZnVuY3Rpb24gYXR0YWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuZGF0YXNldC55ICYmIGV2ZW50LnRhcmdldC5kYXRhc2V0LnggJiYgYWN0aXZlUGxheWVyID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBsYXllcnNbMV1cbiAgICAgICAgY29uc3Qgc3F1YXJlWSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgICAgIGNvbnN0IHNxdWFyZVggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgICAgICBpZiAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFsrc3F1YXJlWSwgK3NxdWFyZVhdLCBwY1NoaXBzKSkgeyAvLyBpZiB0aGlzIHNxdWFyZSB3YXMgYXR0YWNrZWQgYWxyZWFkeVxuICAgICAgICAgICAgZXJyb3JNc2cudGV4dENvbnRlbnQgPSBgKlNxdWFyZSAke1tzcXVhcmVZLCBzcXVhcmVYXX0gYWxyZWFkeSB3YXMgYXR0YWNrZWQhYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgbGV0IHBjIGZpcmUsIGlmIG91ciBsYXN0IGF0dGFja2VkIHNxdWFyZSB3YXMgYSBoaXRcbiAgICAgICAgICAgIGlmIChhY3RpdmUuYm9hcmRbK3NxdWFyZVldWytzcXVhcmVYXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLnJlY2VpdmVBdHRhY2soWytzcXVhcmVZLCArc3F1YXJlWF0sIHBjU2hpcHMpXG4gICAgICAgICAgICAgICAgcGNSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlLmdhbWVPdmVyKHBjU2hpcHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBwY1JlbmRlcigpO1xuICAgICAgICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgICAgICAgICBoYW5kbGVGaXJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xufVxuXG5mdW5jdGlvbiBwY0ZpcmUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gcGxheWVyc1swXTtcbiAgICBsZXQgeSwgeDtcbiAgICBkbyB7XG4gICAgICAgIFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgfSB3aGlsZSAoIWFjdGl2ZS5yZWNlaXZlQXR0YWNrKFt5LCB4XSwgdXNlclNoaXBzKSk7XG4gICAgaWYgKGFjdGl2ZS5ib2FyZFt5XVt4XSA9PT0gJ/CfkqInKSB7XG4gICAgICAgIGlmIChzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgeSwgeCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCAxMDAwKVxuICAgICAgICAgICAgdXNlclJlbmRlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NoaXAgd2l0aCBzaXplIDEgd2FzIHN1bmsnKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYm9hcmRGcm9tUGNWaWV3ID0gYWN0aXZlLmJvYXJkLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCA9PT0gJyMnKXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9ICcgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIHEgPSBmaXJlTWFpbkRpcmVjdGlvbnMoYm9hcmRGcm9tUGNWaWV3LCB5LCB4KVxuICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbeSwgeF1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc21hcnRQYyh5LCB4KSwgNTAwKTtcbiAgICAgICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1c2VyUmVuZGVyKCk7XG4gICAgY2hhbmdlUGxheWVyKCk7XG59XG5cbmxldCBxID0gW11cbmxldCBzdGFydENvb3JkcyA9IFtdXG5sZXQgd2FzSGl0ID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNtYXJ0UGMoeSwgeCkge1xuICAgIGlmIChxLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdxIGlzIGVtcHR5JylcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYWN0aXZlID0gcGxheWVyc1swXVxuICAgIGlmICghc2hpcElzSG9yaXooYWN0aXZlLmJvYXJkLCB5LCB4KSB8fCAhc2hpcElzVmVydChhY3RpdmUuYm9hcmQsIHksIHgpKXtcbiAgICAgICAgY29uc3QgbmV4dFNxdWFyZSA9IHEuc2hpZnQoKVxuICAgICAgICBhY3RpdmUucmVjZWl2ZUF0dGFjayhuZXh0U3F1YXJlLCB1c2VyU2hpcHMpXG4gICAgICAgIHVzZXJSZW5kZXIoKTtcbiAgICAgICAgaWYgKGFjdGl2ZS5ib2FyZFtuZXh0U3F1YXJlWzBdXVtuZXh0U3F1YXJlWzFdXSA9PT0gJ/CfkqInKSB7XG4gICAgICAgICAgICAvLyBpZiBzaGlwIHdhcyBzaXplIG9mIDJcbiAgICAgICAgICAgIC8vIHRyeWluZyB0byBmaW5kIGRpcmVjdGlvbiBvZiBzaGlwXG4gICAgICAgICAgICBjb25zdCBza2lwID0gW25leHRTcXVhcmVbMF0gLSBzdGFydENvb3Jkc1swXSwgbmV4dFNxdWFyZVsxXSAtIHN0YXJ0Q29vcmRzWzFdXVxuICAgICAgICAgICAgY29uc3Qgc2tpcDIgPSBbc3RhcnRDb29yZHNbMF0gLSBuZXh0U3F1YXJlWzBdLCBzdGFydENvb3Jkc1sxXSAtIG5leHRTcXVhcmVbMV1dXG4gICAgICAgICAgICBpZiAobmV4dFNxdWFyZVsxXSA+IHN0YXJ0Q29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hpcCBpcyBob3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICBpZiAoc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIHN0YXJ0Q29vcmRzWzBdLCBzdGFydENvb3Jkc1sxXSwgc2tpcCkgJiYgc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIG5leHRTcXVhcmVbMF0sIG5leHRTcXVhcmVbMV0sIHNraXAyKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaGlwIHdhcyBzdW5rXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFNxdWFyZVsxXSA8IHN0YXJ0Q29vcmRzWzFdKXtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIHN0YXJ0Q29vcmRzWzBdLCBzdGFydENvb3Jkc1sxXSwgc2tpcDIpICYmIHNoaXBPZk9uZVN1bmsoYWN0aXZlLmJvYXJkLCBuZXh0U3F1YXJlWzBdLCBuZXh0U3F1YXJlWzFdLCBza2lwKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaGlwIHdhcyBzdW5rXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFNxdWFyZVswXSA+IHN0YXJ0Q29vcmRzWzBdKXtcbiAgICAgICAgICAgICAgICAvLyBzaGlwIGlzIHZlcnRpY2FsbHlcbiAgICAgICAgICAgICAgICBpZiAoc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIHN0YXJ0Q29vcmRzWzBdLCBzdGFydENvb3Jkc1sxXSwgc2tpcCkgJiYgc2hpcE9mT25lU3VuayhhY3RpdmUuYm9hcmQsIG5leHRTcXVhcmVbMF0sIG5leHRTcXVhcmVbMV0sIHNraXAyKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaGlwIHdhcyBzdW5rXG4gICAgICAgICAgICAgICAgICAgIHEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgd2FzSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocGNGaXJlLCA1MDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgc2l6ZSBpcyBtb3JlIHRoYW4gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFNxdWFyZVswXSA8IHN0YXJ0Q29vcmRzWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hpcCBpcyB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBPZk9uZVN1bmsoYWN0aXZlLmJvYXJkLCBzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0sIHNraXAyKSAmJiBzaGlwT2ZPbmVTdW5rKGFjdGl2ZS5ib2FyZCwgbmV4dFNxdWFyZVswXSwgbmV4dFNxdWFyZVsxXSwgc2tpcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hpcCB3YXMgc3Vua1xuICAgICAgICAgICAgICAgICAgICBxID0gW107XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHdhc0hpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBjRmlyZSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHNpemUgaXMgbW9yZSB0aGFuIDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNIaXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocSkpXG4gICAgICAgICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hpcElzSG9yaXooYWN0aXZlLmJvYXJkLCB5LCB4KSl7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoc2hpcElzVmVydChhY3RpdmUuYm9hcmQsIHksIHgpKXtcblxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVGaXJlKCkge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IDApIHtcbiAgICAgICAgZmlyZVVzZXIoKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVBsYXllciA9PT0gMSAmJiB3YXNIaXQpIHtcbiAgICAgICAgc21hcnRQYyhzdGFydENvb3Jkc1swXSwgc3RhcnRDb29yZHNbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBjRmlyZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgcGxheWVyc1swXS5maWxsQm9hcmQoKTtcbiAgICAgICAgcGxheWVyc1sxXS5maWxsQm9hcmQoKTtcblxuICAgICAgICBwbGF5ZXJzWzBdLnBsYWNlU2hpcHModXNlclNoaXBzKTtcbiAgICAgICAgcGxheWVyc1sxXS5wbGFjZVNoaXBzKHBjU2hpcHMpO1xuXG4gICAgICAgIHNjcmVlbkNvbnRyb2xsZXIoKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByYW5kb20oKSB7XG4gICAgcmFuZG9tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbGF5ZXJzWzBdLmZpbGxCb2FyZCgpO1xuICAgICAgICBwbGF5ZXJzWzFdLmZpbGxCb2FyZCgpO1xuXG4gICAgICAgIHBsYXllcnNbMF0ucmVzZXRTaGlwcyh1c2VyU2hpcHMpO1xuICAgICAgICBwbGF5ZXJzWzFdLnJlc2V0U2hpcHMocGNTaGlwcyk7XG5cbiAgICAgICAgcGxheWVyc1swXS5wbGFjZVNoaXBzKHVzZXJTaGlwcyk7XG4gICAgICAgIHBsYXllcnNbMV0ucGxhY2VTaGlwcyhwY1NoaXBzKTtcbiAgICAgICAgc2NyZWVuQ29udHJvbGxlcigpO1xuICAgIH0pXG59XG5cbnJlc3RhcnQoKTtcbnJhbmRvbSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcigpIHtcbiAgICB1c2VyUmVuZGVyKCk7XG4gICAgcGNSZW5kZXIoKTtcbiAgICBoYW5kbGVGaXJlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbkNvbnRyb2xsZXJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgXCIuL3N0eWxlL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgc2NyZWVuQ29udHJvbGxlciBmcm9tIFwiLi9sb2dpYy91aS5tanNcIjtcblxuc2NyZWVuQ29udHJvbGxlcigpXG5cbiJdLCJuYW1lcyI6WyJzdXJyb3VuZGluZ1NxdWFyZXMiLCJkaWFnb25hbFNxdWFyZXMiLCJtYWluU3F1YXJlcyIsImhvcml6U3F1YXJlcyIsInZlcnRTcXVhcmVzIiwiY2hlY2tCb3VuZGFyaWVzIiwiX3JlZiIsIngiLCJ5Iiwic2hpcE9mT25lU3VuayIsImJvYXJkIiwic2tpcCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInN1cnJDb29yZHMiLCJ2YWxpZFNxdWFyZSIsImZpcmVNYWluRGlyZWN0aW9ucyIsIm91dHB1dCIsInNxdWFyZSIsInB1c2giLCJzaGlwSXNIb3JpeiIsInNoaXBJc1ZlcnQiLCJwb3NzaWJsZVNxdWFyZXMiLCJzbGljZSIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwic2l6ZSIsInJvd3MiLCJjb2x1bW5zIiwiZmlsbEJvYXJkIiwiaSIsImoiLCJnZXRSYW5kb21Db29yZHMiLCJzaGlwIiwicmFuZG9tWSIsInJhbmRvbVgiLCJsb29wcyIsImRpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNoZWNrSWZOb3RFbXB0eSIsInBsYWNlU2hpcCIsInNoaXBDb29yZHMiLCJjb29yZHMiLCJwbGFjZVNoaXBzIiwic2hpcHMiLCJob3JpelN1bSIsInZlcnRTdW0iLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwiaGl0IiwiaXNTdW5rIiwiY29uc29sZSIsImxvZyIsIm1ha2VTdXJyb3VuZGluZ1dhdGVyIiwicmVzZXRTaGlwcyIsInJlc2V0SGl0cyIsInJlc2V0Q29vcmRzIiwiZ2FtZU92ZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiU2hpcCIsImhpdHMiLCJlcnJvck1zZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpYWxvZyIsInJlc3RhcnRCdG4iLCJyYW5kb21CdG4iLCJwbGF5ZXJzIiwidXNlclNoaXBzIiwicGNTaGlwcyIsImFjdGl2ZVBsYXllciIsImNoYW5nZVBsYXllciIsInVzZXJSZW5kZXIiLCJhY3RpdmUiLCJpbm5lckhUTUwiLCJidG4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInBjUmVuZGVyIiwiZGF0YXNldCIsImZpcmVVc2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFja0hhbmRsZXIiLCJldmVudCIsInRhcmdldCIsInNxdWFyZVkiLCJzcXVhcmVYIiwic2hvd01vZGFsIiwiaGFuZGxlRmlyZSIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGNGaXJlIiwic2V0VGltZW91dCIsImJvYXJkRnJvbVBjVmlldyIsIm1hcCIsInJvdyIsImNlbGwiLCJxIiwic3RhcnRDb29yZHMiLCJzbWFydFBjIiwid2FzSGl0IiwibmV4dFNxdWFyZSIsInNoaWZ0Iiwic2tpcDIiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdGFydCIsImNsb3NlIiwic2NyZWVuQ29udHJvbGxlciJdLCJzb3VyY2VSb290IjoiIn0=