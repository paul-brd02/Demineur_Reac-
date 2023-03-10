import { createContext } from 'react';

export const GameContext = createContext({
  gameResults: [],
  addGameResult: (newResult) => {}
});