/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic/gameboard.js":
/*!********************************!*\
  !*** ./src/logic/gameboard.js ***!
  \********************************/
/***/ ((module) => {



let surroundingSquares = [[1, -1], [0, -1], [-1, -1], [1, 0], [-1, 0], [1, 1], [0, 1], [-1, 1]];
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
  }
  fillBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i].push(' ');
      }
    }
    return this.board;
  }
  getRandomCoords(ship) {
    let randomY;
    let randomX;
    do {
      console.log('loop horiz');
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
    // so far we place ship horizontally so we iterate only in columns
    if (ship.direction === 0) {
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
        this.board[randomY][j] = ship.length;
        shipCoords.push([randomY, j]);
      }
    } else {
      // now we place ship vertically, so we iterate only in rows
      for (let i = randomY; i < randomY + ship.length; i++) {
        this.board[i][randomX] = ship.length;
        shipCoords.push([i, randomX]);
      }
    }
    ship.coords = shipCoords;
  }
  receiveAttack(attackCoords, ships) {
    if (this.board[attackCoords[0]][attackCoords[1]] === '🚫' || this.board[attackCoords[0]][attackCoords[1]] === '💢') {
      return;
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
          return;
        }
      }
    }
    this.board[attackCoords[0]][attackCoords[1]] = '🚫';
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
  gameOver(ships) {
    for (let ship in ships) {
      if (!ships[ship].isSunk()) {
        return false;
      }
    }
    return `Game is over!`;
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


header {
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    color: royalblue;
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

.pc-board {
    margin-right: 48px;
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



`, "",{"version":3,"sources":["webpack://./src/style/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;AACd;;;AAGA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,wBAAwB;IACxB,aAAa;IACb,YAAY;IACZ,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,YAAY;IACZ,2BAA2B;AAC/B;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,wBAAwB;IACxB,2BAA2B;IAC3B,eAAe;AACnB;;AAEA;IACI,uBAAuB;AAC3B","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n}\n\n\nheader {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\nh1 {\n    color: royalblue;\n}\n\n.content {\n    display: flex;\n    justify-content: space-between;\n}\n\n.board {\n    border: 2px solid orange;\n    display: grid;\n    width: 340px;\n    height: 340px;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    padding: 2px;\n    background-color: royalblue;\n}\n\n.user-board {\n    margin-left: 48px;\n}\n\n.pc-board {\n    margin-right: 48px;\n}\n\n.cell {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    font-size: 1.5rem;\n    border: 1px solid orange;\n    background-color: lightblue;\n    cursor: pointer;\n}\n\n.pc-board > .cell:hover {\n    filter: brightness(80%);\n}\n\n\n\n"],"sourceRoot":""}]);
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




const players = {
  0: new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__(10),
  1: new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__(10)
};
const userShips = {
  '1': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '2': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '3': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '4': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(4),
  '5': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(5)
};
const pcShips = {
  '1': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(1),
  '2': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(2),
  '3': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(3),
  '4': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(4),
  '5': new _ship_js__WEBPACK_IMPORTED_MODULE_1__(5)
};
let activePlayer = 0;
function changePlayer() {
  return activePlayer = activePlayer === 0 ? 1 : 0;
}
players[activePlayer].fillBoard();
userShips['3'].direction = 0;
let [y, x] = players[activePlayer].getRandomCoords(userShips['3']);
players[activePlayer].placeShip(userShips['3'], y, x);
userShips['2'].direction = 0;
let [y2, x2] = players[activePlayer].getRandomCoords(userShips['2']);
players[activePlayer].placeShip(userShips['2'], y2, x2);
userShips['2'].direction = 0;
let [y5, x5] = players[activePlayer].getRandomCoords(userShips['2']);
players[activePlayer].placeShip(userShips['2'], y5, x5);
userShips['2'].direction = 0;
let [y6, x6] = players[activePlayer].getRandomCoords(userShips['2']);
players[activePlayer].placeShip(userShips['2'], y6, x6);
//
userShips['4'].direction = 0;
let [y3, x3] = players[activePlayer].getRandomCoords(userShips['4']);
players[activePlayer].placeShip(userShips['4'], y3, x3);
//
userShips['3'].direction = 1;
let [y4, x4] = players[activePlayer].getRandomCoords(userShips['3']);
players[activePlayer].placeShip(userShips['3'], y4, x4);
userShips['1'].direction = 0;
let [y7, x7] = players[activePlayer].getRandomCoords(userShips['1']);
players[activePlayer].placeShip(userShips['1'], y7, x7);
userShips['1'].direction = 0;
let [y8, x8] = players[activePlayer].getRandomCoords(userShips['1']);
players[activePlayer].placeShip(userShips['1'], y8, x8);
userShips['1'].direction = 0;
let [y9, x9] = players[activePlayer].getRandomCoords(userShips['1']);
players[activePlayer].placeShip(userShips['1'], y9, x9);
activePlayer = 1;
players[activePlayer].fillBoard();
pcShips['3'].direction = 0;
let [y10, x10] = players[activePlayer].getRandomCoords(pcShips['3']);
players[activePlayer].placeShip(pcShips['3'], y10, x10);
pcShips['2'].direction = 0;
let [y11, x11] = players[activePlayer].getRandomCoords(pcShips['2']);
players[activePlayer].placeShip(pcShips['2'], y11, x11);
pcShips['2'].direction = 0;
let [y12, x12] = players[activePlayer].getRandomCoords(pcShips['2']);
players[activePlayer].placeShip(pcShips['2'], y12, x12);
pcShips['2'].direction = 0;
let [y13, x13] = players[activePlayer].getRandomCoords(pcShips['2']);
players[activePlayer].placeShip(pcShips['2'], y13, x13);
pcShips['4'].direction = 0;
let [y14, x14] = players[activePlayer].getRandomCoords(pcShips['4']);
players[activePlayer].placeShip(pcShips['4'], y14, x14);
pcShips['3'].direction = 1;
let [y15, x15] = players[activePlayer].getRandomCoords(pcShips['3']);
players[activePlayer].placeShip(pcShips['3'], y15, x15);
pcShips['1'].direction = 0;
let [y16, x16] = players[activePlayer].getRandomCoords(pcShips['1']);
players[activePlayer].placeShip(pcShips['1'], y16, x16);
pcShips['1'].direction = 0;
let [y17, x17] = players[activePlayer].getRandomCoords(pcShips['1']);
players[activePlayer].placeShip(pcShips['1'], y17, x17);
pcShips['1'].direction = 0;
let [y18, x18] = players[activePlayer].getRandomCoords(pcShips['1']);
players[activePlayer].placeShip(pcShips['1'], y18, x18);
activePlayer = 0;
function screenController() {
  const board = document.querySelector('.user-board');
  const pcBoard = document.querySelector('.pc-board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const btn = document.createElement('button');
      const pcBtn = document.createElement('button');
      pcBtn.addEventListener('click', () => pcBtn.style.background = 'green');
      btn.textContent = players[0].board[i][j];
      pcBtn.textContent = players[1].board[i][j];
      btn.classList.add('cell');
      pcBtn.classList.add('cell');
      board.appendChild(btn);
      pcBoard.appendChild(pcBtn);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z2FtZWJvYXJkLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2VzbGludC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvc3R5bGUvc3R5bGUuY3NzP2M5ZjAiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZXNsaW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2VzbGludC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9lc2xpbnQvLi9zcmMvbG9naWMvdWkubWpzIiwid2VicGFjazovL2VzbGludC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXNsaW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lc2xpbnQvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2VzbGludC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuXG5sZXQgc3Vycm91bmRpbmdTcXVhcmVzID0gW1xuICAgIFsxLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgMF0sXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMV0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgMV0sXG5dXG5sZXQgcG9zc2libGVTcXVhcmVzID0gc3Vycm91bmRpbmdTcXVhcmVzLnNsaWNlKDAsIHN1cnJvdW5kaW5nU3F1YXJlcy5sZW5ndGgpXG5wb3NzaWJsZVNxdWFyZXMucHVzaChbMCwgMF0pXG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRhcmllcyhbeCwgeV0pIHtcbiAgICByZXR1cm4gKHggPj0gMCAmJiB4IDwgMTApICYmICh5ID49IDAgJiYgeSA8IDEwKVxufVxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5yb3dzID0gc2l6ZTtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gc2l6ZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIH1cblxuICAgIGZpbGxCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaCgnICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICAgIH1cblxuICAgIGdldFJhbmRvbUNvb3JkcyhzaGlwKSB7XG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvb3AgaG9yaXonKVxuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7IC8vIGhvcml6b250YWxseVxuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnJvd3MpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5jb2x1bW5zIC0gc2hpcC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsbHlcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMucm93cy1zaGlwLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgd2UgY2FuJ3QgcHV0IG91ciBzaGlwIGluIHJhbmdlIG9mIChzaXplIG9mIGNvbHVtbnMgLSBzdGFydCBjb29yZGluYXRlIG9mIHNoaXApLCB0aGVuIHdlIGdlbmVyYXRlIG5ldyBjb29yZHNcbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbiBwdXQgb3VyIHNoaXAgaW4gdGhpcyByYW5nZSwgYnV0IGlmIGluIHJhbmdlIG9mIC0xIHRvICsxIHNxdWFyZXMgaXMgb3VyIG5laWdoYm91ciBzaGlwLCB3ZSBnZW5lcmF0ZSBuZXcgY29vcmRzXG4gICAgICAgIH0gd2hpbGUgKCEodGhpcy5jaGVja0lmTm90RW1wdHkoc2hpcCwgcmFuZG9tWSwgcmFuZG9tWCkpKVxuXG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgY2hlY2tJZk5vdEVtcHR5KHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgLy8gc28gZmFyIHdlIHBsYWNlIHNoaXAgaG9yaXpvbnRhbGx5IHNvIHdlIGl0ZXJhdGUgb25seSBpbiBjb2x1bW5zXG4gICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IHJhbmRvbVg7IGogPCByYW5kb21YICsgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSBvZiBwb3NzaWJsZVNxdWFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkU3F1YXJlID0gW3JhbmRvbVkgKyBzcXVhcmVbMF0sIGogKyBzcXVhcmVbMV1dXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdmFsaWRTcXVhcmVbMF1dW3ZhbGlkU3F1YXJlWzFdXSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcmFuZG9tWTsgaSA8IHJhbmRvbVkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3F1YXJlIG9mIHBvc3NpYmxlU3F1YXJlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWRTcXVhcmUgPSBbaSArIHNxdWFyZVswXSwgcmFuZG9tWCArIHNxdWFyZVsxXV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0JvdW5kYXJpZXModmFsaWRTcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbcmFuZG9tWSwgcmFuZG9tWF07XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXAsIHJhbmRvbVksIHJhbmRvbVgpIHtcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAvLyBwbGFjaW5nIHNoaXAgLT4gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcmFuZG9tWDsgaiA8IHJhbmRvbVggKyBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyYW5kb21ZXVtqXSA9IHNoaXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbcmFuZG9tWSwgal0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBub3cgd2UgcGxhY2Ugc2hpcCB2ZXJ0aWNhbGx5LCBzbyB3ZSBpdGVyYXRlIG9ubHkgaW4gcm93c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmRvbVk7IGkgPCByYW5kb21ZICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bcmFuZG9tWF0gPSBzaGlwLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW2ksIHJhbmRvbVhdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNoaXAuY29vcmRzID0gc2hpcENvb3JkcztcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcywgc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5qrJyB8fFxuICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV0gPT09ICfwn5KiJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHNoaXAgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvb3JkcyBvZiBzaGlwc1tzaGlwXS5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgYXR0YWNrQ29vcmRzWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbc2hpcF0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfkqInXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNoaXAgJHtzaGlwfSB3YXMgc3VuayFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlU3Vycm91bmRpbmdXYXRlcihzaGlwc1tzaGlwXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dID0gJ/CfmqsnXG4gICAgfVxuXG4gICAgbWFrZVN1cnJvdW5kaW5nV2F0ZXIoc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gc2hpcC5jb29yZHNbaV1cbiAgICAgICAgICAgIGZvciAobGV0IHN1cnJDb29yZHMgb2Ygc3Vycm91bmRpbmdTcXVhcmVzKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbMCwgKzFdLCBbMCwgLTFdXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgZWRnZSBjYXNlcyBbKzEsIDBdLCBbLTEsIDBdXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gMCAmJiBzdXJyQ29vcmRzWzFdID09PSAxKSAmJiBpICE9PSBzaGlwLmNvb3Jkcy5sZW5ndGggLSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzdXJyQ29vcmRzWzBdID09PSAwICYmIHN1cnJDb29yZHNbMV0gPT09IC0xKSAmJiBpICE9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHN1cnJDb29yZHNbMF0gPT09IDEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gc2hpcC5jb29yZHMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc3VyckNvb3Jkc1swXSA9PT0gLTEgJiYgc3VyckNvb3Jkc1sxXSA9PT0gMCkgJiYgaSAhPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB2YWxpZFNxdWFyZSA9IFtjb29yZHNbMF0gKyBzdXJyQ29vcmRzWzBdLCBjb29yZHNbMV0gKyBzdXJyQ29vcmRzWzFdXVxuICAgICAgICAgICAgICAgIGlmICghY2hlY2tCb3VuZGFyaWVzKHZhbGlkU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt2YWxpZFNxdWFyZVswXV1bdmFsaWRTcXVhcmVbMV1dID0gJ/CfmqsnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoc2hpcHMpIHtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBpbiBzaGlwcykge1xuICAgICAgICAgICAgaWYgKCFzaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgR2FtZSBpcyBvdmVyIWA7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyKVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGhcbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG5cbmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5oMSB7XG4gICAgY29sb3I6IHJveWFsYmx1ZTtcbn1cblxuLmNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uYm9hcmQge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHdpZHRoOiAzNDBweDtcbiAgICBoZWlnaHQ6IDM0MHB4O1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XG59XG5cbi51c2VyLWJvYXJkIHtcbiAgICBtYXJnaW4tbGVmdDogNDhweDtcbn1cblxuLnBjLWJvYXJkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDQ4cHg7XG59XG5cbi5jZWxsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIG9yYW5nZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucGMtYm9hcmQgPiAuY2VsbDpob3ZlciB7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDgwJSk7XG59XG5cblxuXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtBQUNkOzs7QUFHQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLFlBQVk7SUFDWiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5cXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaDEge1xcbiAgICBjb2xvcjogcm95YWxibHVlO1xcbn1cXG5cXG4uY29udGVudCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICB3aWR0aDogMzQwcHg7XFxuICAgIGhlaWdodDogMzQwcHg7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgcGFkZGluZzogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByb3lhbGJsdWU7XFxufVxcblxcbi51c2VyLWJvYXJkIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDQ4cHg7XFxufVxcblxcbi5wYy1ib2FyZCB7XFxuICAgIG1hcmdpbi1yaWdodDogNDhweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgb3JhbmdlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBjLWJvYXJkID4gLmNlbGw6aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoODAlKTtcXG59XFxuXFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5cbmNvbnN0IHBsYXllcnMgPSB7XG4gICAgMDogbmV3IEdhbWVib2FyZCgxMCksXG4gICAgMTogbmV3IEdhbWVib2FyZCgxMCksXG59XG5cbmNvbnN0IHVzZXJTaGlwcyA9IHtcbiAgICAnMSc6IG5ldyBTaGlwKDEpLFxuICAgICcyJzogbmV3IFNoaXAoMiksXG4gICAgJzMnOiBuZXcgU2hpcCgzKSxcbiAgICAnNCc6IG5ldyBTaGlwKDQpLFxuICAgICc1JzogbmV3IFNoaXAoNSksXG59XG5cbmNvbnN0IHBjU2hpcHMgPSB7XG4gICAgJzEnOiBuZXcgU2hpcCgxKSxcbiAgICAnMic6IG5ldyBTaGlwKDIpLFxuICAgICczJzogbmV3IFNoaXAoMyksXG4gICAgJzQnOiBuZXcgU2hpcCg0KSxcbiAgICAnNSc6IG5ldyBTaGlwKDUpLFxufVxuXG5sZXQgYWN0aXZlUGxheWVyID0gMDtcblxuZnVuY3Rpb24gY2hhbmdlUGxheWVyKCkge1xuICAgIHJldHVybiBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IDAgPyAxIDogMDtcbn1cblxucGxheWVyc1thY3RpdmVQbGF5ZXJdLmZpbGxCb2FyZCgpXG5cbnVzZXJTaGlwc1snMyddLmRpcmVjdGlvbiA9IDBcbmxldCBbeSx4XSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHModXNlclNoaXBzWyczJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHVzZXJTaGlwc1snMyddLCB5LCB4KVxuXG51c2VyU2hpcHNbJzInXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3kyLHgyXSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHModXNlclNoaXBzWycyJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHVzZXJTaGlwc1snMiddLCB5MiwgeDIpXG5cbnVzZXJTaGlwc1snMiddLmRpcmVjdGlvbiA9IDBcbmxldCBbeTUseDVdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3Jkcyh1c2VyU2hpcHNbJzInXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAodXNlclNoaXBzWycyJ10sIHk1LCB4NSlcblxudXNlclNoaXBzWycyJ10uZGlyZWN0aW9uID0gMFxubGV0IFt5NiwgeDZdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3Jkcyh1c2VyU2hpcHNbJzInXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAodXNlclNoaXBzWycyJ10sIHk2LCB4Nilcbi8vXG51c2VyU2hpcHNbJzQnXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3kzLHgzXSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHModXNlclNoaXBzWyc0J10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHVzZXJTaGlwc1snNCddLCB5MywgeDMpXG4vL1xudXNlclNoaXBzWyczJ10uZGlyZWN0aW9uID0gMVxubGV0IFt5NCx4NF0gPSBwbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZ2V0UmFuZG9tQ29vcmRzKHVzZXJTaGlwc1snMyddKVxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcCh1c2VyU2hpcHNbJzMnXSwgeTQsIHg0KVxuXG51c2VyU2hpcHNbJzEnXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3k3LHg3XSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHModXNlclNoaXBzWycxJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHVzZXJTaGlwc1snMSddLCB5NywgeDcpXG5cbnVzZXJTaGlwc1snMSddLmRpcmVjdGlvbiA9IDBcbmxldCBbeTgseDhdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3Jkcyh1c2VyU2hpcHNbJzEnXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAodXNlclNoaXBzWycxJ10sIHk4LCB4OClcblxudXNlclNoaXBzWycxJ10uZGlyZWN0aW9uID0gMFxubGV0IFt5OSx4OV0gPSBwbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZ2V0UmFuZG9tQ29vcmRzKHVzZXJTaGlwc1snMSddKVxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcCh1c2VyU2hpcHNbJzEnXSwgeTksIHg5KTtcblxuYWN0aXZlUGxheWVyID0gMTtcblxuXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZmlsbEJvYXJkKCk7XG5cbnBjU2hpcHNbJzMnXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3kxMCwgeDEwXSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHMocGNTaGlwc1snMyddKVxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcChwY1NoaXBzWyczJ10sIHkxMCwgeDEwKVxuXG5wY1NoaXBzWycyJ10uZGlyZWN0aW9uID0gMFxubGV0IFt5MTEsIHgxMV0gPSBwbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZ2V0UmFuZG9tQ29vcmRzKHBjU2hpcHNbJzInXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAocGNTaGlwc1snMiddLCB5MTEsIHgxMSlcblxucGNTaGlwc1snMiddLmRpcmVjdGlvbiA9IDBcbmxldCBbeTEyLCB4MTJdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3JkcyhwY1NoaXBzWycyJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHBjU2hpcHNbJzInXSwgeTEyLCB4MTIpXG5cbnBjU2hpcHNbJzInXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3kxMywgeDEzXSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHMocGNTaGlwc1snMiddKVxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcChwY1NoaXBzWycyJ10sIHkxMywgeDEzKVxuXG5wY1NoaXBzWyc0J10uZGlyZWN0aW9uID0gMFxubGV0IFt5MTQsIHgxNF0gPSBwbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZ2V0UmFuZG9tQ29vcmRzKHBjU2hpcHNbJzQnXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAocGNTaGlwc1snNCddLCB5MTQsIHgxNClcblxucGNTaGlwc1snMyddLmRpcmVjdGlvbiA9IDFcbmxldCBbeTE1LCB4MTVdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3JkcyhwY1NoaXBzWyczJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHBjU2hpcHNbJzMnXSwgeTE1LCB4MTUpXG5cbnBjU2hpcHNbJzEnXS5kaXJlY3Rpb24gPSAwXG5sZXQgW3kxNiwgeDE2XSA9IHBsYXllcnNbYWN0aXZlUGxheWVyXS5nZXRSYW5kb21Db29yZHMocGNTaGlwc1snMSddKVxucGxheWVyc1thY3RpdmVQbGF5ZXJdLnBsYWNlU2hpcChwY1NoaXBzWycxJ10sIHkxNiwgeDE2KVxuXG5wY1NoaXBzWycxJ10uZGlyZWN0aW9uID0gMFxubGV0IFt5MTcsIHgxN10gPSBwbGF5ZXJzW2FjdGl2ZVBsYXllcl0uZ2V0UmFuZG9tQ29vcmRzKHBjU2hpcHNbJzEnXSlcbnBsYXllcnNbYWN0aXZlUGxheWVyXS5wbGFjZVNoaXAocGNTaGlwc1snMSddLCB5MTcsIHgxNylcblxucGNTaGlwc1snMSddLmRpcmVjdGlvbiA9IDBcbmxldCBbeTE4LCB4MThdID0gcGxheWVyc1thY3RpdmVQbGF5ZXJdLmdldFJhbmRvbUNvb3JkcyhwY1NoaXBzWycxJ10pXG5wbGF5ZXJzW2FjdGl2ZVBsYXllcl0ucGxhY2VTaGlwKHBjU2hpcHNbJzEnXSwgeTE4LCB4MTgpXG5cblxuYWN0aXZlUGxheWVyID0gMFxuXG5leHBvcnQgZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcigpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJvYXJkJylcbiAgICBjb25zdCBwY0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBjLWJvYXJkJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgY29uc3QgcGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgcGNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwY0J0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyZWVuJylcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IHBsYXllcnNbMF0uYm9hcmRbaV1bal1cbiAgICAgICAgICAgIHBjQnRuLnRleHRDb250ZW50ID0gcGxheWVyc1sxXS5ib2FyZFtpXVtqXVxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICAgICAgcGNCdG4uY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChidG4pXG4gICAgICAgICAgICBwY0JvYXJkLmFwcGVuZENoaWxkKHBjQnRuKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5Db250cm9sbGVyIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBcIi4vc3R5bGUvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL2xvZ2ljL3VpLm1qc1wiO1xuXG5zY3JlZW5Db250cm9sbGVyKClcblxuIl0sIm5hbWVzIjpbInN1cnJvdW5kaW5nU3F1YXJlcyIsInBvc3NpYmxlU3F1YXJlcyIsInNsaWNlIiwibGVuZ3RoIiwicHVzaCIsImNoZWNrQm91bmRhcmllcyIsIl9yZWYiLCJ4IiwieSIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwic2l6ZSIsInJvd3MiLCJjb2x1bW5zIiwiYm9hcmQiLCJmaWxsQm9hcmQiLCJpIiwiaiIsImdldFJhbmRvbUNvb3JkcyIsInNoaXAiLCJyYW5kb21ZIiwicmFuZG9tWCIsImNvbnNvbGUiLCJsb2ciLCJkaXJlY3Rpb24iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjaGVja0lmTm90RW1wdHkiLCJzcXVhcmUiLCJ2YWxpZFNxdWFyZSIsInBsYWNlU2hpcCIsInNoaXBDb29yZHMiLCJjb29yZHMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrQ29vcmRzIiwic2hpcHMiLCJoaXQiLCJpc1N1bmsiLCJtYWtlU3Vycm91bmRpbmdXYXRlciIsInN1cnJDb29yZHMiLCJnYW1lT3ZlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJTaGlwIiwiaGl0cyIsInBsYXllcnMiLCJ1c2VyU2hpcHMiLCJwY1NoaXBzIiwiYWN0aXZlUGxheWVyIiwiY2hhbmdlUGxheWVyIiwieTIiLCJ4MiIsInk1IiwieDUiLCJ5NiIsIng2IiwieTMiLCJ4MyIsInk0IiwieDQiLCJ5NyIsIng3IiwieTgiLCJ4OCIsInk5IiwieDkiLCJ5MTAiLCJ4MTAiLCJ5MTEiLCJ4MTEiLCJ5MTIiLCJ4MTIiLCJ5MTMiLCJ4MTMiLCJ5MTQiLCJ4MTQiLCJ5MTUiLCJ4MTUiLCJ5MTYiLCJ4MTYiLCJ5MTciLCJ4MTciLCJ5MTgiLCJ4MTgiLCJzY3JlZW5Db250cm9sbGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicGNCb2FyZCIsImJ0biIsImNyZWF0ZUVsZW1lbnQiLCJwY0J0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsImJhY2tncm91bmQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIl0sInNvdXJjZVJvb3QiOiIifQ==