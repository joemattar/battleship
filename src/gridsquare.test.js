import { GridSquare } from "./gridsquare";

const testGridSquare = GridSquare();
testGridSquare.row = 4;
testGridSquare.column = 5;

test("return grid square row", () => {
  expect(testGridSquare.row).toBe(4);
});

test("return grid square column", () => {
  expect(testGridSquare.column).toBe(5);
});

test("Grid square initial content", () => {
  expect(testGridSquare.containsShipSegment()).toBe(false);
});

test("Grid square content change", () => {
  testGridSquare.placeShipSegment();
  expect(testGridSquare.containsShipSegment()).toBe(true);
});

test("Grid square initial content type", () => {
  expect(testGridSquare.getShipSegmentType()).toBe(null);
});

test("Grid square content type change", () => {
  testGridSquare.changeShipSegmentType("carrier");
  expect(testGridSquare.getShipSegmentType()).toBe("carrier");
});

test("Grid square content type second change", () => {
  testGridSquare.changeShipSegmentType("battleship");
  expect(testGridSquare.getShipSegmentType()).toBe("battleship");
});

test("Grid square initial shot status", () => {
  expect(testGridSquare.isShot()).toBe(false);
});

test("Grid square shot status change", () => {
  testGridSquare.placeShot();
  expect(testGridSquare.isShot()).toBe(true);
});
