import React, { createContext, useContext, useState } from 'react';

import Grid from './components/Grid';
import TopBar from './components/TopBar';
import './style/App.css';
import { Difficulty } from './types/enum.ts';

function App() {

  const [mode, setMode] = useState(Difficulty.DEBUTANT);

  return (
    <div className="App">
      <div className='colonne'>
        <TopBar setMode={setMode} />
        <div className='grid'>
          <h1>Démineur</h1>
          <Grid mode={mode} />
        </div>
      </div>
    </div>
  );
}
export default App;
