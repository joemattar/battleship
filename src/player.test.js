import { Player } from "./player";

const player1 = Player();

test("Player is created  being human", () => {
  expect(player1.getType()).toBe("human");
});

test("Change Player type once", () => {
  player1.changeType();
  expect(player1.getType()).toBe("ai");
});

test("Change Player type twice", () => {
  player1.changeType();
  expect(player1.getType()).toBe("human");
});
