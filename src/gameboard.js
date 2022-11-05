import { GridSquare } from "./gridsquare";
import { Ship, shipTypes } from "./ship";

const Gameboard = () => {
  // Declare grid empty object
  const grid = {};

  // Fill grid with GridSquare objects
  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      const newGridSquare = GridSquare();
      newGridSquare.row = i;
      newGridSquare.column = j;
      grid[`square-${i}-${j}`] = newGridSquare;
    }
  }

  // Declare and populate gameboard ships array
  const ships = [];
  for (let i = 0; i < shipTypes.length; i += 1) {
    const newShip = Ship(i);
    ships.push(newShip);
  }

  // Gameboard factory method to check if ship placement is within grid
  const isWithinGrid = (row, column, length, orientation) => {
    if (orientation === "horizontal" && column + length - 1 <= 10) {
      return true;
    } else if (orientation === "vertical" && row - length + 1 >= 1) {
      return true;
    }
    return false;
  };

  // Gameboard factory method to check if ship placement does not overlap other ships
  const doesNotOverlap = (row, column, length, orientation) => {
    if (
      isWithinGrid(row, column, length, orientation) === true &&
      orientation === "horizontal"
    ) {
      for (let i = column; i < column + length; i += 1) {
        if (grid[`square-${row}-${i}`].containsShipSegment() === true) {
          return false;
        }
      }
      return true;
    } else if (
      isWithinGrid(row, column, length, orientation) === true &&
      orientation === "vertical"
    ) {
      for (let i = row; i > row - length; i -= 1) {
        if (grid[`square-${i}-${column}`].containsShipSegment() === true) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const shipsLocation = [];

  // Gameboard factory method to place a ship given a set of coordinates (a grid square)
  const placeShip = (row, column, length, orientation, type) => {
    if (
      isWithinGrid(row, column, length, orientation) === true &&
      doesNotOverlap(row, column, length, orientation) === true
    ) {
      if (orientation === "horizontal") {
        for (let i = column; i < column + length; i += 1) {
          grid[`square-${row}-${i}`].placeShipSegment();
          grid[`square-${row}-${i}`].changeShipSegmentType(type);
          shipsLocation.push([row, i]);
        }
      } else if (orientation === "vertical") {
        for (let i = row; i > row - length; i -= 1) {
          grid[`square-${i}-${column}`].placeShipSegment();
          grid[`square-${i}-${column}`].changeShipSegmentType(type);
          shipsLocation.push([i, column]);
        }
      }
    }
  };

  // Gameboard factory method to check if all ships are placed
  const allShipsPlaced = () => {
    for (let ship of ships) {
      if (ship.isPlaced() === false) {
        return false;
      }
    }
    return true;
  };

  // Gameboard factory method to check if all ships are sunk
  const allShipsSunk = () => {
    for (let ship of ships) {
      if (ship.isSunk() === false) {
        return false;
      }
    }
    return true;
  };

  // Function to get the length of the largest unsunk ship in the grid
  function largestUnsunkShipLength() {
    let maxLength = 2;
    for (let ship of ships) {
      if (ship.isSunk() === false && ship.length >= maxLength) {
        maxLength = ship.length;
      }
    }
    return maxLength;
  }

  // Function to return random row and column based on a pettern related to the largest unsunk ship
  function guessPattern(length = largestUnsunkShipLength()) {
    let row;
    let column;
    let stopLoop = false;
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
      if (grid[`square-${row}-${column}`].isShot() === false) {
        stopLoop = true;
      }
    }
    return [row, column];
  }

  // Function to return true if there are shot ship segments that belong to a ship that is unsunk yet
  function areThereUnsunkShotShipSegments() {
    const shotShipSegments = [];
    for (let key in grid) {
      if (grid[key].isShot() && grid[key].containsShipSegment()) {
        shotShipSegments.push(key);
      }
    }
    for (let key of shotShipSegments) {
      for (let ship of ships) {
        if (
          grid[key].getShipSegmentType() === ship.type &&
          ship.isSunk() === false
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Function to check if an array exists in an array of arrays // -1 if no // index of subarray otherwise
  function includesArray(array, arrayOfArrays) {
    let current;
    for (let i = 0; i < arrayOfArrays.length; i += 1) {
      if (array.length === arrayOfArrays[i].length) {
        current = arrayOfArrays[i];

        for (let j = 0; j < array.length && array[j] === current[j]; j += 1) {
          if (j === array.length - 1) {
            return i;
          }
        }
      }
    }
    return -1;
  }

  let targets = [];
  let targetsOfHigherProbabilty = [];

  function huntTarget() {
    // Reset the potential targets if all shot ships segments are sunk
    if (areThereUnsunkShotShipSegments() === false) {
      targets = [];
      targetsOfHigherProbabilty = [];
    }
    let row, column;
    // If targets is empty, enter hunt mode
    if (targets.length === 0) {
      [row, column] = guessPattern();
    } else if (targetsOfHigherProbabilty.length > 0) {
      // If targets is not empty, enter target mode, prioritize targets of higher probability
      [row, column] = targetsOfHigherProbabilty.pop();
      // Remove the selected high probability target from the regular targets array
      let index = includesArray([row, column], targets);
      targets.splice(index, 1);
    } else {
      // If targets is not empty, enter target mode (ie pop a target from targets)
      [row, column] = targets.pop();
    }
    // Check ship map
    if (grid[`square-${row}-${column}`].containsShipSegment() === true) {
      // Add all adjacent squares to list of potential targets where possible
      let potentialTargets = [
        [row + 1, column],
        [row, column + 1],
        [row - 1, column],
        [row, column - 1],
      ];
      for (let [targetRow, targetColumn] of potentialTargets) {
        if (
          // must be whithin grid
          1 <= targetRow &&
          targetRow <= 10 &&
          1 <= targetColumn &&
          targetColumn <= 10 &&
          // must not already be in targets array
          includesArray([targetRow, targetColumn], targets) < 0 &&
          // must not already be shot
          grid[`square-${targetRow}-${targetColumn}`].isShot() === false
        ) {
          targets.push([targetRow, targetColumn]);
        }
      }
      // After the targets logic loop is done, begin t.o.h.p logic loop
      // Determine potential targets of higher probability
      for (let [targetRow, targetColumn] of potentialTargets) {
        if (
          // must be within grid
          1 <= targetRow &&
          targetRow <= 10 &&
          1 <= targetColumn &&
          targetColumn <= 10 &&
          // must be already shot
          grid[`square-${targetRow}-${targetColumn}`].isShot() === true &&
          // must contain a ship segment
          grid[`square-${targetRow}-${targetColumn}`].containsShipSegment() ===
            true
        ) {
          let priorityRow = targetRow;
          let priorityColumn = targetColumn;
          for (let [r, c] of targets) {
            if (
              // current location and shot ship location must be adjacent
              ((row === priorityRow && r === row) ||
                (column === priorityColumn && c === column)) &&
              // must not already be in t.o.h.p
              includesArray([r, c], targetsOfHigherProbabilty) < 0 &&
              // must already be in targets
              includesArray([r, c], targets) >= 0
            ) {
              targetsOfHigherProbabilty.push([r, c]);
            }
          }
        }
      }
    }

    return [row, column];
  }

  return {
    grid,
    ships,
    isWithinGrid,
    doesNotOverlap,
    placeShip,
    shipsLocation,
    allShipsPlaced,
    allShipsSunk,
    huntTarget,
  };
};

export { GridSquare, Gameboard };
