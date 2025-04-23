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
  const sum = lowestRoll + highestRoll;

  switch (true) {
    case lowestRoll === 3 && highestRoll === 3:
      return DiceResult.DREIER_PASCH;

    case lowestRoll === highestRoll:
      return DiceResult.PASCH;

    case sum === 3:
      return DiceResult.PLAYER_3ER_MANN;

    case sum === 7:
      return DiceResult.LINKS_TRINK;

    case sum === 11:
      return DiceResult.RECHTS_TRINK;

    default:
      return DiceResult.NO_RULE;
  }
};
