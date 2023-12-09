import Ship from "./ship";

function GameBoard() {
  const GRID_SIZE = 9;
  const ships = [];
  const positionsToShip = new Map();
  const missedShots = [];

  // Public
  function placeShip(start, length, isVertical = false) {
    const list = getCoordinates(start, length, isVertical);
    if (!isValidPlacement(list)) return null;

    const ship = Ship(length);
    ships.push(ship);
    list.forEach((pos) => {
      positionsToShip.set(getKey(pos), ship);
    });

    return list;
  }

  function receiveAttack(position) {
    if (!isValidPosition(position)) return null;

    const ship = positionsToShip.get(getKey(position));
    const isHit = ship ? true : false;

    if (isHit) {
      ship.hit();
    } else {
      missedShots.push(position);
    }

    return isHit;
  }

  function isAllSunk() {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }

  // Private
  function getCoordinates(start, length, isVertical) {
    const list = [start];

    for (let i = 1; i < length; i++) {
      const prev = list[i - 1];
      const next = isVertical ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1];
      list.push(next);
    }

    return list;
  }

  function isValidPlacement(coordinateList) {
    for (let pos of coordinateList) {
      // out of bounds
      if (!isValidPosition(pos)) return false;

      // ship already exists
      if (positionsToShip.get(getKey(pos)) !== undefined) return false;
    }

    return true;
  }

  function isValidPosition(pos) {
    return (
      pos[0] >= 0 && pos[0] <= GRID_SIZE && pos[1] >= 0 && pos[1] <= GRID_SIZE
    );
  }

  function getKey(pos) {
    return `${pos[0]},${pos[1]}`;
  }

  return { placeShip, receiveAttack, isAllSunk };
}

export default GameBoard;
