import React, { useState, useEffect } from 'react';

import Grid from './components/Grid';
import SideBar from './components/SideBar';
import './style/App.css';
import { Difficulty } from './types/enum.ts';
import Mode from './utility/mode.ts'

function App() {
  const startGame = Mode(Difficulty.DEBUTANT)
  const [size, setSize] = useState(startGame.size)
  const [bombs, setBombs] = useState(startGame.bombs)
  const [gameStarted, setGameStarted] = useState(false)
  const [triggerGrid, setTriggerGrid] = useState(false)
  const [flags, setFlags] = useState(bombs)

  useEffect(() => {
    setFlags(bombs)
  }, [bombs]);

  const onTriggerUpdate = () => {
    setTriggerGrid(!triggerGrid)
  }

  const onFlagsUpdate = (add) => {

    if (add)
      setFlags(flags + 1)
    else
      setFlags(flags - 1)
    return true
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
      />
      <div className='grid'>
        <div className='title'><h1>Démineur</h1></div>
        <Grid
          size={size}
          bombs={bombs}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          triggerGrid={triggerGrid}
          onFlagsUpdate={onFlagsUpdate}
        />
      </div>
    </div>
  );
}
export default App;
