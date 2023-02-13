import React, { createContext, useContext, useState, useEffect } from 'react';

import Grid from './components/Grid';
import SideBar from './components/SideBar';
import './style/App.css';
import { Difficulty } from './types/enum.ts';
import Mode from './utility/mode.ts'

function App() {
  const startGame = Mode(Difficulty.DEBUTANT)
  const [size, setSize] = useState(startGame.size);
  const [bombs, setBombs] = useState(startGame.bombs);

  return (
    <div className="App">
      <div className='colonne'>
        <SideBar
          size={size}
          setSize={setSize}
          setBombs={setBombs}
        />
        <div className='grid'>
          <div className='title'><h1>Démineur</h1></div>
          <Grid
            size={size}
            bombs={bombs}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
