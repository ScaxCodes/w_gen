'use client';

import styles from './page.module.css';
import packageJson from '../../package.json';
import React from 'react';
import { useGame } from '@/context/game.context';

type Player = {
  id: string;
  name: string;
  disabled: boolean;
};

export default function Home() {
  const {
    players,
    addPlayer,
    removePlayer,
    togglePlayer,
    rollDice,
    nextPlayer,
    resetGame,
    dice,
    currentPlayerId,
    history,
  } = useGame();
  const [newPlayerName, setNewPlayerName] = React.useState('');

  const addNewPlayer = () => {
    if (newPlayerName.trim() === '') {
      alert('Player name cannot be empty');
      return;
    }

    const existingPlayer = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (existingPlayer) {
      alert('Player with this name already exists');
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName,
      disabled: false,
    };
    addPlayer(newPlayer);
    setNewPlayerName('');
  };

  const getPlayerName = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      return player.name;
    } else {
      return 'Unknown Player';
    }
  };

  const currentPlayerName = getPlayerName(currentPlayerId || '');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.game}>
          <h1>Game</h1>
          <p>Current Player: {currentPlayerName}</p>
          <p>Dice: {dice.join(', ') || '-'}</p>
          <h2>Game Phase</h2>
          <p>{currentPlayerId ? 'Rolling' : 'Not Started'}</p>
          <div className={styles.buttonRow}>
            <button className={styles.button} onClick={rollDice}>
              Roll Dice
            </button>
            <button className={styles.button} onClick={nextPlayer}>
              Next Player
            </button>
            <button
              className={styles.button}
              style={{ backgroundColor: 'red' }}
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        </div>
        <div className={styles.playerList}>
          <h1>Player List</h1>
          <ul>
            {players.map((player, index) => (
              <li key={index} className={styles.player}>
                <span
                  style={{
                    fontWeight:
                      currentPlayerId === player.id ? 'bold' : 'normal',
                    textDecoration: player.disabled ? 'line-through' : 'none',
                  }}
                >
                  {player.name}
                </span>
                <button onClick={() => togglePlayer(player.id)}>
                  {player.disabled ? 'Enable' : 'Disable'}
                </button>
                <button onClick={() => removePlayer(player.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <label>
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addNewPlayer();
                }
              }}
              placeholder="Enter player name"
            />
            <button onClick={addNewPlayer}>Add Player</button>
          </label>
        </div>
        <div className={styles.history}>
          <h1>Game History</h1>
          <ul>
            {history.map(({ playerId, roll }, index) => {
              const diceRoll = roll.join(', ') || '-';
              return (
                <li key={index}>
                  {getPlayerName(playerId)}: {diceRoll}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <footer className={styles.footer}>WGen {packageJson.version}</footer>
    </div>
  );
}
