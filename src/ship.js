function Ship(length) {
  if (!Number.isInteger(length)) return null;
  if (length <= 0) return null;
  if (length >= 6) return null;

  let timesHit = 0;

  function hit() {
    return ++timesHit;
  }

  function isSunk() {
    return timesHit >= length;
  }

  return { hit, isSunk };
}

export default Ship;
