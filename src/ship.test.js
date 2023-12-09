import Ship from "./ship";

describe("Ship", () => {
  it("returns null when created with 0 or less length", () => {
    expect(Ship(0)).toBe(null);
  });

  it("returns null when created with 6 or greater length", () => {
    expect(Ship(6)).toBe(null);
  });

  it("returns null when created with non number", () => {
    expect(Ship("c")).toBe(null);
  });

  it("returns null when created with non integer", () => {
    expect(Ship(2.4)).toBe(null);
  });
});

describe("hit", () => {
  it("increases number of hits when called", () => {
    expect(Ship(4).hit()).toBe(1);
  });

  it("increases number of hits when called multiple times", () => {
    const ship = Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.hit()).toBe(3);
  });
});

describe("isSunk", () => {
  it("returns false for a new ship", () => {
    expect(Ship(4).isSunk()).toBe(false);
  });

  it("returns false if hits less than length", () => {
    const ship = Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("returns true if hits equal length", () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
