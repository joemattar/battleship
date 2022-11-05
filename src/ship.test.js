import { Ship } from "./ship";

const carrier = Ship(0);

test("Ship length is correct", () => {
  expect(carrier.length).toBe(5);
});

test("Ship initial orientation", () => {
  expect(carrier.getOrientation()).toBe("horizontal");
});

test("Ship first orientation change", () => {
  carrier.changeOrientation();
  expect(carrier.getOrientation()).toBe("vertical");
});

test("Ship second orientation change", () => {
  carrier.changeOrientation();
  expect(carrier.getOrientation()).toBe("horizontal");
});

test("Ship initial placement status", () => {
  expect(carrier.isPlaced()).toBe(false);
});

test("Ship placement status changes to true", () => {
  carrier.place();
  expect(carrier.isPlaced()).toBe(true);
});

test("Ship is initially not sunk", () => {
  expect(carrier.isSunk()).toBe(false);
});

test("Ship can be hit if not sunk", () => {
  if (carrier.isSunk() === false) {
    expect(carrier.hit()).toBe(true);
  }
});

const destroyer = Ship(1);

test("Ship can sink if hit enough", () => {
  let hitNumber = 0;
  while (destroyer.isSunk() === false) {
    destroyer.hit();
    hitNumber += 1;
  }
  expect(destroyer.length).toBe(hitNumber);
});
