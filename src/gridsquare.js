const GridSquare = () => {
  let row;
  let column;
  let shipSegment = false;
  let shipSegmentType = null;
  let shotStatus = false;

  // GridSquare factory method to check if the square contains a ship segment
  const containsShipSegment = () => {
    return shipSegment;
  };

  // GridSquare factory method to place a ship segment in the square
  const placeShipSegment = () => {
    shipSegment = true;
  };

  // GridSquare factory method to return the square's ship segment type (null for no ship segment)
  const getShipSegmentType = () => {
    return shipSegmentType;
  };

  // GridSquare factory method to assign to the square a ship segment type
  const changeShipSegmentType = (shipType) => {
    shipSegmentType = shipType;
  };

  // GridSquare factory method to check if the square has been shot
  const isShot = () => {
    return shotStatus;
  };

  // GridSquare factory method to change the square shot status to true
  const placeShot = () => {
    shotStatus = true;
  };

  return {
    row,
    column,
    containsShipSegment,
    placeShipSegment,
    getShipSegmentType,
    changeShipSegmentType,
    isShot,
    placeShot,
  };
};

export { GridSquare };
