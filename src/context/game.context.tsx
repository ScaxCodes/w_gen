'use client';

import React, { createContext, useContext, useState } from 'react';

export type Player = {
  id: string;
  name: string;
  disabled: boolean;
};

type DiceRoll = [] | [number, number];

type GameState = {
  players: Player[];
  currentPlayerId: string | null;
  dice: DiceRoll;
  gamePhase: 'not_started' | 'rolling' | 'ended';
  history: { playerId: string; roll: DiceRoll }[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  togglePlayer: (id: string) => void;
  rollDice: () => void;
  nextPlayer: () => void;
  resetGame: () => void;
};

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [dice, setDice] = useState<DiceRoll>([]);
  const [gamePhase, setGamePhase] = useState<
    'not_started' | 'rolling' | 'ended'
  >('not_started');
  const [history, setHistory] = useState<
    { playerId: string; roll: DiceRoll }[]
  >([]);

  const addPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePlayer = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, disabled: !p.disabled } : p))
    );
  };

  const rollDice = () => {
    const newRoll: DiceRoll = [
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
    ];
    setDice(newRoll);
    if (currentPlayerId) {
      setHistory((prev) => [
        ...prev,
        { playerId: currentPlayerId, roll: newRoll },
      ]);
    }
    setGamePhase('rolling');
  };

  const getActivePlayers = () => players.filter((p) => !p.disabled);

  const getLeftPlayer = () => {
    const activePlayers = getActivePlayers();
    if (activePlayers.length === 0) {
      return null;
    }

    const currentIndex = activePlayers.findIndex(
      (p) => p.id === currentPlayerId
    );
    const leftIndex =
      (currentIndex - 1 + activePlayers.length) % activePlayers.length;
    return activePlayers[leftIndex];
  };

  const getRightPlayer = () => {
    const activePlayers = getActivePlayers();
    if (activePlayers.length === 0) {
      return null;
    }

    const currentIndex = activePlayers.findIndex(
      (p) => p.id === currentPlayerId
    );
    const rightIndex = (currentIndex + 1) % activePlayers.length;
    return activePlayers[rightIndex];
  };

  const nextPlayer = () => {
    const activePlayers = getActivePlayers();
    if (activePlayers.length === 0) {
      setCurrentPlayerId(null);
      return;
    }

    const currentIndex = activePlayers.findIndex(
      (p) => p.id === currentPlayerId
    );
    const nextIndex = (currentIndex + 1) % activePlayers.length;
    setCurrentPlayerId(activePlayers[nextIndex].id);
  };

  const resetGame = () => {
    setDice([]);
    setHistory([]);
    setGamePhase('not_started');
    setCurrentPlayerId(players.find((p) => !p.disabled)?.id || null);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        currentPlayerId,
        dice,
        gamePhase,
        history,
        addPlayer,
        removePlayer,
        togglePlayer,
        rollDice,
        nextPlayer,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
