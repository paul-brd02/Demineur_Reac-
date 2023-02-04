import React, { createContext, useContext, useState, useEffect } from 'react';

import Grid from './components/Grid';
import TopBar from './components/TopBar';
import './style/App.css';
import { Difficulty } from './types/enum.ts';

function App() {

  const [mode, setMode] = useState(Difficulty.DEBUTANT);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (restart) {
      setRestart(false)
    };
  }, [restart]);

  return (
    <div className="App">
      <div className='colonne'>
        <TopBar setMode={setMode} setRestart={setRestart} />
        <div className='grid'>
          <div className='title'><h1>Démineur</h1></div>
          <Grid mode={mode} restart={restart} />
        </div>
      </div>
    </div>
  );
}
export default App;
