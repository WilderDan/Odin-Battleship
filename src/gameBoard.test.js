import GameBoard from "./gameBoard";

describe("placeShip", () => {
  it("places ship at specific coordinates horizontally", () => {
    expect(GameBoard().placeShip([0, 0], 3)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("places ship at specific coordinates vertically", () => {
    expect(GameBoard().placeShip([2, 3], 3, true)).toEqual([
      [2, 3],
      [3, 3],
      [4, 3],
    ]);
  });

  it("won't place ships out of lower x bounds", () => {
    expect(GameBoard().placeShip([-1, 0], 3)).toBe(null);
  });

  it("won't place ships out of upper x bounds", () => {
    expect(GameBoard().placeShip([10, 0], 3)).toBe(null);
  });

  it("won't place ships out of lower y bounds", () => {
    expect(GameBoard().placeShip([2, -1], 3)).toBe(null);
  });

  it("won't place ships out of upper y bounds", () => {
    expect(GameBoard().placeShip([2, 10], 3)).toBe(null);
  });

  it("won't place ships over existing ship", () => {
    const board = GameBoard();
    board.placeShip([3, 3], 2);

    expect(board.placeShip([2, 3], 2, true)).toBe(null);
  });
});

describe("receiveAttack", () => {
  it("returns true if attack hits", () => {
    const board = GameBoard();
    board.placeShip([3, 3], 3);
    expect(board.receiveAttack([3, 4])).toBe(true);
  });

  it("returns false if attack misses", () => {
    const board = GameBoard();
    board.placeShip([3, 3], 3);
    expect(board.receiveAttack([4, 3])).toBe(false);
  });

  it("returns null on invalid attack position", () => {
    const board = GameBoard();
    board.placeShip([3, 3], 3);
    expect(board.receiveAttack([44, 3])).toBe(null);
  });
});

describe("isAllSunk", () => {
  it("returns false if all ships are not sunk (1)", () => {
    const board = GameBoard();
    board.placeShip([0, 0], 1);
    expect(board.isAllSunk()).toBe(false);
  });

  it("eturns false if all ships are not sunk (2)", () => {
    const board = GameBoard();
    board.placeShip([0, 0], 1);
    board.placeShip([0, 1], 1);
    board.receiveAttack([0, 0]);
    expect(board.isAllSunk()).toBe(false);
  });

  it("returns true if all ships are sunk", () => {
    const board = GameBoard();
    board.placeShip([0, 0], 1);
    board.receiveAttack([0, 0]);
    expect(board.isAllSunk()).toBe(true);
  });
});
