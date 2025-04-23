export const throwDices = (diceCount: number, sides: number): number[] => {
  const dices = [];
  for (let i = 0; i < diceCount; i++) {
    dices.push(Math.floor(Math.random() * sides) + 1);
  }
  return dices;
};

export enum DiceResult {
  'PLAYER_3ER_MANN',
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

  const [lowestRoll, highestRoll] = diceResults.sort();

  if (lowestRoll + highestRoll === 3) {
    return DiceResult.PLAYER_3ER_MANN; // Player becomes the new 3er Mann.
  }

  if (lowestRoll === 3 && highestRoll === 3) {
    return DiceResult.DREIER_PASCH; // Dreier Pasch!
  }

  if (lowestRoll === highestRoll) {
    return DiceResult.PASCH; // Pasch!
  }

  if (lowestRoll + highestRoll === 7) {
    return DiceResult.LINKS_TRINK; // Links trink!
  }

  //   if (lowestRoll+ highestRoll === 9) {
  //     return DiceResult.RECHTS_TRINK;
  //   }

  if (lowestRoll + highestRoll === 11) {
    return DiceResult.RECHTS_TRINK;
  }

  return DiceResult.NO_RULE; // No special rule applies
};
