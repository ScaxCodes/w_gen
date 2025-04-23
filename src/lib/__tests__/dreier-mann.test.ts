import { mapDiceResults, DiceResult, throwDices } from './../dreier-mann'; // Replace with the actual module path

describe('throwDices', () => {
  it('should return an array of correct length and values within dice range', () => {
    const diceCount = 5;
    const sides = 6;
    const result = throwDices(diceCount, sides);

    expect(result).toHaveLength(diceCount);
    result.forEach((roll) => {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(sides);
    });
  });
});

describe('mapDiceResults', () => {
  it('should throw an error if the input does not have exactly two dice results', () => {
    expect(() => mapDiceResults([])).toThrow(
      'Invalid input: exactly two dice results are required.'
    );
    expect(() => mapDiceResults([1])).toThrow(
      'Invalid input: exactly two dice results are required.'
    );
    expect(() => mapDiceResults([1, 2, 3])).toThrow(
      'Invalid input: exactly two dice results are required.'
    );
  });

  it('should return HOMER for dice sum of 3', () => {
    expect(mapDiceResults([1, 2])).toBe(DiceResult.HOMER);
    expect(mapDiceResults([2, 1])).toBe(DiceResult.HOMER);
  });

  it('should return DREIER_PASCH for two 3s', () => {
    expect(mapDiceResults([3, 3])).toBe(DiceResult.DREIER_PASCH);
  });

  it('should return PASCH for any doubles (except double 3s)', () => {
    expect(mapDiceResults([1, 1])).toBe(DiceResult.PASCH);
    expect(mapDiceResults([2, 2])).toBe(DiceResult.PASCH);
    expect(mapDiceResults([4, 4])).toBe(DiceResult.PASCH);
    expect(mapDiceResults([5, 5])).toBe(DiceResult.PASCH);
    expect(mapDiceResults([6, 6])).toBe(DiceResult.PASCH);
  });

  it('should return LINKS_TRINK for sum of 7', () => {
    expect(mapDiceResults([1, 6])).toBe(DiceResult.LINKS_TRINK);
    expect(mapDiceResults([3, 4])).toBe(DiceResult.LINKS_TRINK);
    expect(mapDiceResults([2, 5])).toBe(DiceResult.LINKS_TRINK);
  });

  it('should return RECHTS_TRINK for roll of 5 and 6', () => {
    expect(mapDiceResults([5, 6])).toBe(DiceResult.RECHTS_TRINK);
    expect(mapDiceResults([6, 5])).toBe(DiceResult.RECHTS_TRINK);
  });

  it('should return NO_RULE for any other combinations', () => {
    expect(mapDiceResults([1, 4])).toBe(DiceResult.NO_RULE);
    expect(mapDiceResults([2, 6])).toBe(DiceResult.NO_RULE);
    expect(mapDiceResults([2, 2])).not.toBe(DiceResult.DREIER_PASCH);
  });
});
