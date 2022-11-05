/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "GridSquare": () => (/* reexport safe */ _gridsquare__WEBPACK_IMPORTED_MODULE_0__.GridSquare)
/* harmony export */ });
/* harmony import */ var _gridsquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gridsquare */ "./src/gridsquare.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var Gameboard = function Gameboard() {
  // Declare grid empty object
  var grid = {};

  // Fill grid with GridSquare objects
  for (var i = 1; i <= 10; i += 1) {
    for (var j = 1; j <= 10; j += 1) {
      var newGridSquare = (0,_gridsquare__WEBPACK_IMPORTED_MODULE_0__.GridSquare)();
      newGridSquare.row = i;
      newGridSquare.column = j;
      grid["square-".concat(i, "-").concat(j)] = newGridSquare;
    }
  }

  // Declare and populate gameboard ships array
  var ships = [];
  for (var _i = 0; _i < _ship__WEBPACK_IMPORTED_MODULE_1__.shipTypes.length; _i += 1) {
    var newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.Ship)(_i);
    ships.push(newShip);
  }

  // Gameboard factory method to check if ship placement is within grid
  var isWithinGrid = function isWithinGrid(row, column, length, orientation) {
    if (orientation === "horizontal" && column + length - 1 <= 10) {
      return true;
    } else if (orientation === "vertical" && row - length + 1 >= 1) {
      return true;
    }
    return false;
  };

  // Gameboard factory method to check if ship placement does not overlap other ships
  var doesNotOverlap = function doesNotOverlap(row, column, length, orientation) {
    if (isWithinGrid(row, column, length, orientation) === true && orientation === "horizontal") {
      for (var _i2 = column; _i2 < column + length; _i2 += 1) {
        if (grid["square-".concat(row, "-").concat(_i2)].containsShipSegment() === true) {
          return false;
        }
      }
      return true;
    } else if (isWithinGrid(row, column, length, orientation) === true && orientation === "vertical") {
      for (var _i3 = row; _i3 > row - length; _i3 -= 1) {
        if (grid["square-".concat(_i3, "-").concat(column)].containsShipSegment() === true) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
  var shipsLocation = [];

  // Gameboard factory method to place a ship given a set of coordinates (a grid square)
  var placeShip = function placeShip(row, column, length, orientation, type) {
    if (isWithinGrid(row, column, length, orientation) === true && doesNotOverlap(row, column, length, orientation) === true) {
      if (orientation === "horizontal") {
        for (var _i4 = column; _i4 < column + length; _i4 += 1) {
          grid["square-".concat(row, "-").concat(_i4)].placeShipSegment();
          grid["square-".concat(row, "-").concat(_i4)].changeShipSegmentType(type);
          shipsLocation.push([row, _i4]);
        }
      } else if (orientation === "vertical") {
        for (var _i5 = row; _i5 > row - length; _i5 -= 1) {
          grid["square-".concat(_i5, "-").concat(column)].placeShipSegment();
          grid["square-".concat(_i5, "-").concat(column)].changeShipSegmentType(type);
          shipsLocation.push([_i5, column]);
        }
      }
    }
  };

  // Gameboard factory method to check if all ships are placed
  var allShipsPlaced = function allShipsPlaced() {
    var _iterator = _createForOfIteratorHelper(ships),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var ship = _step.value;
        if (ship.isPlaced() === false) {
          return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  };

  // Gameboard factory method to check if all ships are sunk
  var allShipsSunk = function allShipsSunk() {
    var _iterator2 = _createForOfIteratorHelper(ships),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var ship = _step2.value;
        if (ship.isSunk() === false) {
          return false;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return true;
  };

  // Function to get the length of the largest unsunk ship in the grid
  function largestUnsunkShipLength() {
    var maxLength = 2;
    var _iterator3 = _createForOfIteratorHelper(ships),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var ship = _step3.value;
        if (ship.isSunk() === false && ship.length >= maxLength) {
          maxLength = ship.length;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return maxLength;
  }

  // Function to return random row and column based on a pettern related to the largest unsunk ship
  function guessPattern() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : largestUnsunkShipLength();
    var row;
    var column;
    var stopLoop = false;
    while (stopLoop === false) {
      // Generate random row & column
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      // If the location does not fit the pattern, keep guessing
      if (length) {
        if ((row + column) % length !== 0) {
          continue;
        }
      }
      // If the location fits the pattern, make sure it has not been shot yet
      if (grid["square-".concat(row, "-").concat(column)].isShot() === false) {
        stopLoop = true;
      }
    }
    return [row, column];
  }

  // Function to return true if there are shot ship segments that belong to a ship that is unsunk yet
  function areThereUnsunkShotShipSegments() {
    var shotShipSegments = [];
    for (var key in grid) {
      if (grid[key].isShot() && grid[key].containsShipSegment()) {
        shotShipSegments.push(key);
      }
    }
    for (var _i6 = 0, _shotShipSegments = shotShipSegments; _i6 < _shotShipSegments.length; _i6++) {
      var _key = _shotShipSegments[_i6];
      var _iterator4 = _createForOfIteratorHelper(ships),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var ship = _step4.value;
          if (grid[_key].getShipSegmentType() === ship.type && ship.isSunk() === false) {
            return true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    return false;
  }

  // Function to check if an array exists in an array of arrays // -1 if no // index of subarray otherwise
  function includesArray(array, arrayOfArrays) {
    var current;
    for (var _i7 = 0; _i7 < arrayOfArrays.length; _i7 += 1) {
      if (array.length === arrayOfArrays[_i7].length) {
        current = arrayOfArrays[_i7];
        for (var _j = 0; _j < array.length && array[_j] === current[_j]; _j += 1) {
          if (_j === array.length - 1) {
            return _i7;
          }
        }
      }
    }
    return -1;
  }
  var targets = [];
  var targetsOfHigherProbabilty = [];
  function huntTarget() {
    // Reset the potential targets if all shot ships segments are sunk
    if (areThereUnsunkShotShipSegments() === false) {
      targets = [];
      targetsOfHigherProbabilty = [];
    }
    var row, column;
    // If targets is empty, enter hunt mode
    if (targets.length === 0) {
      var _guessPattern = guessPattern();
      var _guessPattern2 = _slicedToArray(_guessPattern, 2);
      row = _guessPattern2[0];
      column = _guessPattern2[1];
    } else if (targetsOfHigherProbabilty.length > 0) {
      // If targets is not empty, enter target mode, prioritize targets of higher probability
      var _targetsOfHigherProba = targetsOfHigherProbabilty.pop();
      var _targetsOfHigherProba2 = _slicedToArray(_targetsOfHigherProba, 2);
      row = _targetsOfHigherProba2[0];
      column = _targetsOfHigherProba2[1];
      // Remove the selected high probability target from the regular targets array
      var index = includesArray([row, column], targets);
      targets.splice(index, 1);
    } else {
      // If targets is not empty, enter target mode (ie pop a target from targets)
      var _targets$pop = targets.pop();
      var _targets$pop2 = _slicedToArray(_targets$pop, 2);
      row = _targets$pop2[0];
      column = _targets$pop2[1];
    }
    // Check ship map
    if (grid["square-".concat(row, "-").concat(column)].containsShipSegment() === true) {
      // Add all adjacent squares to list of potential targets where possible
      var potentialTargets = [[row + 1, column], [row, column + 1], [row - 1, column], [row, column - 1]];
      for (var _i8 = 0, _potentialTargets = potentialTargets; _i8 < _potentialTargets.length; _i8++) {
        var _potentialTargets$_i = _slicedToArray(_potentialTargets[_i8], 2),
          targetRow = _potentialTargets$_i[0],
          targetColumn = _potentialTargets$_i[1];
        if (
        // must be whithin grid
        1 <= targetRow && targetRow <= 10 && 1 <= targetColumn && targetColumn <= 10 &&
        // must not already be in targets array
        includesArray([targetRow, targetColumn], targets) < 0 &&
        // must not already be shot
        grid["square-".concat(targetRow, "-").concat(targetColumn)].isShot() === false) {
          targets.push([targetRow, targetColumn]);
        }
      }
      // After the targets logic loop is done, begin t.o.h.p logic loop
      // Determine potential targets of higher probability
      for (var _i9 = 0, _potentialTargets2 = potentialTargets; _i9 < _potentialTargets2.length; _i9++) {
        var _potentialTargets2$_i = _slicedToArray(_potentialTargets2[_i9], 2),
          _targetRow = _potentialTargets2$_i[0],
          _targetColumn = _potentialTargets2$_i[1];
        if (
        // must be within grid
        1 <= _targetRow && _targetRow <= 10 && 1 <= _targetColumn && _targetColumn <= 10 &&
        // must be already shot
        grid["square-".concat(_targetRow, "-").concat(_targetColumn)].isShot() === true &&
        // must contain a ship segment
        grid["square-".concat(_targetRow, "-").concat(_targetColumn)].containsShipSegment() === true) {
          var priorityRow = _targetRow;
          var priorityColumn = _targetColumn;
          var _iterator5 = _createForOfIteratorHelper(targets),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = _slicedToArray(_step5.value, 2),
                r = _step5$value[0],
                c = _step5$value[1];
              if (
              // current location and shot ship location must be adjacent
              (row === priorityRow && r === row || column === priorityColumn && c === column) &&
              // must not already be in t.o.h.p
              includesArray([r, c], targetsOfHigherProbabilty) < 0 &&
              // must already be in targets
              includesArray([r, c], targets) >= 0) {
                targetsOfHigherProbabilty.push([r, c]);
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
    }
    return [row, column];
  }
  return {
    grid: grid,
    ships: ships,
    isWithinGrid: isWithinGrid,
    doesNotOverlap: doesNotOverlap,
    placeShip: placeShip,
    shipsLocation: shipsLocation,
    allShipsPlaced: allShipsPlaced,
    allShipsSunk: allShipsSunk,
    huntTarget: huntTarget
  };
};


/***/ }),

/***/ "./src/gridsquare.js":
/*!***************************!*\
  !*** ./src/gridsquare.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridSquare": () => (/* binding */ GridSquare)
/* harmony export */ });
var GridSquare = function GridSquare() {
  var row;
  var column;
  var shipSegment = false;
  var shipSegmentType = null;
  var shotStatus = false;

  // GridSquare factory method to check if the square contains a ship segment
  var containsShipSegment = function containsShipSegment() {
    return shipSegment;
  };

  // GridSquare factory method to place a ship segment in the square
  var placeShipSegment = function placeShipSegment() {
    shipSegment = true;
  };

  // GridSquare factory method to return the square's ship segment type (null for no ship segment)
  var getShipSegmentType = function getShipSegmentType() {
    return shipSegmentType;
  };

  // GridSquare factory method to assign to the square a ship segment type
  var changeShipSegmentType = function changeShipSegmentType(shipType) {
    shipSegmentType = shipType;
  };

  // GridSquare factory method to check if the square has been shot
  var isShot = function isShot() {
    return shotStatus;
  };

  // GridSquare factory method to change the square shot status to true
  var placeShot = function placeShot() {
    shotStatus = true;
  };
  return {
    row: row,
    column: column,
    containsShipSegment: containsShipSegment,
    placeShipSegment: placeShipSegment,
    getShipSegmentType: getShipSegmentType,
    changeShipSegmentType: changeShipSegmentType,
    isShot: isShot,
    placeShot: placeShot
  };
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
var Player = function Player() {
  // Type: human / ai
  // Type to be used for ship placement: manual / random
  // Type to be used for shot taking: manual / algorithm
  var type = "human";

  // Name to be used in DOM text
  var name;

  // Player factory method to get the player type
  var getType = function getType() {
    return type;
  };

  // Player factory method to change the player type between human/ai
  var changeType = function changeType() {
    if (type === "human") {
      type = "ai";
    } else {
      type = "human";
    }
  };

  // Player factory method to get the player name
  var getName = function getName() {
    return name;
  };

  // Player factory method to change the player name
  var changeName = function changeName(newName) {
    name = newName;
  };
  return {
    getType: getType,
    changeType: changeType,
    getName: getName,
    changeName: changeName
  };
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "shipTypes": () => (/* binding */ shipTypes)
/* harmony export */ });
// Array with objects representing a ship name/type and corresponding length
var shipTypes = [{
  type: "carrier",
  length: 5
}, {
  type: "battleship",
  length: 4
}, {
  type: "cruiser",
  length: 3
}, {
  type: "submarine",
  length: 3
}, {
  type: "destroyer",
  length: 2
}];

// Ship factory
var Ship = function Ship(index) {
  var type = shipTypes[index].type;
  var length = shipTypes[index].length;
  var orientation = "horizontal";
  var placed = false;
  var hits = 0;

  // Ship factory method to get the ship orientation
  var getOrientation = function getOrientation() {
    return orientation;
  };

  // Ship factory method to change the orientation of a ship instance between horizontal/vertical
  var changeOrientation = function changeOrientation() {
    if (orientation === "horizontal") {
      orientation = "vertical";
    } else {
      orientation = "horizontal";
    }
  };

  // Ship factory method to get the ship placement status
  var isPlaced = function isPlaced() {
    return placed;
  };

  // Ship factory method to change the ship placement status to true
  var place = function place() {
    placed = true;
  };

  // Ship factory method to add a hit to a ship instance if not sunk
  var hit = function hit() {
    if (isSunk()) {
      return false;
    }
    hits += 1;
    return true;
  };

  // Ship factory method to check if a ship instance is sunk
  var isSunk = function isSunk() {
    if (hits === length) {
      return true;
    }
    return false;
  };
  return {
    type: type,
    length: length,
    getOrientation: getOrientation,
    changeOrientation: changeOrientation,
    isPlaced: isPlaced,
    place: place,
    hit: hit,
    isSunk: isSunk
  };
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/WarpThrusterEngravedRegular.otf */ "./src/fonts/WarpThrusterEngravedRegular.otf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: WarpThruster;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n:root {\n  --color-grid-black: black;\n  --color-grid-green: #61d6c3;\n  --color-grid-grey: grey;\n  --color-grid-orange: orange;\n  --color-grid-red: #cd6e63;\n  --color-grid-red-bright: red;\n  --color-grid-white: white;\n  --font-general: WarpThruster;\n}\n\nbody {\n  user-select: none;\n  font-family: var(--font-general);\n\n  height: 100vh;\n\n  margin: 0;\n  padding: 0;\n\n  display: grid;\n  grid-template-rows: 3rem fit-content 1fr 2rem;\n  justify-content: center;\n  justify-items: center;\n}\n\nbutton {\n  font-family: var(--font-general);\n  font-size: 1.25rem;\n\n}\n\nbutton.focus {\n  border-color: var(--color-grid-red-bright);\n  border-style: dashed;\n}\n\n.header {\n  border-bottom-style: solid;\n  border-bottom-width: 0.25rem;\n  width: 100%;\n\n  font-size: 2rem;\n\n  display: grid;\n  place-content: center;\n}\n\n.instructions {\n  border-style: dashed;\n  border-width: 0.3rem;\n  border-radius: 1rem;\n  padding: 1rem 2rem;\n  margin: 2rem 2rem 0 2rem;\n\n  font-size: 1.25rem;\n  text-align: center;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.instructions .button-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.instructions.game-over {\n  border-color: var(--color-grid-red-bright);\n}\n\n.instructions .game-over {\n  color: var(--color-grid-red-bright);\n}\n\n.main {\n  margin: 2rem 0;\n\n  display: flex;\n  flex-wrap: wrap;\n\n  align-items: center;\n  justify-content: center;\n  gap: 2rem;\n}\n\n.container {\n  border-style: dashed;\n  border-width: 0.3rem;\n  border-radius: 1rem;\n  padding: 0 2rem;\n\n  display: grid;\n  grid-template-rows: 2rem 1fr 2rem;\n}\n\n.container .player-text {\n  display: grid;\n  place-content: center;\n}\n\n.grid {\n  width: fit-content;\n  height: fit-content;\n\n  border-style: solid;\n  border-width: 0.25rem;\n\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid .grid-row {\n  width: fit-content;\n  height: fit-content;\n\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.grid .square {\n  position: relative;\n\n  border-style: solid;\n  border-width: 0.05rem;\n\n  width: min(max(3vh, 6vw), 3rem);\n  aspect-ratio: 1/1;\n\n  display: grid;\n  place-content: center;\n}\n\n.grid .square img {\n  width: min(max(2vh, 5vw), 2rem);\n}\n\n.grid .square.ship-hover-not-placeable {\n  background-color: var(--color-grid-red);\n}\n\n.grid .square.ship-hover-placeable {\n  background-color: var(--color-grid-green);\n}\n\n.grid .square.ship-hover-shooting {\n  background-color: var(--color-grid-orange);\n}\n\n.grid .square.ship-placed {\n  background-color: var(--color-grid-grey);\n}\n\n.footer {\n  border-top-style: solid;\n  border-top-width: 0.25rem;\n  width: 100%;\n\n  font-size: 1.1rem;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.footer a {\n  color: var(--color-grid-black);\n\n  display: grid;\n  place-content: center;\n\n  text-decoration: none;\n}\n\n.footer img {\n  height: 1.1rem;\n\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAoD;AACtD;;AAEA;EACE,yBAAyB;EACzB,2BAA2B;EAC3B,uBAAuB;EACvB,2BAA2B;EAC3B,yBAAyB;EACzB,4BAA4B;EAC5B,yBAAyB;EACzB,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;EACjB,gCAAgC;;EAEhC,aAAa;;EAEb,SAAS;EACT,UAAU;;EAEV,aAAa;EACb,6CAA6C;EAC7C,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,gCAAgC;EAChC,kBAAkB;;AAEpB;;AAEA;EACE,0CAA0C;EAC1C,oBAAoB;AACtB;;AAEA;EACE,0BAA0B;EAC1B,4BAA4B;EAC5B,WAAW;;EAEX,eAAe;;EAEf,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,wBAAwB;;EAExB,kBAAkB;EAClB,kBAAkB;;EAElB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,cAAc;;EAEd,aAAa;EACb,eAAe;;EAEf,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,oBAAoB;EACpB,oBAAoB;EACpB,mBAAmB;EACnB,eAAe;;EAEf,aAAa;EACb,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;;EAEnB,mBAAmB;EACnB,qBAAqB;;EAErB,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;;EAEnB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,kBAAkB;;EAElB,mBAAmB;EACnB,qBAAqB;;EAErB,+BAA+B;EAC/B,iBAAiB;;EAEjB,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,uBAAuB;EACvB,yBAAyB;EACzB,WAAW;;EAEX,iBAAiB;;EAEjB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,8BAA8B;;EAE9B,aAAa;EACb,qBAAqB;;EAErB,qBAAqB;AACvB;;AAEA;EACE,cAAc;;AAEhB","sourcesContent":["@font-face {\n  font-family: WarpThruster;\n  src: url(\"../fonts/WarpThrusterEngravedRegular.otf\");\n}\n\n:root {\n  --color-grid-black: black;\n  --color-grid-green: #61d6c3;\n  --color-grid-grey: grey;\n  --color-grid-orange: orange;\n  --color-grid-red: #cd6e63;\n  --color-grid-red-bright: red;\n  --color-grid-white: white;\n  --font-general: WarpThruster;\n}\n\nbody {\n  user-select: none;\n  font-family: var(--font-general);\n\n  height: 100vh;\n\n  margin: 0;\n  padding: 0;\n\n  display: grid;\n  grid-template-rows: 3rem fit-content 1fr 2rem;\n  justify-content: center;\n  justify-items: center;\n}\n\nbutton {\n  font-family: var(--font-general);\n  font-size: 1.25rem;\n\n}\n\nbutton.focus {\n  border-color: var(--color-grid-red-bright);\n  border-style: dashed;\n}\n\n.header {\n  border-bottom-style: solid;\n  border-bottom-width: 0.25rem;\n  width: 100%;\n\n  font-size: 2rem;\n\n  display: grid;\n  place-content: center;\n}\n\n.instructions {\n  border-style: dashed;\n  border-width: 0.3rem;\n  border-radius: 1rem;\n  padding: 1rem 2rem;\n  margin: 2rem 2rem 0 2rem;\n\n  font-size: 1.25rem;\n  text-align: center;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.instructions .button-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.instructions.game-over {\n  border-color: var(--color-grid-red-bright);\n}\n\n.instructions .game-over {\n  color: var(--color-grid-red-bright);\n}\n\n.main {\n  margin: 2rem 0;\n\n  display: flex;\n  flex-wrap: wrap;\n\n  align-items: center;\n  justify-content: center;\n  gap: 2rem;\n}\n\n.container {\n  border-style: dashed;\n  border-width: 0.3rem;\n  border-radius: 1rem;\n  padding: 0 2rem;\n\n  display: grid;\n  grid-template-rows: 2rem 1fr 2rem;\n}\n\n.container .player-text {\n  display: grid;\n  place-content: center;\n}\n\n.grid {\n  width: fit-content;\n  height: fit-content;\n\n  border-style: solid;\n  border-width: 0.25rem;\n\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid .grid-row {\n  width: fit-content;\n  height: fit-content;\n\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.grid .square {\n  position: relative;\n\n  border-style: solid;\n  border-width: 0.05rem;\n\n  width: min(max(3vh, 6vw), 3rem);\n  aspect-ratio: 1/1;\n\n  display: grid;\n  place-content: center;\n}\n\n.grid .square img {\n  width: min(max(2vh, 5vw), 2rem);\n}\n\n.grid .square.ship-hover-not-placeable {\n  background-color: var(--color-grid-red);\n}\n\n.grid .square.ship-hover-placeable {\n  background-color: var(--color-grid-green);\n}\n\n.grid .square.ship-hover-shooting {\n  background-color: var(--color-grid-orange);\n}\n\n.grid .square.ship-placed {\n  background-color: var(--color-grid-grey);\n}\n\n.footer {\n  border-top-style: solid;\n  border-top-width: 0.25rem;\n  width: 100%;\n\n  font-size: 1.1rem;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.footer a {\n  color: var(--color-grid-black);\n\n  display: grid;\n  place-content: center;\n\n  text-decoration: none;\n}\n\n.footer img {\n  height: 1.1rem;\n\n}"],"sourceRoot":""}]);
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
  var list = []; // return the list of modules as css string

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
  }; // import a list of modules into the list


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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
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
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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
  } // For old IE

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

