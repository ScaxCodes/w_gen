export const throwDices = (diceCount: number, sides: number): number[] => {
  const dices = [];
  for (let i = 0; i < diceCount; i++) {
    dices.push(Math.floor(Math.random() * sides) + 1);
  }
  return dices;
};

export enum DiceResult {
  'HOMER',
  'DREIER_PASCH',
  'PASCH',
  'LINKS_TRINK',
  'RECHTS_TRINK',
  'NO_RULE',
}

export const mapDiceResults = (diceResults: number[]): DiceResult => {
  if (diceResults.length !== 2) {
    throw new Error('Invalid input: exactly two dice results are required.');
  }

  const [lowestRoll, highestRoll] = diceResults.sort((a, b) => a - b);
  const sum = lowestRoll + highestRoll;

  if (lowestRoll === 3 && highestRoll === 3) {
    return DiceResult.DREIER_PASCH;
  } else if (lowestRoll === highestRoll) {
    return DiceResult.PASCH;
  } else if (sum === 3) {
    return DiceResult.HOMER;
  } else if (sum === 7) {
    return DiceResult.LINKS_TRINK;
  } else if (sum === 11) {
    return DiceResult.RECHTS_TRINK;
  } else {
    return DiceResult.NO_RULE;
  }
};
