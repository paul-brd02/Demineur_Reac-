import React, { useState, useEffect, createContext } from 'react';

import Grid from './Grid';
import SideBar from './SideBar';
import { Difficulty } from '../types/enum.ts';
import Mode from '../utility/mode.ts';
import '../style/App.css'

function GameContainer() {
  const startGame = Mode(Difficulty.DEBUTANT)
  const [size, setSize] = useState(startGame.size)
  const [bombs, setBombs] = useState(startGame.bombs)
  const [gameStarted, setGameStarted] = useState(false)
  const [triggerGrid, setTriggerGrid] = useState(false)
  const [flags, setFlags] = useState(bombs)
  const [addVictory, triggerAddVictrory] = useState(0)

  useEffect(() => {
    setFlags(bombs)
  }, [bombs]);

  const onTriggerUpdate = () => {
    setTriggerGrid(!triggerGrid)
  }

  const onFlagsUpdate = (number) => {
    setFlags(number)
  }

  const addVictrory = () => {
    triggerAddVictrory(addVictory => addVictory + 1)
  }

  return (
    <div className="App">
      <SideBar
        setSize={setSize}
        setBombs={setBombs}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        onTriggerUpdate={onTriggerUpdate}
        flags={flags}
        addVictory={addVictory}
      />
      <div className='grid'>
        <h1 className='title'>Démineur</h1>
        <Grid
          size={size}
          bombs={bombs}
          setGameStarted={setGameStarted}
          triggerGrid={triggerGrid}
          onFlagsUpdate={onFlagsUpdate}
          flags={flags}
          addVictrory={addVictrory}
        />
      </div>
    </div>
  );
}
export default GameContainer;