/***/ "./src/fonts/WarpThrusterEngravedRegular.otf":
/*!***************************************************!*\
  !*** ./src/fonts/WarpThrusterEngravedRegular.otf ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1767e54f505d313f3610.otf";

/***/ }),

/***/ "./src/images/bomb.png":
/*!*****************************!*\
  !*** ./src/images/bomb.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "30b4f8994c7dbc209634.png";

/***/ }),

/***/ "./src/images/github_logo.png":
/*!************************************!*\
  !*** ./src/images/github_logo.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31ae5af2eb8f5a195706.png";

/***/ }),

/***/ "./src/images/splash.png":
/*!*******************************!*\
  !*** ./src/images/splash.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cf6de7b08cdb0dd87b08.png";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _images_github_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/github_logo.png */ "./src/images/github_logo.png");
/* harmony import */ var _images_bomb_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/bomb.png */ "./src/images/bomb.png");
/* harmony import */ var _images_splash_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/splash.png */ "./src/images/splash.png");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







// Create header element
var header = document.createElement("header");
header.classList.add("header");
header.textContent = "BATTLESHIP";
document.body.appendChild(header);

// Create game instructions div element
var instructionsDiv = document.createElement("div");
instructionsDiv.classList.add("instructions");
document.body.appendChild(instructionsDiv);

// Create instructions button container 1 for game buttons
var buttonContainer1 = document.createElement("div");
buttonContainer1.classList.add("button-container");
instructionsDiv.appendChild(buttonContainer1);

// Create new game button
var newGameButton = document.createElement("button");
newGameButton.classList.add("new-game-button");
newGameButton.textContent = "NEW GAME";
buttonContainer1.appendChild(newGameButton);
newGameButton.addEventListener("click", function () {
  if (confirm("Reset And Start A New Game?")) {
    game();
  }
});

// Create versus button
var versusButton = document.createElement("button");
versusButton.classList.add("versus-button");
buttonContainer1.appendChild(versusButton);

// Create start game button
var startGameButton = document.createElement("button");
startGameButton.classList.add("start-game-button");
startGameButton.textContent = "START";
buttonContainer1.appendChild(startGameButton);

// Create game instructions text div
var instructionsTextDiv = document.createElement("div");
instructionsTextDiv.classList.add("instructions-text");
instructionsDiv.appendChild(instructionsTextDiv);

// Create instructions button container 2 for ship placement buttons
var buttonContainer2 = document.createElement("div");
buttonContainer2.classList.add("button-container");
instructionsDiv.appendChild(buttonContainer2);

// Create rotate ship placement button
var rotateShipButton = document.createElement("button");
rotateShipButton.classList.add("rotate-ship-button");
rotateShipButton.textContent = "ROTATE SHIP";
buttonContainer2.appendChild(rotateShipButton);

// Create next player button
var nextPlayerButton = document.createElement("button");
nextPlayerButton.classList.add("next-player-button");
nextPlayerButton.textContent = "NEXT PLAYER";
buttonContainer2.appendChild(nextPlayerButton);

// Create main div element
var mainDiv = document.createElement("div");
mainDiv.classList.add("main");
document.body.appendChild(mainDiv);

// Create container 1 div element
var gridContainerDiv1 = document.createElement("div");
gridContainerDiv1.classList.add("container");
gridContainerDiv1.classList.add("container-1");
mainDiv.appendChild(gridContainerDiv1);

// Create player 1 title div element
var playerTitleDiv1 = document.createElement("div");
playerTitleDiv1.classList.add("player-text");
playerTitleDiv1.textContent = "PLAYER 1";
gridContainerDiv1.appendChild(playerTitleDiv1);

// Create grid 1 div element
var gridDiv1 = document.createElement("div");
gridDiv1.classList.add("grid");
gridDiv1.classList.add("grid-1");
gridContainerDiv1.appendChild(gridDiv1);

// Create player 1 title div element
var playerTextDiv1 = document.createElement("div");
playerTextDiv1.classList.add("player-text");
playerTextDiv1.textContent = "HUMAN";
gridContainerDiv1.appendChild(playerTextDiv1);

// Create container 2 div element
var gridContainerDiv2 = document.createElement("div");
gridContainerDiv2.classList.add("container");
gridContainerDiv2.classList.add("container-2");
mainDiv.appendChild(gridContainerDiv2);

// Create player 2 title div element
var playerTitleDiv2 = document.createElement("div");
playerTitleDiv2.classList.add("player-text");
playerTitleDiv2.textContent = "PLAYER 2";
gridContainerDiv2.appendChild(playerTitleDiv2);

// Create grid 2 div element
var gridDiv2 = document.createElement("div");
gridDiv2.classList.add("grid");
gridDiv2.classList.add("grid-2");
gridContainerDiv2.appendChild(gridDiv2);

// Create player 2 title div element
var playerTextDiv2 = document.createElement("div");
playerTextDiv2.classList.add("player-text");
playerTextDiv2.textContent = "COMPUTER";
gridContainerDiv2.appendChild(playerTextDiv2);

// Create footer element
var footer = document.createElement("footer");
footer.classList.add("footer");
document.body.appendChild(footer);

// Footer text element
var footerTextDiv = document.createElement("div");
footerTextDiv.textContent = "The Odin Project - joemattar";
footer.appendChild(footerTextDiv);

// Footer a element
var footerA = document.createElement("a");
footerA.href = "https://github.com/joemattar";
footerA.target = "_blank";
footer.appendChild(footerA);

// Footer img element
var footerImg = document.createElement("img");
footerImg.src = _images_github_logo_png__WEBPACK_IMPORTED_MODULE_1__;
footerA.appendChild(footerImg);

// Create player 1 as human
var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_5__.Player)();
// Set player 1 name
player1.changeName("PLAYER 1");
// Declare player 2 as human
var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_5__.Player)();
// Set player 2 name
player2.changeName("PLAYER 2");
// Change player 2 type to ai
player2.changeType();

// Add event listener to versus button
versusButton.addEventListener("click", function () {
  if (player2.getType() === "ai") {
    versusButton.value = "human";
    versusButton.textContent = "P.v.P";
    playerTextDiv2.textContent = "HUMAN";
    player2.changeType();
  } else if (player2.getType() === "human") {
    versusButton.value = "ai";
    versusButton.textContent = "P.v.AI.";
    playerTextDiv2.textContent = "COMPUTER";
    player2.changeType();
  }
  console.log("player 1 is:", player1.getType(), "player 2 is:", player2.getType());
});

