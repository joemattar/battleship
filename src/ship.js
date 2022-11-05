// Array with objects representing a ship name/type and corresponding length
const shipTypes = [
  { type: "carrier", length: 5 },
  { type: "battleship", length: 4 },
  { type: "cruiser", length: 3 },
  { type: "submarine", length: 3 },
  { type: "destroyer", length: 2 },
];

// Ship factory
const Ship = (index) => {
  const type = shipTypes[index].type;
  const length = shipTypes[index].length;

  let orientation = "horizontal";
  let placed = false;
  let hits = 0;

  // Ship factory method to get the ship orientation
  const getOrientation = () => {
    return orientation;
  };

  // Ship factory method to change the orientation of a ship instance between horizontal/vertical
  const changeOrientation = () => {
    if (orientation === "horizontal") {
      orientation = "vertical";
    } else {
      orientation = "horizontal";
    }
  };

  // Ship factory method to get the ship placement status
  const isPlaced = () => {
    return placed;
  };

  // Ship factory method to change the ship placement status to true
  const place = () => {
    placed = true;
  };

  // Ship factory method to add a hit to a ship instance if not sunk
  const hit = () => {
    if (isSunk()) {
      return false;
    }
    hits += 1;
    return true;
  };

  // Ship factory method to check if a ship instance is sunk
  const isSunk = () => {
    if (hits === length) {
      return true;
    }
    return false;
  };

  return {
    type,
    length,
    getOrientation,
    changeOrientation,
    isPlaced,
    place,
    hit,
    isSunk,
  };
};

export { Ship, shipTypes };
