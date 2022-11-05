import { Gameboard } from "./gameboard";

const gameboard1 = Gameboard();

test("Gameboard grid has 100 squares", () => {
  let items = Object.keys(gameboard1.grid);
  expect(items.length).toBe(100);
});

test("Ship horizontal placement whithin grid", () => {
  const result = gameboard1.isWithinGrid(9, 6, 5, "horizontal");
  expect(result).toBe(true);
});

test("Ship horizontal placement outside grid", () => {
  const result = gameboard1.isWithinGrid(9, 7, 5, "horizontal");
  expect(result).toBe(false);
});

test("Ship vertical placement whithin grid", () => {
  const result = gameboard1.isWithinGrid(7, 2, 5, "vertical");
  expect(result).toBe(true);
});

test("Ship vertical placement outside grid", () => {
  const result = gameboard1.isWithinGrid(4, 2, 5, "vertical");
  expect(result).toBe(false);
});