// Function to manage the game
function game() {
  // Create grid 1 square divs
  createGrid(gridDiv1);
  // Create grid 2 square divs
  createGrid(gridDiv2);

  // Create player 1's gameboard
  var gameboard1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_4__.Gameboard)();
  // Create player 2's gameboard
  var gameboard2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_4__.Gameboard)();

  // Declare game and play variables
  var currentPlayer = player1;
  var currentGameBoard = gameboard1;
  var nextGameBoard = gameboard2;
  var currentGridClass = "grid-1";
  var nextGridClass = "grid-2";
  var currentShipIndex = 0;
  var currentShip = currentGameBoard.ships[currentShipIndex];
  var currentGridDiv;
  var row;
  var column;
  var shipPlacementPhase = false;
  var shipPlacementInterphase = false;
  var shootingPhase = false;
  var shootingInterphase = false;

  // Initialize starting disabled state of buttons
  playerTextDiv2.textContent = "COMPUTER";
  versusButton.textContent = "P.v.AI.";
  versusButton.value = "ai";
  versusButton.disabled = false;
  startGameButton.disabled = false;
  rotateShipButton.disabled = true;
  nextPlayerButton.disabled = true;
  versusButton.classList.add("focus");
  startGameButton.classList.add("focus");
  instructionsTextDiv.classList.remove("game-over");
  instructionsDiv.classList.remove("game-over");

  // Add event listener to start game button
  startGameButton.addEventListener("click", function () {
    versusButton.disabled = true;
    startGameButton.disabled = true;
    rotateShipButton.disabled = false;
    shipPlacementPhase = true;
    instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR ").concat(currentShip.type.toUpperCase(), " - LENGTH ").concat(currentShip.length);
    versusButton.classList.remove("focus");
    startGameButton.classList.remove("focus");
  });

  // Set instructions text initial text content
  instructionsTextDiv.textContent = "PLAYER 1 CHOOSE YOUR OPPONENT TYPE AI/HUMAN";

  // Add event listener to rotate ship button
  rotateShipButton.addEventListener("click", function () {
    currentShip.changeOrientation();
  });

  // Add event listener to next player button
  nextPlayerButton.addEventListener("click", function () {
    // Interphase after player 1 placed ships --> passing to player 2 for ship placement
    if (shipPlacementInterphase === true && gameboard2.allShipsPlaced() === false) {
      shipPlacementPhase = true;
      shipPlacementInterphase = false;
      rotateShipButton.disabled = false;
      nextPlayerButton.disabled = true;
      instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR ").concat(currentShip.type.toUpperCase(), " - LENGTH ").concat(currentShip.length);
    }
    // Interphase after Player 2 placed ships --> passing back to player 1 for shooting phase
    if (shipPlacementInterphase === true && gameboard2.allShipsPlaced() === true) {
      shipPlacementInterphase = false;
      shootingPhase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = true;
      unhideShips("grid-1", gameboard1);
      instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR SHOT");
    }
    // Interphase after a player made a shot
    if (shootingInterphase === true) {
      shootingInterphase = false;
      shootingPhase = true;
      nextPlayerButton.disabled = true;
      unhideShips(currentGridClass, currentGameBoard);
      // UNHIDE OPPONENT SUNK SHIPS
      unhideSunkShips(nextGridClass, nextGameBoard);
      instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR SHOT");
    }
  });

  // Function to fill grid
  function createGrid(gridDiv) {
    gridDiv.textContent = "";
    for (var i = 10; i >= 1; i -= 1) {
      // Create row div
      var newGridRowDiv = document.createElement("div");
      newGridRowDiv.classList.add("grid-row");
      gridDiv.appendChild(newGridRowDiv);
      for (var j = 1; j <= 10; j += 1) {
        // Create square div
        var newGridSquareDiv = document.createElement("div");
        newGridSquareDiv.classList.add("square");
        newGridSquareDiv.dataset.row = i;
        newGridSquareDiv.dataset.column = j;
        newGridRowDiv.appendChild(newGridSquareDiv);
        // Add event listener on mouse enter to display the ship possible placement
        newGridSquareDiv.addEventListener("mouseenter", onMouseEnterSquareDiv);
        // Add event listener in mouse leave to remove all related classes
        newGridSquareDiv.addEventListener("mouseleave", onMouseLeaveSquareDiv);
        // Add event listener on mouse click over a square
        newGridSquareDiv.addEventListener("click", onMouseClickSquareDiv);
      }
    }
  }

  // Function to manage a mouse entering a square div
  function onMouseEnterSquareDiv(e) {
    // Triggers during Ship Placement phase
    if (shipPlacementPhase === true && currentPlayer.getType() === "human") {
      if (isWithinGridAndDoesNotOverlapEvent(e) === true) {
        var _iterator = _createForOfIteratorHelper(getShipSquareDivsOnEvent(e)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var activeDiv = _step.value;
            activeDiv.classList.add("ship-hover-placeable");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (isWithinGridAndDoesNotOverlapEvent(e) === false) {
        var _iterator2 = _createForOfIteratorHelper(getShipSquareDivsOnEvent(e)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _activeDiv = _step2.value;
            _activeDiv.classList.add("ship-hover-not-placeable");
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
    // Triggers during shooting phase
    if (shootingPhase === true && currentPlayer.getType() === "human" && isWithinOpponentGrid(e) === true) {
      e.target.classList.add("ship-hover-shooting");
    }
  }

  // Function to manage a mouse leaving a square div
  function onMouseLeaveSquareDiv(e) {
    // Triggers during all phases
    var _iterator3 = _createForOfIteratorHelper(getShipSquareDivsOnEvent(e)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var activeDiv = _step3.value;
        activeDiv.classList.remove("ship-hover-not-placeable");
        activeDiv.classList.remove("ship-hover-placeable");
        e.target.classList.remove("ship-hover-shooting");
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  // Function to manage a mouse clicking a square div
  function onMouseClickSquareDiv(e) {
    // Triggers during ship placement phase
    if (shipPlacementPhase === true && currentPlayer.getType() === "human" && isWithinGridAndDoesNotOverlapEvent(e) === true) {
      if (currentGameBoard.allShipsPlaced() === false) {
        row = getGridSquareDivRow(e.target);
        column = getGridSquareDivColumn(e.target);
        // Ship placement Backend
        placeShipsBackend(row, column);
        // Ship placement front end
        var _iterator4 = _createForOfIteratorHelper(getShipSquareDivsOnEvent(e)),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var activeDiv = _step4.value;
            activeDiv.classList.add("ship-placed");
            activeDiv.classList.remove("ship-hover-not-placeable");
            activeDiv.classList.remove("ship-hover-placeable");
            e.target.classList.remove("ship-hover-shooting");
          }
          // If player placement not complete, increment ship index
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        if (currentGameBoard.allShipsPlaced() === false) {
          currentShipIndex += 1;
          currentShip = currentGameBoard.ships[currentShipIndex];
          instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR ").concat(currentShip.type.toUpperCase(), " - LENGTH ").concat(currentShip.length);
        } else if (currentGameBoard.allShipsPlaced() === true) {
          switchCurrentPlayer();
          // If player 1 ships placed, trigger ship placement interphase
          checkThenTriggerShipPlacementInterphase();
          if (currentPlayer.getType() === "ai") {
            // AI ship placement
            instructionsTextDiv.textContent = "AI SHIP PLACEMENT";
            placeShipsRandomly();
            hideShips(currentGridClass, currentGameBoard);
            switchCurrentPlayer();
          }
        }
      }
    }

    // If all ships placed, trigger shooting phase
    checkThenTriggerShootingPhase();

    // Triggers during shooting phase
    if (shootingPhase === true && currentPlayer.getType() === "human" && isWithinOpponentGrid(e) === true) {
      // Shooting phase code
      if (shootEvent(e) === true) {
        unhideSunkShips(nextGridClass, nextGameBoard);
        switchCurrentPlayer();
        // If in shooting phase, triggers if player 2 is human after player 1 shoots
        checkThenTriggerShootingInterphase();
        if (currentPlayer.getType() === "ai") {
          while (shootAi() === false) {
            continue;
          }
          switchCurrentPlayer();
        }
      }
    }

    // If any gameboard has all ship sunk, trigger end game
    checkThenTriggerEndgame();
  }

  // Function to fetch a grid square div row
  function getGridSquareDivRow(squareDiv) {
    return Number(squareDiv.dataset.row);
  }

  // Function to fetch a grid square div column
  function getGridSquareDivColumn(squareDiv) {
    return Number(squareDiv.dataset.column);
  }

  // Function to select the ship square divs from an event
  function getShipSquareDivsOnEvent(e) {
    row = getGridSquareDivRow(e.target);
    column = getGridSquareDivColumn(e.target);
    var shipSquareDivs = getShipSquareDivs(row, column);
    return shipSquareDivs;
  }

  // Function to select the ship square divs given row and column
  function getShipSquareDivs(row, column) {
    var shipSquareDivs = [];
    if (currentShip.getOrientation() === "horizontal") {
      for (var i = column; i <= Math.min(10, column + currentShip.length - 1); i += 1) {
        shipSquareDivs.push(document.querySelector(".".concat(currentGridClass, " [data-row=\"").concat(row, "\"][data-column=\"").concat(i, "\"]")));
      }
    } else if (currentShip.getOrientation() === "vertical") {
      for (var _i = row; _i >= Math.max(1, row - currentShip.length + 1); _i -= 1) {
        shipSquareDivs.push(document.querySelector(".".concat(currentGridClass, " [data-row=\"").concat(_i, "\"][data-column=\"").concat(column, "\"]")));
      }
    }
    return shipSquareDivs;
  }

  // Function that returns true when a ship is within grid and doesnt overlap from event
  function isWithinGridAndDoesNotOverlapEvent(e) {
    currentGridDiv = e.target.parentNode.parentNode;
    row = getGridSquareDivRow(e.target);
    column = getGridSquareDivColumn(e.target);
    if (shipPlacementPhase === true && currentGridDiv.classList.contains(currentGridClass) === true && currentPlayer.getType() === "human") {
      if (isWithinGridAndDoesNoOverlap(row, column) === true) {
        return true;
      } else {
        return false;
      }
    }
    return null;
  }

  // Function that returns true when a ship is within grid and doesnt overlap given row and column
  function isWithinGridAndDoesNoOverlap(row, column) {
    if (currentGameBoard.isWithinGrid(row, column, currentShip.length, currentShip.getOrientation()) === true && currentGameBoard.doesNotOverlap(row, column, currentShip.length, currentShip.getOrientation()) === true) {
      return true;
    } else {
      return false;
    }
  }

  // Function that randomly places one set of ships
  function placeShipsRandomly() {
    while (currentGameBoard.allShipsPlaced() === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      var x = Math.floor(Math.random() * 2) + 1;
      if (x % 2 === 0) {
        currentShip.changeOrientation();
      }
      if (isWithinGridAndDoesNoOverlap(row, column)) {
        // Ship placement Backend
        placeShipsBackend(row, column);
        // Ship placement front end
        var _iterator5 = _createForOfIteratorHelper(getShipSquareDivs(row, column)),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var activeDiv = _step5.value;
            activeDiv.classList.add("ship-placed");
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        currentShipIndex += 1;
        currentShip = currentGameBoard.ships[currentShipIndex];
      }
    }
  }

  // Function that updates ship placement in the Ship factory and the Gameboard grid Square factory
  function placeShipsBackend(row, column) {
    // Update corresponding gameboard grid object squares
    currentGameBoard.placeShip(row, column, currentShip.length, currentShip.getOrientation(), currentShip.type);
    // Update corresponding ship object place variable
    currentShip.place();
  }

  // Function to check and trigger ship placement interphase (skipsinterphase if player 2 is ai)
  function checkThenTriggerShipPlacementInterphase() {
    // When player 1 places last ship --> triggers ship placement interphase
    if (gameboard1.allShipsPlaced() === true && gameboard2.allShipsPlaced() === false && currentShipIndex === 0 && shipPlacementPhase === true && player2.getType() === "human") {
      shipPlacementPhase = false;
      shipPlacementInterphase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-1", gameboard1);
      instructionsTextDiv.textContent = "PASS COMPUTER TO ".concat(currentPlayer.getName());
    }
    // When player 2 places last ship --> triggers ship placement interphase
    if (gameboard1.allShipsPlaced() === true && gameboard2.allShipsPlaced() === true && shipPlacementPhase === true && player2.getType() === "human") {
      shipPlacementPhase = false;
      shipPlacementInterphase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-2", gameboard2);
      instructionsTextDiv.textContent = "PASS COMPUTER TO ".concat(currentPlayer.getName());
    }
  }

  // Function to hide a grid's unsunk ship segments given grid class (ie "grid-1")
  function hideShips(gridClass, gameboard) {
    var _iterator6 = _createForOfIteratorHelper(gameboard.shipsLocation),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var shipLocation = _step6.value;
        var i = shipLocation[0];
        var j = shipLocation[1];
        var selectedSquareDiv = document.querySelector(".".concat(gridClass, " [data-row=\"").concat(i, "\"][data-column=\"").concat(j, "\"]"));
        selectedSquareDiv.classList.remove("ship-placed");
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }

  // Function to unhide a grid's ship segments given grid class (ie "grid-1")
  function unhideShips(gridClass, gameboard) {
    var _iterator7 = _createForOfIteratorHelper(gameboard.shipsLocation),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var shipLocation = _step7.value;
        var i = shipLocation[0];
        var j = shipLocation[1];
        var selectedSquareDiv = document.querySelector(".".concat(gridClass, " [data-row=\"").concat(i, "\"][data-column=\"").concat(j, "\"]"));
        selectedSquareDiv.classList.add("ship-placed");
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }

  // Function to unhide a grid's ship segments given grid class (ie "grid-1")
  function unhideSunkShips(gridClass, gameboard) {
    var _iterator8 = _createForOfIteratorHelper(gameboard.shipsLocation),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var shipLocation = _step8.value;
        var _row = shipLocation[0];
        var _column = shipLocation[1];
        var selectedSquareDiv = document.querySelector(".".concat(gridClass, " [data-row=\"").concat(_row, "\"][data-column=\"").concat(_column, "\"]"));
        var selectedShipType = gameboard.grid["square-".concat(_row, "-").concat(_column)].getShipSegmentType();
        var _iterator9 = _createForOfIteratorHelper(gameboard.ships),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var ship = _step9.value;
            if (ship.type === selectedShipType && ship.isSunk() === true) {
              selectedSquareDiv.classList.add("ship-placed");
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  }

  // Function to switch player current status
  function switchCurrentPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentGameBoard = gameboard2;
      nextGameBoard = gameboard1;
      currentGridClass = "grid-2";
      nextGridClass = "grid-1";
    } else {
      currentPlayer = player1;
      currentGameBoard = gameboard1;
      nextGameBoard = gameboard2;
      currentGridClass = "grid-1";
      nextGridClass = "grid-2";
    }
    // Logic during ship placement phase
    if (shipPlacementPhase === true) {
      currentShipIndex = 0;
      currentShip = currentGameBoard.ships[currentShipIndex];
      instructionsTextDiv.textContent = "".concat(currentPlayer.getName(), " PLACE YOUR ").concat(currentShip.type.toUpperCase(), " - LENGTH ").concat(currentShip.length);
    }
  }

  // Function to check and trigger shooting phase
  function checkThenTriggerShootingPhase() {
    if (gameboard1.allShipsPlaced() === true && gameboard2.allShipsPlaced() === true && shipPlacementPhase === true && player2.getType() === "ai") {
      shipPlacementPhase = false;
      rotateShipButton.disabled = true;
      shootingPhase = true;
      instructionsTextDiv.textContent = "SHOOTING PHASE - PLACE YOUR SHOT";
    }
  }

  // Function to check and trigger shooting interphase
  function checkThenTriggerShootingInterphase() {
    if (shootingPhase === true && player2.getType() === "human") {
      shootingPhase = false;
      shootingInterphase = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-1", gameboard1);
      unhideSunkShips("grid-1", gameboard1);
      hideShips("grid-2", gameboard2);
      unhideSunkShips("grid-2", gameboard2);
      instructionsTextDiv.textContent = "PASS COMPUTER TO ".concat(currentPlayer.getName());
    }
  }

  // Function to return true if mouse is over the opponent grid
  function isWithinOpponentGrid(e) {
    if (currentPlayer.getType() === "human") {
      if (e.target.parentNode.parentNode.classList.contains(nextGridClass) === true) {
        return true;
      }
      return false;
    }
  }

  // Function to manage shooting logic from event
  function shootEvent(e) {
    if (e.target.classList.contains("square") === true) {
      row = getGridSquareDivRow(e.target);
      column = getGridSquareDivColumn(e.target);
      return shoot(row, column);
    }
    return false;
  }

  // Function to manage AI shooting algorithm
  function shootAi() {
    var _nextGameBoard$huntTa = nextGameBoard.huntTarget(),
      _nextGameBoard$huntTa2 = _slicedToArray(_nextGameBoard$huntTa, 2),
      row = _nextGameBoard$huntTa2[0],
      column = _nextGameBoard$huntTa2[1];
    return shoot(row, column);
  }

  // Function to manage shooting logic given row and column
  function shoot(row, column) {
    // Find the target square div and append to it an img element
    var targetSquareDiv = document.querySelector(".".concat(nextGridClass, " [data-row=\"").concat(row, "\"][data-column=\"").concat(column, "\"]"));
    var targetImg = document.createElement("img");
    targetSquareDiv.appendChild(targetImg);
    // If grid square is not shot yet
    if (nextGameBoard.grid["square-".concat(row, "-").concat(column)].isShot() === false) {
      if (
      // if grid square contains a ship segment
      nextGameBoard.grid["square-".concat(row, "-").concat(column)].containsShipSegment() === true) {
        // Place shot on gameboard grid square
        nextGameBoard.grid["square-".concat(row, "-").concat(column)].placeShot();
        // Assign BOMB PICTURE TO target img
        targetImg.src = _images_bomb_png__WEBPACK_IMPORTED_MODULE_2__;
        // Mark corresponding gameboard ship as hit
        var targetShipType = nextGameBoard.grid["square-".concat(row, "-").concat(column)].getShipSegmentType();
        var _iterator10 = _createForOfIteratorHelper(nextGameBoard.ships),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var ship = _step10.value;
            if (ship.type === targetShipType) {
              ship.hit();
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      } else if (
      // if grid square does not contain ship segment
      nextGameBoard.grid["square-".concat(row, "-").concat(column)].containsShipSegment() === false) {
        // Place shot on gameboard grid square
        nextGameBoard.grid["square-".concat(row, "-").concat(column)].placeShot();
        // Assign WATER SPLASH PICTURE TO target img
        targetImg.src = _images_splash_png__WEBPACK_IMPORTED_MODULE_3__;
      }
      // After the shot is made return true
      return true;
    }
    // If the shot cannot be made return false
    return false;
  }

  // Function to check and trigger endgame
  function checkThenTriggerEndgame() {
    if (gameboard1.allShipsSunk() === true || gameboard2.allShipsSunk() === true) {
      shootingPhase = false;
      shootingInterphase = false;
      instructionsTextDiv.classList.add("game-over");
      instructionsDiv.classList.add("game-over");
      unhideShips(currentGridClass, currentGameBoard);
      unhideShips(nextGridClass, nextGameBoard);
      if (gameboard1.allShipsSunk() === true) {
        instructionsTextDiv.textContent = "GAME OVER! THE WINNER IS PLAYER 2";
      }
      if (gameboard2.allShipsSunk() === true) {
        instructionsTextDiv.textContent = "GAME OVER! THE WINNER IS PLAYER 1";
      }
    }
  }
}
game();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsQ0FBQzlGLFlBQVksRUFBRSxLQUFLLElBQUksSUFDbEMrRixVQUFVLENBQUMvRixZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQ2xDO01BQ0EwRyxhQUFhLEdBQUcsS0FBSztNQUNyQkMsa0JBQWtCLEdBQUcsS0FBSztNQUMxQnZDLG1CQUFtQixDQUFDYixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7TUFDOUNJLGVBQWUsQ0FBQ0wsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO01BQzFDdUQsV0FBVyxDQUFDWixnQkFBZ0IsRUFBRUYsZ0JBQWdCLENBQUM7TUFDL0NjLFdBQVcsQ0FBQ1gsYUFBYSxFQUFFRixhQUFhLENBQUM7TUFDekMsSUFBSUosVUFBVSxDQUFDOUYsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RDb0UsbUJBQW1CLENBQUNYLFdBQVcsR0FBRyxtQ0FBbUM7TUFDdkU7TUFDQSxJQUFJc0MsVUFBVSxDQUFDL0YsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RDb0UsbUJBQW1CLENBQUNYLFdBQVcsR0FBRyxtQ0FBbUM7TUFDdkU7SUFDRjtFQUNGO0FBQ0Y7QUFFQVEsSUFBSSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dyaWRzcXVhcmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3NzL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3NzL3N0eWxlcy5jc3M/OTlhMyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkU3F1YXJlIH0gZnJvbSBcIi4vZ3JpZHNxdWFyZVwiO1xuaW1wb3J0IHsgU2hpcCwgc2hpcFR5cGVzIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8vIERlY2xhcmUgZ3JpZCBlbXB0eSBvYmplY3RcbiAgY29uc3QgZ3JpZCA9IHt9O1xuXG4gIC8vIEZpbGwgZ3JpZCB3aXRoIEdyaWRTcXVhcmUgb2JqZWN0c1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gMTA7IGogKz0gMSkge1xuICAgICAgY29uc3QgbmV3R3JpZFNxdWFyZSA9IEdyaWRTcXVhcmUoKTtcbiAgICAgIG5ld0dyaWRTcXVhcmUucm93ID0gaTtcbiAgICAgIG5ld0dyaWRTcXVhcmUuY29sdW1uID0gajtcbiAgICAgIGdyaWRbYHNxdWFyZS0ke2l9LSR7an1gXSA9IG5ld0dyaWRTcXVhcmU7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVjbGFyZSBhbmQgcG9wdWxhdGUgZ2FtZWJvYXJkIHNoaXBzIGFycmF5XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFR5cGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgbmV3U2hpcCA9IFNoaXAoaSk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgfVxuXG4gIC8vIEdhbWVib2FyZCBmYWN0b3J5IG1ldGhvZCB0byBjaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyB3aXRoaW4gZ3JpZFxuICBjb25zdCBpc1dpdGhpbkdyaWQgPSAocm93LCBjb2x1bW4sIGxlbmd0aCwgb3JpZW50YXRpb24pID0+IHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiICYmIGNvbHVtbiArIGxlbmd0aCAtIDEgPD0gMTApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiAmJiByb3cgLSBsZW5ndGggKyAxID49IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gR2FtZWJvYXJkIGZhY3RvcnkgbWV0aG9kIHRvIGNoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGRvZXMgbm90IG92ZXJsYXAgb3RoZXIgc2hpcHNcbiAgY29uc3QgZG9lc05vdE92ZXJsYXAgPSAocm93LCBjb2x1bW4sIGxlbmd0aCwgb3JpZW50YXRpb24pID0+IHtcbiAgICBpZiAoXG4gICAgICBpc1dpdGhpbkdyaWQocm93LCBjb2x1bW4sIGxlbmd0aCwgb3JpZW50YXRpb24pID09PSB0cnVlICYmXG4gICAgICBvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCJcbiAgICApIHtcbiAgICAgIGZvciAobGV0IGkgPSBjb2x1bW47IGkgPCBjb2x1bW4gKyBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JpZFtgc3F1YXJlLSR7cm93fS0ke2l9YF0uY29udGFpbnNTaGlwU2VnbWVudCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaXNXaXRoaW5HcmlkKHJvdywgY29sdW1uLCBsZW5ndGgsIG9yaWVudGF0aW9uKSA9PT0gdHJ1ZSAmJlxuICAgICAgb3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIlxuICAgICkge1xuICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA+IHJvdyAtIGxlbmd0aDsgaSAtPSAxKSB7XG4gICAgICAgIGlmIChncmlkW2BzcXVhcmUtJHtpfS0ke2NvbHVtbn1gXS5jb250YWluc1NoaXBTZWdtZW50KCkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHNMb2NhdGlvbiA9IFtdO1xuXG4gIC8vIEdhbWVib2FyZCBmYWN0b3J5IG1ldGhvZCB0byBwbGFjZSBhIHNoaXAgZ2l2ZW4gYSBzZXQgb2YgY29vcmRpbmF0ZXMgKGEgZ3JpZCBzcXVhcmUpXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgbGVuZ3RoLCBvcmllbnRhdGlvbiwgdHlwZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIGlzV2l0aGluR3JpZChyb3csIGNvbHVtbiwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT09IHRydWUgJiZcbiAgICAgIGRvZXNOb3RPdmVybGFwKHJvdywgY29sdW1uLCBsZW5ndGgsIG9yaWVudGF0aW9uKSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gY29sdW1uOyBpIDwgY29sdW1uICsgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBncmlkW2BzcXVhcmUtJHtyb3d9LSR7aX1gXS5wbGFjZVNoaXBTZWdtZW50KCk7XG4gICAgICAgICAgZ3JpZFtgc3F1YXJlLSR7cm93fS0ke2l9YF0uY2hhbmdlU2hpcFNlZ21lbnRUeXBlKHR5cGUpO1xuICAgICAgICAgIHNoaXBzTG9jYXRpb24ucHVzaChbcm93LCBpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpID4gcm93IC0gbGVuZ3RoOyBpIC09IDEpIHtcbiAgICAgICAgICBncmlkW2BzcXVhcmUtJHtpfS0ke2NvbHVtbn1gXS5wbGFjZVNoaXBTZWdtZW50KCk7XG4gICAgICAgICAgZ3JpZFtgc3F1YXJlLSR7aX0tJHtjb2x1bW59YF0uY2hhbmdlU2hpcFNlZ21lbnRUeXBlKHR5cGUpO1xuICAgICAgICAgIHNoaXBzTG9jYXRpb24ucHVzaChbaSwgY29sdW1uXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gR2FtZWJvYXJkIGZhY3RvcnkgbWV0aG9kIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG4gIGNvbnN0IGFsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgIGlmIChzaGlwLmlzUGxhY2VkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gR2FtZWJvYXJkIGZhY3RvcnkgbWV0aG9kIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgc2hpcCBvZiBzaGlwcykge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gZ2V0IHRoZSBsZW5ndGggb2YgdGhlIGxhcmdlc3QgdW5zdW5rIHNoaXAgaW4gdGhlIGdyaWRcbiAgZnVuY3Rpb24gbGFyZ2VzdFVuc3Vua1NoaXBMZW5ndGgoKSB7XG4gICAgbGV0IG1heExlbmd0aCA9IDI7XG4gICAgZm9yIChsZXQgc2hpcCBvZiBzaGlwcykge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkgPT09IGZhbHNlICYmIHNoaXAubGVuZ3RoID49IG1heExlbmd0aCkge1xuICAgICAgICBtYXhMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1heExlbmd0aDtcbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIHJldHVybiByYW5kb20gcm93IGFuZCBjb2x1bW4gYmFzZWQgb24gYSBwZXR0ZXJuIHJlbGF0ZWQgdG8gdGhlIGxhcmdlc3QgdW5zdW5rIHNoaXBcbiAgZnVuY3Rpb24gZ3Vlc3NQYXR0ZXJuKGxlbmd0aCA9IGxhcmdlc3RVbnN1bmtTaGlwTGVuZ3RoKCkpIHtcbiAgICBsZXQgcm93O1xuICAgIGxldCBjb2x1bW47XG4gICAgbGV0IHN0b3BMb29wID0gZmFsc2U7XG4gICAgd2hpbGUgKHN0b3BMb29wID09PSBmYWxzZSkge1xuICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIHJvdyAmIGNvbHVtblxuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAvLyBJZiB0aGUgbG9jYXRpb24gZG9lcyBub3QgZml0IHRoZSBwYXR0ZXJuLCBrZWVwIGd1ZXNzaW5nXG4gICAgICBpZiAobGVuZ3RoKSB7XG4gICAgICAgIGlmICgocm93ICsgY29sdW1uKSAlIGxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgbG9jYXRpb24gZml0cyB0aGUgcGF0dGVybiwgbWFrZSBzdXJlIGl0IGhhcyBub3QgYmVlbiBzaG90IHlldFxuICAgICAgaWYgKGdyaWRbYHNxdWFyZS0ke3Jvd30tJHtjb2x1bW59YF0uaXNTaG90KCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHN0b3BMb29wID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byByZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgc2hvdCBzaGlwIHNlZ21lbnRzIHRoYXQgYmVsb25nIHRvIGEgc2hpcCB0aGF0IGlzIHVuc3VuayB5ZXRcbiAgZnVuY3Rpb24gYXJlVGhlcmVVbnN1bmtTaG90U2hpcFNlZ21lbnRzKCkge1xuICAgIGNvbnN0IHNob3RTaGlwU2VnbWVudHMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gZ3JpZCkge1xuICAgICAgaWYgKGdyaWRba2V5XS5pc1Nob3QoKSAmJiBncmlkW2tleV0uY29udGFpbnNTaGlwU2VnbWVudCgpKSB7XG4gICAgICAgIHNob3RTaGlwU2VnbWVudHMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBrZXkgb2Ygc2hvdFNoaXBTZWdtZW50cykge1xuICAgICAgZm9yIChsZXQgc2hpcCBvZiBzaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZ3JpZFtrZXldLmdldFNoaXBTZWdtZW50VHlwZSgpID09PSBzaGlwLnR5cGUgJiZcbiAgICAgICAgICBzaGlwLmlzU3VuaygpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjaGVjayBpZiBhbiBhcnJheSBleGlzdHMgaW4gYW4gYXJyYXkgb2YgYXJyYXlzIC8vIC0xIGlmIG5vIC8vIGluZGV4IG9mIHN1YmFycmF5IG90aGVyd2lzZVxuICBmdW5jdGlvbiBpbmNsdWRlc0FycmF5KGFycmF5LCBhcnJheU9mQXJyYXlzKSB7XG4gICAgbGV0IGN1cnJlbnQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU9mQXJyYXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSBhcnJheU9mQXJyYXlzW2ldLmxlbmd0aCkge1xuICAgICAgICBjdXJyZW50ID0gYXJyYXlPZkFycmF5c1tpXTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aCAmJiBhcnJheVtqXSA9PT0gY3VycmVudFtqXTsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKGogPT09IGFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBsZXQgdGFyZ2V0cyA9IFtdO1xuICBsZXQgdGFyZ2V0c09mSGlnaGVyUHJvYmFiaWx0eSA9IFtdO1xuXG4gIGZ1bmN0aW9uIGh1bnRUYXJnZXQoKSB7XG4gICAgLy8gUmVzZXQgdGhlIHBvdGVudGlhbCB0YXJnZXRzIGlmIGFsbCBzaG90IHNoaXBzIHNlZ21lbnRzIGFyZSBzdW5rXG4gICAgaWYgKGFyZVRoZXJlVW5zdW5rU2hvdFNoaXBTZWdtZW50cygpID09PSBmYWxzZSkge1xuICAgICAgdGFyZ2V0cyA9IFtdO1xuICAgICAgdGFyZ2V0c09mSGlnaGVyUHJvYmFiaWx0eSA9IFtdO1xuICAgIH1cbiAgICBsZXQgcm93LCBjb2x1bW47XG4gICAgLy8gSWYgdGFyZ2V0cyBpcyBlbXB0eSwgZW50ZXIgaHVudCBtb2RlXG4gICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBbcm93LCBjb2x1bW5dID0gZ3Vlc3NQYXR0ZXJuKCk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXRzT2ZIaWdoZXJQcm9iYWJpbHR5Lmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIElmIHRhcmdldHMgaXMgbm90IGVtcHR5LCBlbnRlciB0YXJnZXQgbW9kZSwgcHJpb3JpdGl6ZSB0YXJnZXRzIG9mIGhpZ2hlciBwcm9iYWJpbGl0eVxuICAgICAgW3JvdywgY29sdW1uXSA9IHRhcmdldHNPZkhpZ2hlclByb2JhYmlsdHkucG9wKCk7XG4gICAgICAvLyBSZW1vdmUgdGhlIHNlbGVjdGVkIGhpZ2ggcHJvYmFiaWxpdHkgdGFyZ2V0IGZyb20gdGhlIHJlZ3VsYXIgdGFyZ2V0cyBhcnJheVxuICAgICAgbGV0IGluZGV4ID0gaW5jbHVkZXNBcnJheShbcm93LCBjb2x1bW5dLCB0YXJnZXRzKTtcbiAgICAgIHRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdGFyZ2V0cyBpcyBub3QgZW1wdHksIGVudGVyIHRhcmdldCBtb2RlIChpZSBwb3AgYSB0YXJnZXQgZnJvbSB0YXJnZXRzKVxuICAgICAgW3JvdywgY29sdW1uXSA9IHRhcmdldHMucG9wKCk7XG4gICAgfVxuICAgIC8vIENoZWNrIHNoaXAgbWFwXG4gICAgaWYgKGdyaWRbYHNxdWFyZS0ke3Jvd30tJHtjb2x1bW59YF0uY29udGFpbnNTaGlwU2VnbWVudCgpID09PSB0cnVlKSB7XG4gICAgICAvLyBBZGQgYWxsIGFkamFjZW50IHNxdWFyZXMgdG8gbGlzdCBvZiBwb3RlbnRpYWwgdGFyZ2V0cyB3aGVyZSBwb3NzaWJsZVxuICAgICAgbGV0IHBvdGVudGlhbFRhcmdldHMgPSBbXG4gICAgICAgIFtyb3cgKyAxLCBjb2x1bW5dLFxuICAgICAgICBbcm93LCBjb2x1bW4gKyAxXSxcbiAgICAgICAgW3JvdyAtIDEsIGNvbHVtbl0sXG4gICAgICAgIFtyb3csIGNvbHVtbiAtIDFdLFxuICAgICAgXTtcbiAgICAgIGZvciAobGV0IFt0YXJnZXRSb3csIHRhcmdldENvbHVtbl0gb2YgcG90ZW50aWFsVGFyZ2V0cykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgLy8gbXVzdCBiZSB3aGl0aGluIGdyaWRcbiAgICAgICAgICAxIDw9IHRhcmdldFJvdyAmJlxuICAgICAgICAgIHRhcmdldFJvdyA8PSAxMCAmJlxuICAgICAgICAgIDEgPD0gdGFyZ2V0Q29sdW1uICYmXG4gICAgICAgICAgdGFyZ2V0Q29sdW1uIDw9IDEwICYmXG4gICAgICAgICAgLy8gbXVzdCBub3QgYWxyZWFkeSBiZSBpbiB0YXJnZXRzIGFycmF5XG4gICAgICAgICAgaW5jbHVkZXNBcnJheShbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW5dLCB0YXJnZXRzKSA8IDAgJiZcbiAgICAgICAgICAvLyBtdXN0IG5vdCBhbHJlYWR5IGJlIHNob3RcbiAgICAgICAgICBncmlkW2BzcXVhcmUtJHt0YXJnZXRSb3d9LSR7dGFyZ2V0Q29sdW1ufWBdLmlzU2hvdCgpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICB0YXJnZXRzLnB1c2goW3RhcmdldFJvdywgdGFyZ2V0Q29sdW1uXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEFmdGVyIHRoZSB0YXJnZXRzIGxvZ2ljIGxvb3AgaXMgZG9uZSwgYmVnaW4gdC5vLmgucCBsb2dpYyBsb29wXG4gICAgICAvLyBEZXRlcm1pbmUgcG90ZW50aWFsIHRhcmdldHMgb2YgaGlnaGVyIHByb2JhYmlsaXR5XG4gICAgICBmb3IgKGxldCBbdGFyZ2V0Um93LCB0YXJnZXRDb2x1bW5dIG9mIHBvdGVudGlhbFRhcmdldHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIC8vIG11c3QgYmUgd2l0aGluIGdyaWRcbiAgICAgICAgICAxIDw9IHRhcmdldFJvdyAmJlxuICAgICAgICAgIHRhcmdldFJvdyA8PSAxMCAmJlxuICAgICAgICAgIDEgPD0gdGFyZ2V0Q29sdW1uICYmXG4gICAgICAgICAgdGFyZ2V0Q29sdW1uIDw9IDEwICYmXG4gICAgICAgICAgLy8gbXVzdCBiZSBhbHJlYWR5IHNob3RcbiAgICAgICAgICBncmlkW2BzcXVhcmUtJHt0YXJnZXRSb3d9LSR7dGFyZ2V0Q29sdW1ufWBdLmlzU2hvdCgpID09PSB0cnVlICYmXG4gICAgICAgICAgLy8gbXVzdCBjb250YWluIGEgc2hpcCBzZWdtZW50XG4gICAgICAgICAgZ3JpZFtgc3F1YXJlLSR7dGFyZ2V0Um93fS0ke3RhcmdldENvbHVtbn1gXS5jb250YWluc1NoaXBTZWdtZW50KCkgPT09XG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGxldCBwcmlvcml0eVJvdyA9IHRhcmdldFJvdztcbiAgICAgICAgICBsZXQgcHJpb3JpdHlDb2x1bW4gPSB0YXJnZXRDb2x1bW47XG4gICAgICAgICAgZm9yIChsZXQgW3IsIGNdIG9mIHRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgLy8gY3VycmVudCBsb2NhdGlvbiBhbmQgc2hvdCBzaGlwIGxvY2F0aW9uIG11c3QgYmUgYWRqYWNlbnRcbiAgICAgICAgICAgICAgKChyb3cgPT09IHByaW9yaXR5Um93ICYmIHIgPT09IHJvdykgfHxcbiAgICAgICAgICAgICAgICAoY29sdW1uID09PSBwcmlvcml0eUNvbHVtbiAmJiBjID09PSBjb2x1bW4pKSAmJlxuICAgICAgICAgICAgICAvLyBtdXN0IG5vdCBhbHJlYWR5IGJlIGluIHQuby5oLnBcbiAgICAgICAgICAgICAgaW5jbHVkZXNBcnJheShbciwgY10sIHRhcmdldHNPZkhpZ2hlclByb2JhYmlsdHkpIDwgMCAmJlxuICAgICAgICAgICAgICAvLyBtdXN0IGFscmVhZHkgYmUgaW4gdGFyZ2V0c1xuICAgICAgICAgICAgICBpbmNsdWRlc0FycmF5KFtyLCBjXSwgdGFyZ2V0cykgPj0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRhcmdldHNPZkhpZ2hlclByb2JhYmlsdHkucHVzaChbciwgY10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBncmlkLFxuICAgIHNoaXBzLFxuICAgIGlzV2l0aGluR3JpZCxcbiAgICBkb2VzTm90T3ZlcmxhcCxcbiAgICBwbGFjZVNoaXAsXG4gICAgc2hpcHNMb2NhdGlvbixcbiAgICBhbGxTaGlwc1BsYWNlZCxcbiAgICBhbGxTaGlwc1N1bmssXG4gICAgaHVudFRhcmdldCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdyaWRTcXVhcmUsIEdhbWVib2FyZCB9O1xuIiwiY29uc3QgR3JpZFNxdWFyZSA9ICgpID0+IHtcbiAgbGV0IHJvdztcbiAgbGV0IGNvbHVtbjtcbiAgbGV0IHNoaXBTZWdtZW50ID0gZmFsc2U7XG4gIGxldCBzaGlwU2VnbWVudFR5cGUgPSBudWxsO1xuICBsZXQgc2hvdFN0YXR1cyA9IGZhbHNlO1xuXG4gIC8vIEdyaWRTcXVhcmUgZmFjdG9yeSBtZXRob2QgdG8gY2hlY2sgaWYgdGhlIHNxdWFyZSBjb250YWlucyBhIHNoaXAgc2VnbWVudFxuICBjb25zdCBjb250YWluc1NoaXBTZWdtZW50ID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwU2VnbWVudDtcbiAgfTtcblxuICAvLyBHcmlkU3F1YXJlIGZhY3RvcnkgbWV0aG9kIHRvIHBsYWNlIGEgc2hpcCBzZWdtZW50IGluIHRoZSBzcXVhcmVcbiAgY29uc3QgcGxhY2VTaGlwU2VnbWVudCA9ICgpID0+IHtcbiAgICBzaGlwU2VnbWVudCA9IHRydWU7XG4gIH07XG5cbiAgLy8gR3JpZFNxdWFyZSBmYWN0b3J5IG1ldGhvZCB0byByZXR1cm4gdGhlIHNxdWFyZSdzIHNoaXAgc2VnbWVudCB0eXBlIChudWxsIGZvciBubyBzaGlwIHNlZ21lbnQpXG4gIGNvbnN0IGdldFNoaXBTZWdtZW50VHlwZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcFNlZ21lbnRUeXBlO1xuICB9O1xuXG4gIC8vIEdyaWRTcXVhcmUgZmFjdG9yeSBtZXRob2QgdG8gYXNzaWduIHRvIHRoZSBzcXVhcmUgYSBzaGlwIHNlZ21lbnQgdHlwZVxuICBjb25zdCBjaGFuZ2VTaGlwU2VnbWVudFR5cGUgPSAoc2hpcFR5cGUpID0+IHtcbiAgICBzaGlwU2VnbWVudFR5cGUgPSBzaGlwVHlwZTtcbiAgfTtcblxuICAvLyBHcmlkU3F1YXJlIGZhY3RvcnkgbWV0aG9kIHRvIGNoZWNrIGlmIHRoZSBzcXVhcmUgaGFzIGJlZW4gc2hvdFxuICBjb25zdCBpc1Nob3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNob3RTdGF0dXM7XG4gIH07XG5cbiAgLy8gR3JpZFNxdWFyZSBmYWN0b3J5IG1ldGhvZCB0byBjaGFuZ2UgdGhlIHNxdWFyZSBzaG90IHN0YXR1cyB0byB0cnVlXG4gIGNvbnN0IHBsYWNlU2hvdCA9ICgpID0+IHtcbiAgICBzaG90U3RhdHVzID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJvdyxcbiAgICBjb2x1bW4sXG4gICAgY29udGFpbnNTaGlwU2VnbWVudCxcbiAgICBwbGFjZVNoaXBTZWdtZW50LFxuICAgIGdldFNoaXBTZWdtZW50VHlwZSxcbiAgICBjaGFuZ2VTaGlwU2VnbWVudFR5cGUsXG4gICAgaXNTaG90LFxuICAgIHBsYWNlU2hvdCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdyaWRTcXVhcmUgfTtcbiIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgLy8gVHlwZTogaHVtYW4gLyBhaVxuICAvLyBUeXBlIHRvIGJlIHVzZWQgZm9yIHNoaXAgcGxhY2VtZW50OiBtYW51YWwgLyByYW5kb21cbiAgLy8gVHlwZSB0byBiZSB1c2VkIGZvciBzaG90IHRha2luZzogbWFudWFsIC8gYWxnb3JpdGhtXG4gIGxldCB0eXBlID0gXCJodW1hblwiO1xuXG4gIC8vIE5hbWUgdG8gYmUgdXNlZCBpbiBET00gdGV4dFxuICBsZXQgbmFtZTtcblxuICAvLyBQbGF5ZXIgZmFjdG9yeSBtZXRob2QgdG8gZ2V0IHRoZSBwbGF5ZXIgdHlwZVxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4ge1xuICAgIHJldHVybiB0eXBlO1xuICB9O1xuXG4gIC8vIFBsYXllciBmYWN0b3J5IG1ldGhvZCB0byBjaGFuZ2UgdGhlIHBsYXllciB0eXBlIGJldHdlZW4gaHVtYW4vYWlcbiAgY29uc3QgY2hhbmdlVHlwZSA9ICgpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJodW1hblwiKSB7XG4gICAgICB0eXBlID0gXCJhaVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gXCJodW1hblwiO1xuICAgIH1cbiAgfTtcblxuICAvLyBQbGF5ZXIgZmFjdG9yeSBtZXRob2QgdG8gZ2V0IHRoZSBwbGF5ZXIgbmFtZVxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIC8vIFBsYXllciBmYWN0b3J5IG1ldGhvZCB0byBjaGFuZ2UgdGhlIHBsYXllciBuYW1lXG4gIGNvbnN0IGNoYW5nZU5hbWUgPSAobmV3TmFtZSkgPT4ge1xuICAgIG5hbWUgPSBuZXdOYW1lO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0VHlwZSxcbiAgICBjaGFuZ2VUeXBlLFxuICAgIGdldE5hbWUsXG4gICAgY2hhbmdlTmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiLy8gQXJyYXkgd2l0aCBvYmplY3RzIHJlcHJlc2VudGluZyBhIHNoaXAgbmFtZS90eXBlIGFuZCBjb3JyZXNwb25kaW5nIGxlbmd0aFxuY29uc3Qgc2hpcFR5cGVzID0gW1xuICB7IHR5cGU6IFwiY2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgeyB0eXBlOiBcImJhdHRsZXNoaXBcIiwgbGVuZ3RoOiA0IH0sXG4gIHsgdHlwZTogXCJjcnVpc2VyXCIsIGxlbmd0aDogMyB9LFxuICB7IHR5cGU6IFwic3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICB7IHR5cGU6IFwiZGVzdHJveWVyXCIsIGxlbmd0aDogMiB9LFxuXTtcblxuLy8gU2hpcCBmYWN0b3J5XG5jb25zdCBTaGlwID0gKGluZGV4KSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBzaGlwVHlwZXNbaW5kZXhdLnR5cGU7XG4gIGNvbnN0IGxlbmd0aCA9IHNoaXBUeXBlc1tpbmRleF0ubGVuZ3RoO1xuXG4gIGxldCBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gIGxldCBoaXRzID0gMDtcblxuICAvLyBTaGlwIGZhY3RvcnkgbWV0aG9kIHRvIGdldCB0aGUgc2hpcCBvcmllbnRhdGlvblxuICBjb25zdCBnZXRPcmllbnRhdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gb3JpZW50YXRpb247XG4gIH07XG5cbiAgLy8gU2hpcCBmYWN0b3J5IG1ldGhvZCB0byBjaGFuZ2UgdGhlIG9yaWVudGF0aW9uIG9mIGEgc2hpcCBpbnN0YW5jZSBiZXR3ZWVuIGhvcml6b250YWwvdmVydGljYWxcbiAgY29uc3QgY2hhbmdlT3JpZW50YXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgb3JpZW50YXRpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgfVxuICB9O1xuXG4gIC8vIFNoaXAgZmFjdG9yeSBtZXRob2QgdG8gZ2V0IHRoZSBzaGlwIHBsYWNlbWVudCBzdGF0dXNcbiAgY29uc3QgaXNQbGFjZWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHBsYWNlZDtcbiAgfTtcblxuICAvLyBTaGlwIGZhY3RvcnkgbWV0aG9kIHRvIGNoYW5nZSB0aGUgc2hpcCBwbGFjZW1lbnQgc3RhdHVzIHRvIHRydWVcbiAgY29uc3QgcGxhY2UgPSAoKSA9PiB7XG4gICAgcGxhY2VkID0gdHJ1ZTtcbiAgfTtcblxuICAvLyBTaGlwIGZhY3RvcnkgbWV0aG9kIHRvIGFkZCBhIGhpdCB0byBhIHNoaXAgaW5zdGFuY2UgaWYgbm90IHN1bmtcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoaXRzICs9IDE7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gU2hpcCBmYWN0b3J5IG1ldGhvZCB0byBjaGVjayBpZiBhIHNoaXAgaW5zdGFuY2UgaXMgc3Vua1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGhpdHMgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgbGVuZ3RoLFxuICAgIGdldE9yaWVudGF0aW9uLFxuICAgIGNoYW5nZU9yaWVudGF0aW9uLFxuICAgIGlzUGxhY2VkLFxuICAgIHBsYWNlLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwLCBzaGlwVHlwZXMgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy9XYXJwVGhydXN0ZXJFbmdyYXZlZFJlZ3VsYXIub3RmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogV2FycFRocnVzdGVyO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWNvbG9yLWdyaWQtYmxhY2s6IGJsYWNrO1xcbiAgLS1jb2xvci1ncmlkLWdyZWVuOiAjNjFkNmMzO1xcbiAgLS1jb2xvci1ncmlkLWdyZXk6IGdyZXk7XFxuICAtLWNvbG9yLWdyaWQtb3JhbmdlOiBvcmFuZ2U7XFxuICAtLWNvbG9yLWdyaWQtcmVkOiAjY2Q2ZTYzO1xcbiAgLS1jb2xvci1ncmlkLXJlZC1icmlnaHQ6IHJlZDtcXG4gIC0tY29sb3ItZ3JpZC13aGl0ZTogd2hpdGU7XFxuICAtLWZvbnQtZ2VuZXJhbDogV2FycFRocnVzdGVyO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZ2VuZXJhbCk7XFxuXFxuICBoZWlnaHQ6IDEwMHZoO1xcblxcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gZml0LWNvbnRlbnQgMWZyIDJyZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWdlbmVyYWwpO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcblxcbn1cXG5cXG5idXR0b24uZm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLXJlZC1icmlnaHQpO1xcbiAgYm9yZGVyLXN0eWxlOiBkYXNoZWQ7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogc29saWQ7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwLjI1cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBmb250LXNpemU6IDJyZW07XFxuXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIGJvcmRlci1zdHlsZTogZGFzaGVkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjNyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgbWFyZ2luOiAycmVtIDJyZW0gMCAycmVtO1xcblxcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDFyZW07XFxufVxcblxcbi5pbnN0cnVjdGlvbnMgLmJ1dHRvbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLmluc3RydWN0aW9ucy5nYW1lLW92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLXJlZC1icmlnaHQpO1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIC5nYW1lLW92ZXIge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtcmVkLWJyaWdodCk7XFxufVxcblxcbi5tYWluIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG5cXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMnJlbTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXItc3R5bGU6IGRhc2hlZDtcXG4gIGJvcmRlci13aWR0aDogMC4zcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIHBhZGRpbmc6IDAgMnJlbTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDJyZW0gMWZyIDJyZW07XFxufVxcblxcbi5jb250YWluZXIgLnBsYXllci10ZXh0IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ncmlkIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuXFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjI1cmVtO1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZCAuZ3JpZC1yb3cge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjA1cmVtO1xcblxcbiAgd2lkdGg6IG1pbihtYXgoM3ZoLCA2dncpLCAzcmVtKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZSBpbWcge1xcbiAgd2lkdGg6IG1pbihtYXgoMnZoLCA1dncpLCAycmVtKTtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZS5zaGlwLWhvdmVyLW5vdC1wbGFjZWFibGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JpZC1yZWQpO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtaG92ZXItcGxhY2VhYmxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtZ3JlZW4pO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtaG92ZXItc2hvb3Rpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JpZC1vcmFuZ2UpO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtZ3JleSk7XFxufVxcblxcbi5mb290ZXIge1xcbiAgYm9yZGVyLXRvcC1zdHlsZTogc29saWQ7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwLjI1cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBmb250LXNpemU6IDEuMXJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDAuNXJlbTtcXG59XFxuXFxuLmZvb3RlciBhIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLWJsYWNrKTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbi5mb290ZXIgaW1nIHtcXG4gIGhlaWdodDogMS4xcmVtO1xcblxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQW9EO0FBQ3REOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLDJCQUEyQjtFQUMzQix1QkFBdUI7RUFDdkIsMkJBQTJCO0VBQzNCLHlCQUF5QjtFQUN6Qiw0QkFBNEI7RUFDNUIseUJBQXlCO0VBQ3pCLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQ0FBZ0M7O0VBRWhDLGFBQWE7O0VBRWIsU0FBUztFQUNULFVBQVU7O0VBRVYsYUFBYTtFQUNiLDZDQUE2QztFQUM3Qyx1QkFBdUI7RUFDdkIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLGtCQUFrQjs7QUFFcEI7O0FBRUE7RUFDRSwwQ0FBMEM7RUFDMUMsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCLDRCQUE0QjtFQUM1QixXQUFXOztFQUVYLGVBQWU7O0VBRWYsYUFBYTtFQUNiLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQix3QkFBd0I7O0VBRXhCLGtCQUFrQjtFQUNsQixrQkFBa0I7O0VBRWxCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxjQUFjOztFQUVkLGFBQWE7RUFDYixlQUFlOztFQUVmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsZUFBZTs7RUFFZixhQUFhO0VBQ2IsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7O0VBRW5CLG1CQUFtQjtFQUNuQixxQkFBcUI7O0VBRXJCLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1COztFQUVuQixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usa0JBQWtCOztFQUVsQixtQkFBbUI7RUFDbkIscUJBQXFCOztFQUVyQiwrQkFBK0I7RUFDL0IsaUJBQWlCOztFQUVqQixhQUFhO0VBQ2IscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtFQUN6QixXQUFXOztFQUVYLGlCQUFpQjs7RUFFakIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsOEJBQThCOztFQUU5QixhQUFhO0VBQ2IscUJBQXFCOztFQUVyQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxjQUFjOztBQUVoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBXYXJwVGhydXN0ZXI7XFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvV2FycFRocnVzdGVyRW5ncmF2ZWRSZWd1bGFyLm90ZlxcXCIpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWNvbG9yLWdyaWQtYmxhY2s6IGJsYWNrO1xcbiAgLS1jb2xvci1ncmlkLWdyZWVuOiAjNjFkNmMzO1xcbiAgLS1jb2xvci1ncmlkLWdyZXk6IGdyZXk7XFxuICAtLWNvbG9yLWdyaWQtb3JhbmdlOiBvcmFuZ2U7XFxuICAtLWNvbG9yLWdyaWQtcmVkOiAjY2Q2ZTYzO1xcbiAgLS1jb2xvci1ncmlkLXJlZC1icmlnaHQ6IHJlZDtcXG4gIC0tY29sb3ItZ3JpZC13aGl0ZTogd2hpdGU7XFxuICAtLWZvbnQtZ2VuZXJhbDogV2FycFRocnVzdGVyO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZ2VuZXJhbCk7XFxuXFxuICBoZWlnaHQ6IDEwMHZoO1xcblxcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gZml0LWNvbnRlbnQgMWZyIDJyZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWdlbmVyYWwpO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcblxcbn1cXG5cXG5idXR0b24uZm9jdXMge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLXJlZC1icmlnaHQpO1xcbiAgYm9yZGVyLXN0eWxlOiBkYXNoZWQ7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogc29saWQ7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwLjI1cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBmb250LXNpemU6IDJyZW07XFxuXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIGJvcmRlci1zdHlsZTogZGFzaGVkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjNyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgbWFyZ2luOiAycmVtIDJyZW0gMCAycmVtO1xcblxcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDFyZW07XFxufVxcblxcbi5pbnN0cnVjdGlvbnMgLmJ1dHRvbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLmluc3RydWN0aW9ucy5nYW1lLW92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLXJlZC1icmlnaHQpO1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIC5nYW1lLW92ZXIge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtcmVkLWJyaWdodCk7XFxufVxcblxcbi5tYWluIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG5cXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMnJlbTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXItc3R5bGU6IGRhc2hlZDtcXG4gIGJvcmRlci13aWR0aDogMC4zcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIHBhZGRpbmc6IDAgMnJlbTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDJyZW0gMWZyIDJyZW07XFxufVxcblxcbi5jb250YWluZXIgLnBsYXllci10ZXh0IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ncmlkIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuXFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjI1cmVtO1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZCAuZ3JpZC1yb3cge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjA1cmVtO1xcblxcbiAgd2lkdGg6IG1pbihtYXgoM3ZoLCA2dncpLCAzcmVtKTtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZSBpbWcge1xcbiAgd2lkdGg6IG1pbihtYXgoMnZoLCA1dncpLCAycmVtKTtcXG59XFxuXFxuLmdyaWQgLnNxdWFyZS5zaGlwLWhvdmVyLW5vdC1wbGFjZWFibGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JpZC1yZWQpO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtaG92ZXItcGxhY2VhYmxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtZ3JlZW4pO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtaG92ZXItc2hvb3Rpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JpZC1vcmFuZ2UpO1xcbn1cXG5cXG4uZ3JpZCAuc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyaWQtZ3JleSk7XFxufVxcblxcbi5mb290ZXIge1xcbiAgYm9yZGVyLXRvcC1zdHlsZTogc29saWQ7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwLjI1cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBmb250LXNpemU6IDEuMXJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDAuNXJlbTtcXG59XFxuXFxuLmZvb3RlciBhIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1ncmlkLWJsYWNrKTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbi5mb290ZXIgaW1nIHtcXG4gIGhlaWdodDogMS4xcmVtO1xcblxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9jc3Mvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IGdpdGh1YkltYWdlIGZyb20gXCIuL2ltYWdlcy9naXRodWJfbG9nby5wbmdcIjtcbmltcG9ydCBib21iSW1hZ2UgZnJvbSBcIi4vaW1hZ2VzL2JvbWIucG5nXCI7XG5pbXBvcnQgc3BsYXNoSW1hZ2UgZnJvbSBcIi4vaW1hZ2VzL3NwbGFzaC5wbmdcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbi8vIENyZWF0ZSBoZWFkZXIgZWxlbWVudFxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbmhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuaGVhZGVyLnRleHRDb250ZW50ID0gXCJCQVRUTEVTSElQXCI7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbi8vIENyZWF0ZSBnYW1lIGluc3RydWN0aW9ucyBkaXYgZWxlbWVudFxuY29uc3QgaW5zdHJ1Y3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmluc3RydWN0aW9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zXCIpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnNEaXYpO1xuXG4vLyBDcmVhdGUgaW5zdHJ1Y3Rpb25zIGJ1dHRvbiBjb250YWluZXIgMSBmb3IgZ2FtZSBidXR0b25zXG5jb25zdCBidXR0b25Db250YWluZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmJ1dHRvbkNvbnRhaW5lcjEuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1jb250YWluZXJcIik7XG5pbnN0cnVjdGlvbnNEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyMSk7XG5cbi8vIENyZWF0ZSBuZXcgZ2FtZSBidXR0b25cbmNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xubmV3R2FtZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwibmV3LWdhbWUtYnV0dG9uXCIpO1xubmV3R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTkVXIEdBTUVcIjtcbmJ1dHRvbkNvbnRhaW5lcjEuYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XG5uZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmIChjb25maXJtKFwiUmVzZXQgQW5kIFN0YXJ0IEEgTmV3IEdhbWU/XCIpKSB7XG4gICAgZ2FtZSgpO1xuICB9XG59KTtcblxuLy8gQ3JlYXRlIHZlcnN1cyBidXR0b25cbmNvbnN0IHZlcnN1c0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG52ZXJzdXNCdXR0b24uY2xhc3NMaXN0LmFkZChcInZlcnN1cy1idXR0b25cIik7XG5idXR0b25Db250YWluZXIxLmFwcGVuZENoaWxkKHZlcnN1c0J1dHRvbik7XG5cbi8vIENyZWF0ZSBzdGFydCBnYW1lIGJ1dHRvblxuY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnN0YXJ0R2FtZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic3RhcnQtZ2FtZS1idXR0b25cIik7XG5zdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG5idXR0b25Db250YWluZXIxLmFwcGVuZENoaWxkKHN0YXJ0R2FtZUJ1dHRvbik7XG5cbi8vIENyZWF0ZSBnYW1lIGluc3RydWN0aW9ucyB0ZXh0IGRpdlxuY29uc3QgaW5zdHJ1Y3Rpb25zVGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5pbnN0cnVjdGlvbnNUZXh0RGl2LmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnMtdGV4dFwiKTtcbmluc3RydWN0aW9uc0Rpdi5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnNUZXh0RGl2KTtcblxuLy8gQ3JlYXRlIGluc3RydWN0aW9ucyBidXR0b24gY29udGFpbmVyIDIgZm9yIHNoaXAgcGxhY2VtZW50IGJ1dHRvbnNcbmNvbnN0IGJ1dHRvbkNvbnRhaW5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuYnV0dG9uQ29udGFpbmVyMi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWNvbnRhaW5lclwiKTtcbmluc3RydWN0aW9uc0Rpdi5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIyKTtcblxuLy8gQ3JlYXRlIHJvdGF0ZSBzaGlwIHBsYWNlbWVudCBidXR0b25cbmNvbnN0IHJvdGF0ZVNoaXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xucm90YXRlU2hpcEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicm90YXRlLXNoaXAtYnV0dG9uXCIpO1xucm90YXRlU2hpcEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUk9UQVRFIFNISVBcIjtcbmJ1dHRvbkNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQocm90YXRlU2hpcEJ1dHRvbik7XG5cbi8vIENyZWF0ZSBuZXh0IHBsYXllciBidXR0b25cbmNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xubmV4dFBsYXllckJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwibmV4dC1wbGF5ZXItYnV0dG9uXCIpO1xubmV4dFBsYXllckJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTkVYVCBQTEFZRVJcIjtcbmJ1dHRvbkNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQobmV4dFBsYXllckJ1dHRvbik7XG5cbi8vIENyZWF0ZSBtYWluIGRpdiBlbGVtZW50XG5jb25zdCBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbm1haW5EaXYuY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1haW5EaXYpO1xuXG4vLyBDcmVhdGUgY29udGFpbmVyIDEgZGl2IGVsZW1lbnRcbmNvbnN0IGdyaWRDb250YWluZXJEaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDb250YWluZXJEaXYxLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIik7XG5ncmlkQ29udGFpbmVyRGl2MS5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyLTFcIik7XG5tYWluRGl2LmFwcGVuZENoaWxkKGdyaWRDb250YWluZXJEaXYxKTtcblxuLy8gQ3JlYXRlIHBsYXllciAxIHRpdGxlIGRpdiBlbGVtZW50XG5jb25zdCBwbGF5ZXJUaXRsZURpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xucGxheWVyVGl0bGVEaXYxLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdGV4dFwiKTtcbnBsYXllclRpdGxlRGl2MS50ZXh0Q29udGVudCA9IFwiUExBWUVSIDFcIjtcbmdyaWRDb250YWluZXJEaXYxLmFwcGVuZENoaWxkKHBsYXllclRpdGxlRGl2MSk7XG5cbi8vIENyZWF0ZSBncmlkIDEgZGl2IGVsZW1lbnRcbmNvbnN0IGdyaWREaXYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWREaXYxLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpO1xuZ3JpZERpdjEuY2xhc3NMaXN0LmFkZChcImdyaWQtMVwiKTtcbmdyaWRDb250YWluZXJEaXYxLmFwcGVuZENoaWxkKGdyaWREaXYxKTtcblxuLy8gQ3JlYXRlIHBsYXllciAxIHRpdGxlIGRpdiBlbGVtZW50XG5jb25zdCBwbGF5ZXJUZXh0RGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5wbGF5ZXJUZXh0RGl2MS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXRleHRcIik7XG5wbGF5ZXJUZXh0RGl2MS50ZXh0Q29udGVudCA9IFwiSFVNQU5cIjtcbmdyaWRDb250YWluZXJEaXYxLmFwcGVuZENoaWxkKHBsYXllclRleHREaXYxKTtcblxuLy8gQ3JlYXRlIGNvbnRhaW5lciAyIGRpdiBlbGVtZW50XG5jb25zdCBncmlkQ29udGFpbmVyRGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5ncmlkQ29udGFpbmVyRGl2Mi5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuZ3JpZENvbnRhaW5lckRpdjIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci0yXCIpO1xubWFpbkRpdi5hcHBlbmRDaGlsZChncmlkQ29udGFpbmVyRGl2Mik7XG5cbi8vIENyZWF0ZSBwbGF5ZXIgMiB0aXRsZSBkaXYgZWxlbWVudFxuY29uc3QgcGxheWVyVGl0bGVEaXYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnBsYXllclRpdGxlRGl2Mi5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXRleHRcIik7XG5wbGF5ZXJUaXRsZURpdjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiAyXCI7XG5ncmlkQ29udGFpbmVyRGl2Mi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZURpdjIpO1xuXG4vLyBDcmVhdGUgZ3JpZCAyIGRpdiBlbGVtZW50XG5jb25zdCBncmlkRGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5ncmlkRGl2Mi5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcbmdyaWREaXYyLmNsYXNzTGlzdC5hZGQoXCJncmlkLTJcIik7XG5ncmlkQ29udGFpbmVyRGl2Mi5hcHBlbmRDaGlsZChncmlkRGl2Mik7XG5cbi8vIENyZWF0ZSBwbGF5ZXIgMiB0aXRsZSBkaXYgZWxlbWVudFxuY29uc3QgcGxheWVyVGV4dERpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xucGxheWVyVGV4dERpdjIuY2xhc3NMaXN0LmFkZChcInBsYXllci10ZXh0XCIpO1xucGxheWVyVGV4dERpdjIudGV4dENvbnRlbnQgPSBcIkNPTVBVVEVSXCI7XG5ncmlkQ29udGFpbmVyRGl2Mi5hcHBlbmRDaGlsZChwbGF5ZXJUZXh0RGl2Mik7XG5cbi8vIENyZWF0ZSBmb290ZXIgZWxlbWVudFxuY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbmZvb3Rlci5jbGFzc0xpc3QuYWRkKFwiZm9vdGVyXCIpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4vLyBGb290ZXIgdGV4dCBlbGVtZW50XG5jb25zdCBmb290ZXJUZXh0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmZvb3RlclRleHREaXYudGV4dENvbnRlbnQgPSBcIlRoZSBPZGluIFByb2plY3QgLSBqb2VtYXR0YXJcIjtcbmZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJUZXh0RGl2KTtcblxuLy8gRm9vdGVyIGEgZWxlbWVudFxuY29uc3QgZm9vdGVyQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuZm9vdGVyQS5ocmVmID0gXCJodHRwczovL2dpdGh1Yi5jb20vam9lbWF0dGFyXCI7XG5mb290ZXJBLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5mb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVyQSk7XG5cbi8vIEZvb3RlciBpbWcgZWxlbWVudFxuY29uc3QgZm9vdGVySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbmZvb3RlckltZy5zcmMgPSBnaXRodWJJbWFnZTtcbmZvb3RlckEuYXBwZW5kQ2hpbGQoZm9vdGVySW1nKTtcblxuLy8gQ3JlYXRlIHBsYXllciAxIGFzIGh1bWFuXG5jb25zdCBwbGF5ZXIxID0gUGxheWVyKCk7XG4vLyBTZXQgcGxheWVyIDEgbmFtZVxucGxheWVyMS5jaGFuZ2VOYW1lKFwiUExBWUVSIDFcIik7XG4vLyBEZWNsYXJlIHBsYXllciAyIGFzIGh1bWFuXG5jb25zdCBwbGF5ZXIyID0gUGxheWVyKCk7XG4vLyBTZXQgcGxheWVyIDIgbmFtZVxucGxheWVyMi5jaGFuZ2VOYW1lKFwiUExBWUVSIDJcIik7XG4vLyBDaGFuZ2UgcGxheWVyIDIgdHlwZSB0byBhaVxucGxheWVyMi5jaGFuZ2VUeXBlKCk7XG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lciB0byB2ZXJzdXMgYnV0dG9uXG52ZXJzdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgaWYgKHBsYXllcjIuZ2V0VHlwZSgpID09PSBcImFpXCIpIHtcbiAgICB2ZXJzdXNCdXR0b24udmFsdWUgPSBcImh1bWFuXCI7XG4gICAgdmVyc3VzQnV0dG9uLnRleHRDb250ZW50ID0gXCJQLnYuUFwiO1xuICAgIHBsYXllclRleHREaXYyLnRleHRDb250ZW50ID0gXCJIVU1BTlwiO1xuICAgIHBsYXllcjIuY2hhbmdlVHlwZSgpO1xuICB9IGVsc2UgaWYgKHBsYXllcjIuZ2V0VHlwZSgpID09PSBcImh1bWFuXCIpIHtcbiAgICB2ZXJzdXNCdXR0b24udmFsdWUgPSBcImFpXCI7XG4gICAgdmVyc3VzQnV0dG9uLnRleHRDb250ZW50ID0gXCJQLnYuQUkuXCI7XG4gICAgcGxheWVyVGV4dERpdjIudGV4dENvbnRlbnQgPSBcIkNPTVBVVEVSXCI7XG4gICAgcGxheWVyMi5jaGFuZ2VUeXBlKCk7XG4gIH1cbiAgY29uc29sZS5sb2coXG4gICAgXCJwbGF5ZXIgMSBpczpcIixcbiAgICBwbGF5ZXIxLmdldFR5cGUoKSxcbiAgICBcInBsYXllciAyIGlzOlwiLFxuICAgIHBsYXllcjIuZ2V0VHlwZSgpXG4gICk7XG59KTtcblxuLy8gRnVuY3Rpb24gdG8gbWFuYWdlIHRoZSBnYW1lXG5mdW5jdGlvbiBnYW1lKCkge1xuICAvLyBDcmVhdGUgZ3JpZCAxIHNxdWFyZSBkaXZzXG4gIGNyZWF0ZUdyaWQoZ3JpZERpdjEpO1xuICAvLyBDcmVhdGUgZ3JpZCAyIHNxdWFyZSBkaXZzXG4gIGNyZWF0ZUdyaWQoZ3JpZERpdjIpO1xuXG4gIC8vIENyZWF0ZSBwbGF5ZXIgMSdzIGdhbWVib2FyZFxuICBjb25zdCBnYW1lYm9hcmQxID0gR2FtZWJvYXJkKCk7XG4gIC8vIENyZWF0ZSBwbGF5ZXIgMidzIGdhbWVib2FyZFxuICBjb25zdCBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG5cbiAgLy8gRGVjbGFyZSBnYW1lIGFuZCBwbGF5IHZhcmlhYmxlc1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllcjE7XG4gIGxldCBjdXJyZW50R2FtZUJvYXJkID0gZ2FtZWJvYXJkMTtcbiAgbGV0IG5leHRHYW1lQm9hcmQgPSBnYW1lYm9hcmQyO1xuICBsZXQgY3VycmVudEdyaWRDbGFzcyA9IFwiZ3JpZC0xXCI7XG4gIGxldCBuZXh0R3JpZENsYXNzID0gXCJncmlkLTJcIjtcbiAgbGV0IGN1cnJlbnRTaGlwSW5kZXggPSAwO1xuICBsZXQgY3VycmVudFNoaXAgPSBjdXJyZW50R2FtZUJvYXJkLnNoaXBzW2N1cnJlbnRTaGlwSW5kZXhdO1xuICBsZXQgY3VycmVudEdyaWREaXY7XG4gIGxldCByb3c7XG4gIGxldCBjb2x1bW47XG4gIGxldCBzaGlwUGxhY2VtZW50UGhhc2UgPSBmYWxzZTtcbiAgbGV0IHNoaXBQbGFjZW1lbnRJbnRlcnBoYXNlID0gZmFsc2U7XG4gIGxldCBzaG9vdGluZ1BoYXNlID0gZmFsc2U7XG4gIGxldCBzaG9vdGluZ0ludGVycGhhc2UgPSBmYWxzZTtcblxuICAvLyBJbml0aWFsaXplIHN0YXJ0aW5nIGRpc2FibGVkIHN0YXRlIG9mIGJ1dHRvbnNcbiAgcGxheWVyVGV4dERpdjIudGV4dENvbnRlbnQgPSBcIkNPTVBVVEVSXCI7XG4gIHZlcnN1c0J1dHRvbi50ZXh0Q29udGVudCA9IFwiUC52LkFJLlwiO1xuICB2ZXJzdXNCdXR0b24udmFsdWUgPSBcImFpXCI7XG4gIHZlcnN1c0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBzdGFydEdhbWVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgcm90YXRlU2hpcEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIG5leHRQbGF5ZXJCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICB2ZXJzdXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImZvY3VzXCIpO1xuICBzdGFydEdhbWVCdXR0b24uY2xhc3NMaXN0LmFkZChcImZvY3VzXCIpO1xuXG4gIGluc3RydWN0aW9uc1RleHREaXYuY2xhc3NMaXN0LnJlbW92ZShcImdhbWUtb3ZlclwiKTtcbiAgaW5zdHJ1Y3Rpb25zRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJnYW1lLW92ZXJcIik7XG5cbiAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHN0YXJ0IGdhbWUgYnV0dG9uXG4gIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHZlcnN1c0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgc3RhcnRHYW1lQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICByb3RhdGVTaGlwQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgc2hpcFBsYWNlbWVudFBoYXNlID0gdHJ1ZTtcbiAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gYCR7Y3VycmVudFBsYXllci5nZXROYW1lKCl9IFBMQUNFIFlPVVIgJHtjdXJyZW50U2hpcC50eXBlLnRvVXBwZXJDYXNlKCl9IC0gTEVOR1RIICR7XG4gICAgICBjdXJyZW50U2hpcC5sZW5ndGhcbiAgICB9YDtcbiAgICB2ZXJzdXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpO1xuICAgIHN0YXJ0R2FtZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNcIik7XG4gIH0pO1xuXG4gIC8vIFNldCBpbnN0cnVjdGlvbnMgdGV4dCBpbml0aWFsIHRleHQgY29udGVudFxuICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID1cbiAgICBcIlBMQVlFUiAxIENIT09TRSBZT1VSIE9QUE9ORU5UIFRZUEUgQUkvSFVNQU5cIjtcblxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gcm90YXRlIHNoaXAgYnV0dG9uXG4gIHJvdGF0ZVNoaXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjdXJyZW50U2hpcC5jaGFuZ2VPcmllbnRhdGlvbigpO1xuICB9KTtcblxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gbmV4dCBwbGF5ZXIgYnV0dG9uXG4gIG5leHRQbGF5ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyBJbnRlcnBoYXNlIGFmdGVyIHBsYXllciAxIHBsYWNlZCBzaGlwcyAtLT4gcGFzc2luZyB0byBwbGF5ZXIgMiBmb3Igc2hpcCBwbGFjZW1lbnRcbiAgICBpZiAoXG4gICAgICBzaGlwUGxhY2VtZW50SW50ZXJwaGFzZSA9PT0gdHJ1ZSAmJlxuICAgICAgZ2FtZWJvYXJkMi5hbGxTaGlwc1BsYWNlZCgpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgc2hpcFBsYWNlbWVudFBoYXNlID0gdHJ1ZTtcbiAgICAgIHNoaXBQbGFjZW1lbnRJbnRlcnBoYXNlID0gZmFsc2U7XG4gICAgICByb3RhdGVTaGlwQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBuZXh0UGxheWVyQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGluc3RydWN0aW9uc1RleHREaXYudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50UGxheWVyLmdldE5hbWUoKX0gUExBQ0UgWU9VUiAke2N1cnJlbnRTaGlwLnR5cGUudG9VcHBlckNhc2UoKX0gLSBMRU5HVEggJHtcbiAgICAgICAgY3VycmVudFNoaXAubGVuZ3RoXG4gICAgICB9YDtcbiAgICB9XG4gICAgLy8gSW50ZXJwaGFzZSBhZnRlciBQbGF5ZXIgMiBwbGFjZWQgc2hpcHMgLS0+IHBhc3NpbmcgYmFjayB0byBwbGF5ZXIgMSBmb3Igc2hvb3RpbmcgcGhhc2VcbiAgICBpZiAoXG4gICAgICBzaGlwUGxhY2VtZW50SW50ZXJwaGFzZSA9PT0gdHJ1ZSAmJlxuICAgICAgZ2FtZWJvYXJkMi5hbGxTaGlwc1BsYWNlZCgpID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBzaGlwUGxhY2VtZW50SW50ZXJwaGFzZSA9IGZhbHNlO1xuICAgICAgc2hvb3RpbmdQaGFzZSA9IHRydWU7XG4gICAgICByb3RhdGVTaGlwQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIG5leHRQbGF5ZXJCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdW5oaWRlU2hpcHMoXCJncmlkLTFcIiwgZ2FtZWJvYXJkMSk7XG4gICAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gYCR7Y3VycmVudFBsYXllci5nZXROYW1lKCl9IFBMQUNFIFlPVVIgU0hPVGA7XG4gICAgfVxuICAgIC8vIEludGVycGhhc2UgYWZ0ZXIgYSBwbGF5ZXIgbWFkZSBhIHNob3RcbiAgICBpZiAoc2hvb3RpbmdJbnRlcnBoYXNlID09PSB0cnVlKSB7XG4gICAgICBzaG9vdGluZ0ludGVycGhhc2UgPSBmYWxzZTtcbiAgICAgIHNob290aW5nUGhhc2UgPSB0cnVlO1xuICAgICAgbmV4dFBsYXllckJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB1bmhpZGVTaGlwcyhjdXJyZW50R3JpZENsYXNzLCBjdXJyZW50R2FtZUJvYXJkKTtcbiAgICAgIC8vIFVOSElERSBPUFBPTkVOVCBTVU5LIFNISVBTXG4gICAgICB1bmhpZGVTdW5rU2hpcHMobmV4dEdyaWRDbGFzcywgbmV4dEdhbWVCb2FyZCk7XG4gICAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gYCR7Y3VycmVudFBsYXllci5nZXROYW1lKCl9IFBMQUNFIFlPVVIgU0hPVGA7XG4gICAgfVxuICB9KTtcblxuICAvLyBGdW5jdGlvbiB0byBmaWxsIGdyaWRcbiAgZnVuY3Rpb24gY3JlYXRlR3JpZChncmlkRGl2KSB7XG4gICAgZ3JpZERpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDEwOyBpID49IDE7IGkgLT0gMSkge1xuICAgICAgLy8gQ3JlYXRlIHJvdyBkaXZcbiAgICAgIGNvbnN0IG5ld0dyaWRSb3dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbmV3R3JpZFJvd0Rpdi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1yb3dcIik7XG4gICAgICBncmlkRGl2LmFwcGVuZENoaWxkKG5ld0dyaWRSb3dEaXYpO1xuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gMTA7IGogKz0gMSkge1xuICAgICAgICAvLyBDcmVhdGUgc3F1YXJlIGRpdlxuICAgICAgICBjb25zdCBuZXdHcmlkU3F1YXJlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3R3JpZFNxdWFyZURpdi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBuZXdHcmlkU3F1YXJlRGl2LmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgbmV3R3JpZFNxdWFyZURpdi5kYXRhc2V0LmNvbHVtbiA9IGo7XG4gICAgICAgIG5ld0dyaWRSb3dEaXYuYXBwZW5kQ2hpbGQobmV3R3JpZFNxdWFyZURpdik7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBvbiBtb3VzZSBlbnRlciB0byBkaXNwbGF5IHRoZSBzaGlwIHBvc3NpYmxlIHBsYWNlbWVudFxuICAgICAgICBuZXdHcmlkU3F1YXJlRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlclNxdWFyZURpdik7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBpbiBtb3VzZSBsZWF2ZSB0byByZW1vdmUgYWxsIHJlbGF0ZWQgY2xhc3Nlc1xuICAgICAgICBuZXdHcmlkU3F1YXJlRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZVNxdWFyZURpdik7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBvbiBtb3VzZSBjbGljayBvdmVyIGEgc3F1YXJlXG4gICAgICAgIG5ld0dyaWRTcXVhcmVEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uTW91c2VDbGlja1NxdWFyZURpdik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gbWFuYWdlIGEgbW91c2UgZW50ZXJpbmcgYSBzcXVhcmUgZGl2XG4gIGZ1bmN0aW9uIG9uTW91c2VFbnRlclNxdWFyZURpdihlKSB7XG4gICAgLy8gVHJpZ2dlcnMgZHVyaW5nIFNoaXAgUGxhY2VtZW50IHBoYXNlXG4gICAgaWYgKHNoaXBQbGFjZW1lbnRQaGFzZSA9PT0gdHJ1ZSAmJiBjdXJyZW50UGxheWVyLmdldFR5cGUoKSA9PT0gXCJodW1hblwiKSB7XG4gICAgICBpZiAoaXNXaXRoaW5HcmlkQW5kRG9lc05vdE92ZXJsYXBFdmVudChlKSA9PT0gdHJ1ZSkge1xuICAgICAgICBmb3IgKGxldCBhY3RpdmVEaXYgb2YgZ2V0U2hpcFNxdWFyZURpdnNPbkV2ZW50KGUpKSB7XG4gICAgICAgICAgYWN0aXZlRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhvdmVyLXBsYWNlYWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1dpdGhpbkdyaWRBbmREb2VzTm90T3ZlcmxhcEV2ZW50KGUpID09PSBmYWxzZSkge1xuICAgICAgICBmb3IgKGxldCBhY3RpdmVEaXYgb2YgZ2V0U2hpcFNxdWFyZURpdnNPbkV2ZW50KGUpKSB7XG4gICAgICAgICAgYWN0aXZlRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhvdmVyLW5vdC1wbGFjZWFibGVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVHJpZ2dlcnMgZHVyaW5nIHNob290aW5nIHBoYXNlXG4gICAgaWYgKFxuICAgICAgc2hvb3RpbmdQaGFzZSA9PT0gdHJ1ZSAmJlxuICAgICAgY3VycmVudFBsYXllci5nZXRUeXBlKCkgPT09IFwiaHVtYW5cIiAmJlxuICAgICAgaXNXaXRoaW5PcHBvbmVudEdyaWQoZSkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhvdmVyLXNob290aW5nXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIG1hbmFnZSBhIG1vdXNlIGxlYXZpbmcgYSBzcXVhcmUgZGl2XG4gIGZ1bmN0aW9uIG9uTW91c2VMZWF2ZVNxdWFyZURpdihlKSB7XG4gICAgLy8gVHJpZ2dlcnMgZHVyaW5nIGFsbCBwaGFzZXNcbiAgICBmb3IgKGxldCBhY3RpdmVEaXYgb2YgZ2V0U2hpcFNxdWFyZURpdnNPbkV2ZW50KGUpKSB7XG4gICAgICBhY3RpdmVEaXYuY2xhc3NMaXN0LnJlbW92ZShcInNoaXAtaG92ZXItbm90LXBsYWNlYWJsZVwiKTtcbiAgICAgIGFjdGl2ZURpdi5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcC1ob3Zlci1wbGFjZWFibGVcIik7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcC1ob3Zlci1zaG9vdGluZ1wiKTtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBtYW5hZ2UgYSBtb3VzZSBjbGlja2luZyBhIHNxdWFyZSBkaXZcbiAgZnVuY3Rpb24gb25Nb3VzZUNsaWNrU3F1YXJlRGl2KGUpIHtcbiAgICAvLyBUcmlnZ2VycyBkdXJpbmcgc2hpcCBwbGFjZW1lbnQgcGhhc2VcbiAgICBpZiAoXG4gICAgICBzaGlwUGxhY2VtZW50UGhhc2UgPT09IHRydWUgJiZcbiAgICAgIGN1cnJlbnRQbGF5ZXIuZ2V0VHlwZSgpID09PSBcImh1bWFuXCIgJiZcbiAgICAgIGlzV2l0aGluR3JpZEFuZERvZXNOb3RPdmVybGFwRXZlbnQoZSkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGlmIChjdXJyZW50R2FtZUJvYXJkLmFsbFNoaXBzUGxhY2VkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJvdyA9IGdldEdyaWRTcXVhcmVEaXZSb3coZS50YXJnZXQpO1xuICAgICAgICBjb2x1bW4gPSBnZXRHcmlkU3F1YXJlRGl2Q29sdW1uKGUudGFyZ2V0KTtcbiAgICAgICAgLy8gU2hpcCBwbGFjZW1lbnQgQmFja2VuZFxuICAgICAgICBwbGFjZVNoaXBzQmFja2VuZChyb3csIGNvbHVtbik7XG4gICAgICAgIC8vIFNoaXAgcGxhY2VtZW50IGZyb250IGVuZFxuICAgICAgICBmb3IgKGxldCBhY3RpdmVEaXYgb2YgZ2V0U2hpcFNxdWFyZURpdnNPbkV2ZW50KGUpKSB7XG4gICAgICAgICAgYWN0aXZlRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLXBsYWNlZFwiKTtcbiAgICAgICAgICBhY3RpdmVEaXYuY2xhc3NMaXN0LnJlbW92ZShcInNoaXAtaG92ZXItbm90LXBsYWNlYWJsZVwiKTtcbiAgICAgICAgICBhY3RpdmVEaXYuY2xhc3NMaXN0LnJlbW92ZShcInNoaXAtaG92ZXItcGxhY2VhYmxlXCIpO1xuICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLWhvdmVyLXNob290aW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHBsYXllciBwbGFjZW1lbnQgbm90IGNvbXBsZXRlLCBpbmNyZW1lbnQgc2hpcCBpbmRleFxuICAgICAgICBpZiAoY3VycmVudEdhbWVCb2FyZC5hbGxTaGlwc1BsYWNlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgIGN1cnJlbnRTaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IGN1cnJlbnRHYW1lQm9hcmQuc2hpcHNbY3VycmVudFNoaXBJbmRleF07XG4gICAgICAgICAgaW5zdHJ1Y3Rpb25zVGV4dERpdi50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRQbGF5ZXIuZ2V0TmFtZSgpfSBQTEFDRSBZT1VSICR7Y3VycmVudFNoaXAudHlwZS50b1VwcGVyQ2FzZSgpfSAtIExFTkdUSCAke1xuICAgICAgICAgICAgY3VycmVudFNoaXAubGVuZ3RoXG4gICAgICAgICAgfWA7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEdhbWVCb2FyZC5hbGxTaGlwc1BsYWNlZCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgc3dpdGNoQ3VycmVudFBsYXllcigpO1xuICAgICAgICAgIC8vIElmIHBsYXllciAxIHNoaXBzIHBsYWNlZCwgdHJpZ2dlciBzaGlwIHBsYWNlbWVudCBpbnRlcnBoYXNlXG4gICAgICAgICAgY2hlY2tUaGVuVHJpZ2dlclNoaXBQbGFjZW1lbnRJbnRlcnBoYXNlKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuZ2V0VHlwZSgpID09PSBcImFpXCIpIHtcbiAgICAgICAgICAgIC8vIEFJIHNoaXAgcGxhY2VtZW50XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gXCJBSSBTSElQIFBMQUNFTUVOVFwiO1xuICAgICAgICAgICAgcGxhY2VTaGlwc1JhbmRvbWx5KCk7XG4gICAgICAgICAgICBoaWRlU2hpcHMoY3VycmVudEdyaWRDbGFzcywgY3VycmVudEdhbWVCb2FyZCk7XG4gICAgICAgICAgICBzd2l0Y2hDdXJyZW50UGxheWVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgYWxsIHNoaXBzIHBsYWNlZCwgdHJpZ2dlciBzaG9vdGluZyBwaGFzZVxuICAgIGNoZWNrVGhlblRyaWdnZXJTaG9vdGluZ1BoYXNlKCk7XG5cbiAgICAvLyBUcmlnZ2VycyBkdXJpbmcgc2hvb3RpbmcgcGhhc2VcbiAgICBpZiAoXG4gICAgICBzaG9vdGluZ1BoYXNlID09PSB0cnVlICYmXG4gICAgICBjdXJyZW50UGxheWVyLmdldFR5cGUoKSA9PT0gXCJodW1hblwiICYmXG4gICAgICBpc1dpdGhpbk9wcG9uZW50R3JpZChlKSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgLy8gU2hvb3RpbmcgcGhhc2UgY29kZVxuICAgICAgaWYgKHNob290RXZlbnQoZSkgPT09IHRydWUpIHtcbiAgICAgICAgdW5oaWRlU3Vua1NoaXBzKG5leHRHcmlkQ2xhc3MsIG5leHRHYW1lQm9hcmQpO1xuICAgICAgICBzd2l0Y2hDdXJyZW50UGxheWVyKCk7XG4gICAgICAgIC8vIElmIGluIHNob290aW5nIHBoYXNlLCB0cmlnZ2VycyBpZiBwbGF5ZXIgMiBpcyBodW1hbiBhZnRlciBwbGF5ZXIgMSBzaG9vdHNcbiAgICAgICAgY2hlY2tUaGVuVHJpZ2dlclNob290aW5nSW50ZXJwaGFzZSgpO1xuICAgICAgICBpZiAoY3VycmVudFBsYXllci5nZXRUeXBlKCkgPT09IFwiYWlcIikge1xuICAgICAgICAgIHdoaWxlIChzaG9vdEFpKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoQ3VycmVudFBsYXllcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgYW55IGdhbWVib2FyZCBoYXMgYWxsIHNoaXAgc3VuaywgdHJpZ2dlciBlbmQgZ2FtZVxuICAgIGNoZWNrVGhlblRyaWdnZXJFbmRnYW1lKCk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBmZXRjaCBhIGdyaWQgc3F1YXJlIGRpdiByb3dcbiAgZnVuY3Rpb24gZ2V0R3JpZFNxdWFyZURpdlJvdyhzcXVhcmVEaXYpIHtcbiAgICByZXR1cm4gTnVtYmVyKHNxdWFyZURpdi5kYXRhc2V0LnJvdyk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBmZXRjaCBhIGdyaWQgc3F1YXJlIGRpdiBjb2x1bW5cbiAgZnVuY3Rpb24gZ2V0R3JpZFNxdWFyZURpdkNvbHVtbihzcXVhcmVEaXYpIHtcbiAgICByZXR1cm4gTnVtYmVyKHNxdWFyZURpdi5kYXRhc2V0LmNvbHVtbik7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBzZWxlY3QgdGhlIHNoaXAgc3F1YXJlIGRpdnMgZnJvbSBhbiBldmVudFxuICBmdW5jdGlvbiBnZXRTaGlwU3F1YXJlRGl2c09uRXZlbnQoZSkge1xuICAgIHJvdyA9IGdldEdyaWRTcXVhcmVEaXZSb3coZS50YXJnZXQpO1xuICAgIGNvbHVtbiA9IGdldEdyaWRTcXVhcmVEaXZDb2x1bW4oZS50YXJnZXQpO1xuICAgIGNvbnN0IHNoaXBTcXVhcmVEaXZzID0gZ2V0U2hpcFNxdWFyZURpdnMocm93LCBjb2x1bW4pO1xuICAgIHJldHVybiBzaGlwU3F1YXJlRGl2cztcbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIHNlbGVjdCB0aGUgc2hpcCBzcXVhcmUgZGl2cyBnaXZlbiByb3cgYW5kIGNvbHVtblxuICBmdW5jdGlvbiBnZXRTaGlwU3F1YXJlRGl2cyhyb3csIGNvbHVtbikge1xuICAgIGNvbnN0IHNoaXBTcXVhcmVEaXZzID0gW107XG4gICAgaWYgKGN1cnJlbnRTaGlwLmdldE9yaWVudGF0aW9uKCkgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IGNvbHVtbjtcbiAgICAgICAgaSA8PSBNYXRoLm1pbigxMCwgY29sdW1uICsgY3VycmVudFNoaXAubGVuZ3RoIC0gMSk7XG4gICAgICAgIGkgKz0gMVxuICAgICAgKSB7XG4gICAgICAgIHNoaXBTcXVhcmVEaXZzLnB1c2goXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHtjdXJyZW50R3JpZENsYXNzfSBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2l9XCJdYFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRTaGlwLmdldE9yaWVudGF0aW9uKCkgPT09IFwidmVydGljYWxcIikge1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSByb3c7XG4gICAgICAgIGkgPj0gTWF0aC5tYXgoMSwgcm93IC0gY3VycmVudFNoaXAubGVuZ3RoICsgMSk7XG4gICAgICAgIGkgLT0gMVxuICAgICAgKSB7XG4gICAgICAgIHNoaXBTcXVhcmVEaXZzLnB1c2goXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHtjdXJyZW50R3JpZENsYXNzfSBbZGF0YS1yb3c9XCIke2l9XCJdW2RhdGEtY29sdW1uPVwiJHtjb2x1bW59XCJdYFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNoaXBTcXVhcmVEaXZzO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRydWUgd2hlbiBhIHNoaXAgaXMgd2l0aGluIGdyaWQgYW5kIGRvZXNudCBvdmVybGFwIGZyb20gZXZlbnRcbiAgZnVuY3Rpb24gaXNXaXRoaW5HcmlkQW5kRG9lc05vdE92ZXJsYXBFdmVudChlKSB7XG4gICAgY3VycmVudEdyaWREaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgcm93ID0gZ2V0R3JpZFNxdWFyZURpdlJvdyhlLnRhcmdldCk7XG4gICAgY29sdW1uID0gZ2V0R3JpZFNxdWFyZURpdkNvbHVtbihlLnRhcmdldCk7XG4gICAgaWYgKFxuICAgICAgc2hpcFBsYWNlbWVudFBoYXNlID09PSB0cnVlICYmXG4gICAgICBjdXJyZW50R3JpZERpdi5jbGFzc0xpc3QuY29udGFpbnMoY3VycmVudEdyaWRDbGFzcykgPT09IHRydWUgJiZcbiAgICAgIGN1cnJlbnRQbGF5ZXIuZ2V0VHlwZSgpID09PSBcImh1bWFuXCJcbiAgICApIHtcbiAgICAgIGlmIChpc1dpdGhpbkdyaWRBbmREb2VzTm9PdmVybGFwKHJvdywgY29sdW1uKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSB3aGVuIGEgc2hpcCBpcyB3aXRoaW4gZ3JpZCBhbmQgZG9lc250IG92ZXJsYXAgZ2l2ZW4gcm93IGFuZCBjb2x1bW5cbiAgZnVuY3Rpb24gaXNXaXRoaW5HcmlkQW5kRG9lc05vT3ZlcmxhcChyb3csIGNvbHVtbikge1xuICAgIGlmIChcbiAgICAgIGN1cnJlbnRHYW1lQm9hcmQuaXNXaXRoaW5HcmlkKFxuICAgICAgICByb3csXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgY3VycmVudFNoaXAubGVuZ3RoLFxuICAgICAgICBjdXJyZW50U2hpcC5nZXRPcmllbnRhdGlvbigpXG4gICAgICApID09PSB0cnVlICYmXG4gICAgICBjdXJyZW50R2FtZUJvYXJkLmRvZXNOb3RPdmVybGFwKFxuICAgICAgICByb3csXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgY3VycmVudFNoaXAubGVuZ3RoLFxuICAgICAgICBjdXJyZW50U2hpcC5nZXRPcmllbnRhdGlvbigpXG4gICAgICApID09PSB0cnVlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRoYXQgcmFuZG9tbHkgcGxhY2VzIG9uZSBzZXQgb2Ygc2hpcHNcbiAgZnVuY3Rpb24gcGxhY2VTaGlwc1JhbmRvbWx5KCkge1xuICAgIHdoaWxlIChjdXJyZW50R2FtZUJvYXJkLmFsbFNoaXBzUGxhY2VkKCkgPT09IGZhbHNlKSB7XG4gICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgKyAxO1xuICAgICAgaWYgKHggJSAyID09PSAwKSB7XG4gICAgICAgIGN1cnJlbnRTaGlwLmNoYW5nZU9yaWVudGF0aW9uKCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNXaXRoaW5HcmlkQW5kRG9lc05vT3ZlcmxhcChyb3csIGNvbHVtbikpIHtcbiAgICAgICAgLy8gU2hpcCBwbGFjZW1lbnQgQmFja2VuZFxuICAgICAgICBwbGFjZVNoaXBzQmFja2VuZChyb3csIGNvbHVtbik7XG4gICAgICAgIC8vIFNoaXAgcGxhY2VtZW50IGZyb250IGVuZFxuICAgICAgICBmb3IgKGxldCBhY3RpdmVEaXYgb2YgZ2V0U2hpcFNxdWFyZURpdnMocm93LCBjb2x1bW4pKSB7XG4gICAgICAgICAgYWN0aXZlRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLXBsYWNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50U2hpcEluZGV4ICs9IDE7XG4gICAgICAgIGN1cnJlbnRTaGlwID0gY3VycmVudEdhbWVCb2FyZC5zaGlwc1tjdXJyZW50U2hpcEluZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0aGF0IHVwZGF0ZXMgc2hpcCBwbGFjZW1lbnQgaW4gdGhlIFNoaXAgZmFjdG9yeSBhbmQgdGhlIEdhbWVib2FyZCBncmlkIFNxdWFyZSBmYWN0b3J5XG4gIGZ1bmN0aW9uIHBsYWNlU2hpcHNCYWNrZW5kKHJvdywgY29sdW1uKSB7XG4gICAgLy8gVXBkYXRlIGNvcnJlc3BvbmRpbmcgZ2FtZWJvYXJkIGdyaWQgb2JqZWN0IHNxdWFyZXNcbiAgICBjdXJyZW50R2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICAgIHJvdyxcbiAgICAgIGNvbHVtbixcbiAgICAgIGN1cnJlbnRTaGlwLmxlbmd0aCxcbiAgICAgIGN1cnJlbnRTaGlwLmdldE9yaWVudGF0aW9uKCksXG4gICAgICBjdXJyZW50U2hpcC50eXBlXG4gICAgKTtcbiAgICAvLyBVcGRhdGUgY29ycmVzcG9uZGluZyBzaGlwIG9iamVjdCBwbGFjZSB2YXJpYWJsZVxuICAgIGN1cnJlbnRTaGlwLnBsYWNlKCk7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjaGVjayBhbmQgdHJpZ2dlciBzaGlwIHBsYWNlbWVudCBpbnRlcnBoYXNlIChza2lwc2ludGVycGhhc2UgaWYgcGxheWVyIDIgaXMgYWkpXG4gIGZ1bmN0aW9uIGNoZWNrVGhlblRyaWdnZXJTaGlwUGxhY2VtZW50SW50ZXJwaGFzZSgpIHtcbiAgICAvLyBXaGVuIHBsYXllciAxIHBsYWNlcyBsYXN0IHNoaXAgLS0+IHRyaWdnZXJzIHNoaXAgcGxhY2VtZW50IGludGVycGhhc2VcbiAgICBpZiAoXG4gICAgICBnYW1lYm9hcmQxLmFsbFNoaXBzUGxhY2VkKCkgPT09IHRydWUgJiZcbiAgICAgIGdhbWVib2FyZDIuYWxsU2hpcHNQbGFjZWQoKSA9PT0gZmFsc2UgJiZcbiAgICAgIGN1cnJlbnRTaGlwSW5kZXggPT09IDAgJiZcbiAgICAgIHNoaXBQbGFjZW1lbnRQaGFzZSA9PT0gdHJ1ZSAmJlxuICAgICAgcGxheWVyMi5nZXRUeXBlKCkgPT09IFwiaHVtYW5cIlxuICAgICkge1xuICAgICAgc2hpcFBsYWNlbWVudFBoYXNlID0gZmFsc2U7XG4gICAgICBzaGlwUGxhY2VtZW50SW50ZXJwaGFzZSA9IHRydWU7XG4gICAgICByb3RhdGVTaGlwQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIG5leHRQbGF5ZXJCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGhpZGVTaGlwcyhcImdyaWQtMVwiLCBnYW1lYm9hcmQxKTtcbiAgICAgIGluc3RydWN0aW9uc1RleHREaXYudGV4dENvbnRlbnQgPSBgUEFTUyBDT01QVVRFUiBUTyAke2N1cnJlbnRQbGF5ZXIuZ2V0TmFtZSgpfWA7XG4gICAgfVxuICAgIC8vIFdoZW4gcGxheWVyIDIgcGxhY2VzIGxhc3Qgc2hpcCAtLT4gdHJpZ2dlcnMgc2hpcCBwbGFjZW1lbnQgaW50ZXJwaGFzZVxuICAgIGlmIChcbiAgICAgIGdhbWVib2FyZDEuYWxsU2hpcHNQbGFjZWQoKSA9PT0gdHJ1ZSAmJlxuICAgICAgZ2FtZWJvYXJkMi5hbGxTaGlwc1BsYWNlZCgpID09PSB0cnVlICYmXG4gICAgICBzaGlwUGxhY2VtZW50UGhhc2UgPT09IHRydWUgJiZcbiAgICAgIHBsYXllcjIuZ2V0VHlwZSgpID09PSBcImh1bWFuXCJcbiAgICApIHtcbiAgICAgIHNoaXBQbGFjZW1lbnRQaGFzZSA9IGZhbHNlO1xuICAgICAgc2hpcFBsYWNlbWVudEludGVycGhhc2UgPSB0cnVlO1xuICAgICAgcm90YXRlU2hpcEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBuZXh0UGxheWVyQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBoaWRlU2hpcHMoXCJncmlkLTJcIiwgZ2FtZWJvYXJkMik7XG4gICAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gYFBBU1MgQ09NUFVURVIgVE8gJHtjdXJyZW50UGxheWVyLmdldE5hbWUoKX1gO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIGhpZGUgYSBncmlkJ3MgdW5zdW5rIHNoaXAgc2VnbWVudHMgZ2l2ZW4gZ3JpZCBjbGFzcyAoaWUgXCJncmlkLTFcIilcbiAgZnVuY3Rpb24gaGlkZVNoaXBzKGdyaWRDbGFzcywgZ2FtZWJvYXJkKSB7XG4gICAgZm9yIChsZXQgc2hpcExvY2F0aW9uIG9mIGdhbWVib2FyZC5zaGlwc0xvY2F0aW9uKSB7XG4gICAgICBsZXQgaSA9IHNoaXBMb2NhdGlvblswXTtcbiAgICAgIGxldCBqID0gc2hpcExvY2F0aW9uWzFdO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRTcXVhcmVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLiR7Z3JpZENsYXNzfSBbZGF0YS1yb3c9XCIke2l9XCJdW2RhdGEtY29sdW1uPVwiJHtqfVwiXWBcbiAgICAgICk7XG4gICAgICBzZWxlY3RlZFNxdWFyZURpdi5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcC1wbGFjZWRcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gdW5oaWRlIGEgZ3JpZCdzIHNoaXAgc2VnbWVudHMgZ2l2ZW4gZ3JpZCBjbGFzcyAoaWUgXCJncmlkLTFcIilcbiAgZnVuY3Rpb24gdW5oaWRlU2hpcHMoZ3JpZENsYXNzLCBnYW1lYm9hcmQpIHtcbiAgICBmb3IgKGxldCBzaGlwTG9jYXRpb24gb2YgZ2FtZWJvYXJkLnNoaXBzTG9jYXRpb24pIHtcbiAgICAgIGxldCBpID0gc2hpcExvY2F0aW9uWzBdO1xuICAgICAgbGV0IGogPSBzaGlwTG9jYXRpb25bMV07XG4gICAgICBjb25zdCBzZWxlY3RlZFNxdWFyZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuJHtncmlkQ2xhc3N9IFtkYXRhLXJvdz1cIiR7aX1cIl1bZGF0YS1jb2x1bW49XCIke2p9XCJdYFxuICAgICAgKTtcbiAgICAgIHNlbGVjdGVkU3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLXBsYWNlZFwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byB1bmhpZGUgYSBncmlkJ3Mgc2hpcCBzZWdtZW50cyBnaXZlbiBncmlkIGNsYXNzIChpZSBcImdyaWQtMVwiKVxuICBmdW5jdGlvbiB1bmhpZGVTdW5rU2hpcHMoZ3JpZENsYXNzLCBnYW1lYm9hcmQpIHtcbiAgICBmb3IgKGxldCBzaGlwTG9jYXRpb24gb2YgZ2FtZWJvYXJkLnNoaXBzTG9jYXRpb24pIHtcbiAgICAgIGxldCByb3cgPSBzaGlwTG9jYXRpb25bMF07XG4gICAgICBsZXQgY29sdW1uID0gc2hpcExvY2F0aW9uWzFdO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRTcXVhcmVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLiR7Z3JpZENsYXNzfSBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbHVtbn1cIl1gXG4gICAgICApO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRTaGlwVHlwZSA9XG4gICAgICAgIGdhbWVib2FyZC5ncmlkW2BzcXVhcmUtJHtyb3d9LSR7Y29sdW1ufWBdLmdldFNoaXBTZWdtZW50VHlwZSgpO1xuICAgICAgZm9yIChsZXQgc2hpcCBvZiBnYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAgICAgaWYgKHNoaXAudHlwZSA9PT0gc2VsZWN0ZWRTaGlwVHlwZSAmJiBzaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2VsZWN0ZWRTcXVhcmVEaXYuY2xhc3NMaXN0LmFkZChcInNoaXAtcGxhY2VkXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gc3dpdGNoIHBsYXllciBjdXJyZW50IHN0YXR1c1xuICBmdW5jdGlvbiBzd2l0Y2hDdXJyZW50UGxheWVyKCkge1xuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyMjtcbiAgICAgIGN1cnJlbnRHYW1lQm9hcmQgPSBnYW1lYm9hcmQyO1xuICAgICAgbmV4dEdhbWVCb2FyZCA9IGdhbWVib2FyZDE7XG4gICAgICBjdXJyZW50R3JpZENsYXNzID0gXCJncmlkLTJcIjtcbiAgICAgIG5leHRHcmlkQ2xhc3MgPSBcImdyaWQtMVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyMTtcbiAgICAgIGN1cnJlbnRHYW1lQm9hcmQgPSBnYW1lYm9hcmQxO1xuICAgICAgbmV4dEdhbWVCb2FyZCA9IGdhbWVib2FyZDI7XG4gICAgICBjdXJyZW50R3JpZENsYXNzID0gXCJncmlkLTFcIjtcbiAgICAgIG5leHRHcmlkQ2xhc3MgPSBcImdyaWQtMlwiO1xuICAgIH1cbiAgICAvLyBMb2dpYyBkdXJpbmcgc2hpcCBwbGFjZW1lbnQgcGhhc2VcbiAgICBpZiAoc2hpcFBsYWNlbWVudFBoYXNlID09PSB0cnVlKSB7XG4gICAgICBjdXJyZW50U2hpcEluZGV4ID0gMDtcbiAgICAgIGN1cnJlbnRTaGlwID0gY3VycmVudEdhbWVCb2FyZC5zaGlwc1tjdXJyZW50U2hpcEluZGV4XTtcbiAgICAgIGluc3RydWN0aW9uc1RleHREaXYudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50UGxheWVyLmdldE5hbWUoKX0gUExBQ0UgWU9VUiAke2N1cnJlbnRTaGlwLnR5cGUudG9VcHBlckNhc2UoKX0gLSBMRU5HVEggJHtcbiAgICAgICAgY3VycmVudFNoaXAubGVuZ3RoXG4gICAgICB9YDtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjaGVjayBhbmQgdHJpZ2dlciBzaG9vdGluZyBwaGFzZVxuICBmdW5jdGlvbiBjaGVja1RoZW5UcmlnZ2VyU2hvb3RpbmdQaGFzZSgpIHtcbiAgICBpZiAoXG4gICAgICBnYW1lYm9hcmQxLmFsbFNoaXBzUGxhY2VkKCkgPT09IHRydWUgJiZcbiAgICAgIGdhbWVib2FyZDIuYWxsU2hpcHNQbGFjZWQoKSA9PT0gdHJ1ZSAmJlxuICAgICAgc2hpcFBsYWNlbWVudFBoYXNlID09PSB0cnVlICYmXG4gICAgICBwbGF5ZXIyLmdldFR5cGUoKSA9PT0gXCJhaVwiXG4gICAgKSB7XG4gICAgICBzaGlwUGxhY2VtZW50UGhhc2UgPSBmYWxzZTtcbiAgICAgIHJvdGF0ZVNoaXBCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgc2hvb3RpbmdQaGFzZSA9IHRydWU7XG4gICAgICBpbnN0cnVjdGlvbnNUZXh0RGl2LnRleHRDb250ZW50ID0gXCJTSE9PVElORyBQSEFTRSAtIFBMQUNFIFlPVVIgU0hPVFwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIGNoZWNrIGFuZCB0cmlnZ2VyIHNob290aW5nIGludGVycGhhc2VcbiAgZnVuY3Rpb24gY2hlY2tUaGVuVHJpZ2dlclNob290aW5nSW50ZXJwaGFzZSgpIHtcbiAgICBpZiAoc2hvb3RpbmdQaGFzZSA9PT0gdHJ1ZSAmJiBwbGF5ZXIyLmdldFR5cGUoKSA9PT0gXCJodW1hblwiKSB7XG4gICAgICBzaG9vdGluZ1BoYXNlID0gZmFsc2U7XG4gICAgICBzaG9vdGluZ0ludGVycGhhc2UgPSB0cnVlO1xuICAgICAgbmV4dFBsYXllckJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgaGlkZVNoaXBzKFwiZ3JpZC0xXCIsIGdhbWVib2FyZDEpO1xuICAgICAgdW5oaWRlU3Vua1NoaXBzKFwiZ3JpZC0xXCIsIGdhbWVib2FyZDEpO1xuICAgICAgaGlkZVNoaXBzKFwiZ3JpZC0yXCIsIGdhbWVib2FyZDIpO1xuICAgICAgdW5oaWRlU3Vua1NoaXBzKFwiZ3JpZC0yXCIsIGdhbWVib2FyZDIpO1xuICAgICAgaW5zdHJ1Y3Rpb25zVGV4dERpdi50ZXh0Q29udGVudCA9IGBQQVNTIENPTVBVVEVSIFRPICR7Y3VycmVudFBsYXllci5nZXROYW1lKCl9YDtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byByZXR1cm4gdHJ1ZSBpZiBtb3VzZSBpcyBvdmVyIHRoZSBvcHBvbmVudCBncmlkXG4gIGZ1bmN0aW9uIGlzV2l0aGluT3Bwb25lbnRHcmlkKGUpIHtcbiAgICBpZiAoY3VycmVudFBsYXllci5nZXRUeXBlKCkgPT09IFwiaHVtYW5cIikge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKG5leHRHcmlkQ2xhc3MpID09PVxuICAgICAgICB0cnVlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gbWFuYWdlIHNob290aW5nIGxvZ2ljIGZyb20gZXZlbnRcbiAgZnVuY3Rpb24gc2hvb3RFdmVudChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZVwiKSA9PT0gdHJ1ZSkge1xuICAgICAgcm93ID0gZ2V0R3JpZFNxdWFyZURpdlJvdyhlLnRhcmdldCk7XG4gICAgICBjb2x1bW4gPSBnZXRHcmlkU3F1YXJlRGl2Q29sdW1uKGUudGFyZ2V0KTtcbiAgICAgIHJldHVybiBzaG9vdChyb3csIGNvbHVtbik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIG1hbmFnZSBBSSBzaG9vdGluZyBhbGdvcml0aG1cbiAgZnVuY3Rpb24gc2hvb3RBaSgpIHtcbiAgICBsZXQgW3JvdywgY29sdW1uXSA9IG5leHRHYW1lQm9hcmQuaHVudFRhcmdldCgpO1xuICAgIHJldHVybiBzaG9vdChyb3csIGNvbHVtbik7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBtYW5hZ2Ugc2hvb3RpbmcgbG9naWMgZ2l2ZW4gcm93IGFuZCBjb2x1bW5cbiAgZnVuY3Rpb24gc2hvb3Qocm93LCBjb2x1bW4pIHtcbiAgICAvLyBGaW5kIHRoZSB0YXJnZXQgc3F1YXJlIGRpdiBhbmQgYXBwZW5kIHRvIGl0IGFuIGltZyBlbGVtZW50XG4gICAgY29uc3QgdGFyZ2V0U3F1YXJlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtuZXh0R3JpZENsYXNzfSBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbHVtbn1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0YXJnZXRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIHRhcmdldFNxdWFyZURpdi5hcHBlbmRDaGlsZCh0YXJnZXRJbWcpO1xuICAgIC8vIElmIGdyaWQgc3F1YXJlIGlzIG5vdCBzaG90IHlldFxuICAgIGlmIChuZXh0R2FtZUJvYXJkLmdyaWRbYHNxdWFyZS0ke3Jvd30tJHtjb2x1bW59YF0uaXNTaG90KCkgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIC8vIGlmIGdyaWQgc3F1YXJlIGNvbnRhaW5zIGEgc2hpcCBzZWdtZW50XG4gICAgICAgIG5leHRHYW1lQm9hcmQuZ3JpZFtgc3F1YXJlLSR7cm93fS0ke2NvbHVtbn1gXS5jb250YWluc1NoaXBTZWdtZW50KCkgPT09XG4gICAgICAgIHRydWVcbiAgICAgICkge1xuICAgICAgICAvLyBQbGFjZSBzaG90IG9uIGdhbWVib2FyZCBncmlkIHNxdWFyZVxuICAgICAgICBuZXh0R2FtZUJvYXJkLmdyaWRbYHNxdWFyZS0ke3Jvd30tJHtjb2x1bW59YF0ucGxhY2VTaG90KCk7XG4gICAgICAgIC8vIEFzc2lnbiBCT01CIFBJQ1RVUkUgVE8gdGFyZ2V0IGltZ1xuICAgICAgICB0YXJnZXRJbWcuc3JjID0gYm9tYkltYWdlO1xuICAgICAgICAvLyBNYXJrIGNvcnJlc3BvbmRpbmcgZ2FtZWJvYXJkIHNoaXAgYXMgaGl0XG4gICAgICAgIGxldCB0YXJnZXRTaGlwVHlwZSA9XG4gICAgICAgICAgbmV4dEdhbWVCb2FyZC5ncmlkW2BzcXVhcmUtJHtyb3d9LSR7Y29sdW1ufWBdLmdldFNoaXBTZWdtZW50VHlwZSgpO1xuICAgICAgICBmb3IgKGxldCBzaGlwIG9mIG5leHRHYW1lQm9hcmQuc2hpcHMpIHtcbiAgICAgICAgICBpZiAoc2hpcC50eXBlID09PSB0YXJnZXRTaGlwVHlwZSkge1xuICAgICAgICAgICAgc2hpcC5oaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIC8vIGlmIGdyaWQgc3F1YXJlIGRvZXMgbm90IGNvbnRhaW4gc2hpcCBzZWdtZW50XG4gICAgICAgIG5leHRHYW1lQm9hcmQuZ3JpZFtgc3F1YXJlLSR7cm93fS0ke2NvbHVtbn1gXS5jb250YWluc1NoaXBTZWdtZW50KCkgPT09XG4gICAgICAgIGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgLy8gUGxhY2Ugc2hvdCBvbiBnYW1lYm9hcmQgZ3JpZCBzcXVhcmVcbiAgICAgICAgbmV4dEdhbWVCb2FyZC5ncmlkW2BzcXVhcmUtJHtyb3d9LSR7Y29sdW1ufWBdLnBsYWNlU2hvdCgpO1xuICAgICAgICAvLyBBc3NpZ24gV0FURVIgU1BMQVNIIFBJQ1RVUkUgVE8gdGFyZ2V0IGltZ1xuICAgICAgICB0YXJnZXRJbWcuc3JjID0gc3BsYXNoSW1hZ2U7XG4gICAgICB9XG4gICAgICAvLyBBZnRlciB0aGUgc2hvdCBpcyBtYWRlIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHNob3QgY2Fubm90IGJlIG1hZGUgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgYW5kIHRyaWdnZXIgZW5kZ2FtZVxuICBmdW5jdGlvbiBjaGVja1RoZW5UcmlnZ2VyRW5kZ2FtZSgpIHtcbiAgICBpZiAoXG4gICAgICBnYW1lYm9hcmQxLmFsbFNoaXBzU3VuaygpID09PSB0cnVlIHx8XG4gICAgICBnYW1lYm9hcmQyLmFsbFNoaXBzU3VuaygpID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBzaG9vdGluZ1BoYXNlID0gZmFsc2U7XG4gICAgICBzaG9vdGluZ0ludGVycGhhc2UgPSBmYWxzZTtcbiAgICAgIGluc3RydWN0aW9uc1RleHREaXYuY2xhc3NMaXN0LmFkZChcImdhbWUtb3ZlclwiKTtcbiAgICAgIGluc3RydWN0aW9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyXCIpO1xuICAgICAgdW5oaWRlU2hpcHMoY3VycmVudEdyaWRDbGFzcywgY3VycmVudEdhbWVCb2FyZCk7XG4gICAgICB1bmhpZGVTaGlwcyhuZXh0R3JpZENsYXNzLCBuZXh0R2FtZUJvYXJkKTtcbiAgICAgIGlmIChnYW1lYm9hcmQxLmFsbFNoaXBzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGluc3RydWN0aW9uc1RleHREaXYudGV4dENvbnRlbnQgPSBcIkdBTUUgT1ZFUiEgVEhFIFdJTk5FUiBJUyBQTEFZRVIgMlwiO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVib2FyZDIuYWxsU2hpcHNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zVGV4dERpdi50ZXh0Q29udGVudCA9IFwiR0FNRSBPVkVSISBUSEUgV0lOTkVSIElTIFBMQVlFUiAxXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmdhbWUoKTtcbiJdLCJuYW1lcyI6WyJHcmlkU3F1YXJlIiwiU2hpcCIsInNoaXBUeXBlcyIsIkdhbWVib2FyZCIsImdyaWQiLCJpIiwiaiIsIm5ld0dyaWRTcXVhcmUiLCJyb3ciLCJjb2x1bW4iLCJzaGlwcyIsImxlbmd0aCIsIm5ld1NoaXAiLCJwdXNoIiwiaXNXaXRoaW5HcmlkIiwib3JpZW50YXRpb24iLCJkb2VzTm90T3ZlcmxhcCIsImNvbnRhaW5zU2hpcFNlZ21lbnQiLCJzaGlwc0xvY2F0aW9uIiwicGxhY2VTaGlwIiwidHlwZSIsInBsYWNlU2hpcFNlZ21lbnQiLCJjaGFuZ2VTaGlwU2VnbWVudFR5cGUiLCJhbGxTaGlwc1BsYWNlZCIsInNoaXAiLCJpc1BsYWNlZCIsImFsbFNoaXBzU3VuayIsImlzU3VuayIsImxhcmdlc3RVbnN1bmtTaGlwTGVuZ3RoIiwibWF4TGVuZ3RoIiwiZ3Vlc3NQYXR0ZXJuIiwic3RvcExvb3AiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1Nob3QiLCJhcmVUaGVyZVVuc3Vua1Nob3RTaGlwU2VnbWVudHMiLCJzaG90U2hpcFNlZ21lbnRzIiwia2V5IiwiZ2V0U2hpcFNlZ21lbnRUeXBlIiwiaW5jbHVkZXNBcnJheSIsImFycmF5IiwiYXJyYXlPZkFycmF5cyIsImN1cnJlbnQiLCJ0YXJnZXRzIiwidGFyZ2V0c09mSGlnaGVyUHJvYmFiaWx0eSIsImh1bnRUYXJnZXQiLCJwb3AiLCJpbmRleCIsInNwbGljZSIsInBvdGVudGlhbFRhcmdldHMiLCJ0YXJnZXRSb3ciLCJ0YXJnZXRDb2x1bW4iLCJwcmlvcml0eVJvdyIsInByaW9yaXR5Q29sdW1uIiwiciIsImMiLCJzaGlwU2VnbWVudCIsInNoaXBTZWdtZW50VHlwZSIsInNob3RTdGF0dXMiLCJzaGlwVHlwZSIsInBsYWNlU2hvdCIsIlBsYXllciIsIm5hbWUiLCJnZXRUeXBlIiwiY2hhbmdlVHlwZSIsImdldE5hbWUiLCJjaGFuZ2VOYW1lIiwibmV3TmFtZSIsInBsYWNlZCIsImhpdHMiLCJnZXRPcmllbnRhdGlvbiIsImNoYW5nZU9yaWVudGF0aW9uIiwicGxhY2UiLCJoaXQiLCJnaXRodWJJbWFnZSIsImJvbWJJbWFnZSIsInNwbGFzaEltYWdlIiwiaGVhZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpbnN0cnVjdGlvbnNEaXYiLCJidXR0b25Db250YWluZXIxIiwibmV3R2FtZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25maXJtIiwiZ2FtZSIsInZlcnN1c0J1dHRvbiIsInN0YXJ0R2FtZUJ1dHRvbiIsImluc3RydWN0aW9uc1RleHREaXYiLCJidXR0b25Db250YWluZXIyIiwicm90YXRlU2hpcEJ1dHRvbiIsIm5leHRQbGF5ZXJCdXR0b24iLCJtYWluRGl2IiwiZ3JpZENvbnRhaW5lckRpdjEiLCJwbGF5ZXJUaXRsZURpdjEiLCJncmlkRGl2MSIsInBsYXllclRleHREaXYxIiwiZ3JpZENvbnRhaW5lckRpdjIiLCJwbGF5ZXJUaXRsZURpdjIiLCJncmlkRGl2MiIsInBsYXllclRleHREaXYyIiwiZm9vdGVyIiwiZm9vdGVyVGV4dERpdiIsImZvb3RlckEiLCJocmVmIiwidGFyZ2V0IiwiZm9vdGVySW1nIiwic3JjIiwicGxheWVyMSIsInBsYXllcjIiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVHcmlkIiwiZ2FtZWJvYXJkMSIsImdhbWVib2FyZDIiLCJjdXJyZW50UGxheWVyIiwiY3VycmVudEdhbWVCb2FyZCIsIm5leHRHYW1lQm9hcmQiLCJjdXJyZW50R3JpZENsYXNzIiwibmV4dEdyaWRDbGFzcyIsImN1cnJlbnRTaGlwSW5kZXgiLCJjdXJyZW50U2hpcCIsImN1cnJlbnRHcmlkRGl2Iiwic2hpcFBsYWNlbWVudFBoYXNlIiwic2hpcFBsYWNlbWVudEludGVycGhhc2UiLCJzaG9vdGluZ1BoYXNlIiwic2hvb3RpbmdJbnRlcnBoYXNlIiwiZGlzYWJsZWQiLCJyZW1vdmUiLCJ0b1VwcGVyQ2FzZSIsInVuaGlkZVNoaXBzIiwidW5oaWRlU3Vua1NoaXBzIiwiZ3JpZERpdiIsIm5ld0dyaWRSb3dEaXYiLCJuZXdHcmlkU3F1YXJlRGl2IiwiZGF0YXNldCIsIm9uTW91c2VFbnRlclNxdWFyZURpdiIsIm9uTW91c2VMZWF2ZVNxdWFyZURpdiIsIm9uTW91c2VDbGlja1NxdWFyZURpdiIsImUiLCJpc1dpdGhpbkdyaWRBbmREb2VzTm90T3ZlcmxhcEV2ZW50IiwiZ2V0U2hpcFNxdWFyZURpdnNPbkV2ZW50IiwiYWN0aXZlRGl2IiwiaXNXaXRoaW5PcHBvbmVudEdyaWQiLCJnZXRHcmlkU3F1YXJlRGl2Um93IiwiZ2V0R3JpZFNxdWFyZURpdkNvbHVtbiIsInBsYWNlU2hpcHNCYWNrZW5kIiwic3dpdGNoQ3VycmVudFBsYXllciIsImNoZWNrVGhlblRyaWdnZXJTaGlwUGxhY2VtZW50SW50ZXJwaGFzZSIsInBsYWNlU2hpcHNSYW5kb21seSIsImhpZGVTaGlwcyIsImNoZWNrVGhlblRyaWdnZXJTaG9vdGluZ1BoYXNlIiwic2hvb3RFdmVudCIsImNoZWNrVGhlblRyaWdnZXJTaG9vdGluZ0ludGVycGhhc2UiLCJzaG9vdEFpIiwiY2hlY2tUaGVuVHJpZ2dlckVuZGdhbWUiLCJzcXVhcmVEaXYiLCJOdW1iZXIiLCJzaGlwU3F1YXJlRGl2cyIsImdldFNoaXBTcXVhcmVEaXZzIiwibWluIiwicXVlcnlTZWxlY3RvciIsIm1heCIsInBhcmVudE5vZGUiLCJjb250YWlucyIsImlzV2l0aGluR3JpZEFuZERvZXNOb092ZXJsYXAiLCJ4IiwiZ3JpZENsYXNzIiwiZ2FtZWJvYXJkIiwic2hpcExvY2F0aW9uIiwic2VsZWN0ZWRTcXVhcmVEaXYiLCJzZWxlY3RlZFNoaXBUeXBlIiwic2hvb3QiLCJ0YXJnZXRTcXVhcmVEaXYiLCJ0YXJnZXRJbWciLCJ0YXJnZXRTaGlwVHlwZSJdLCJzb3VyY2VSb290IjoiIn0=