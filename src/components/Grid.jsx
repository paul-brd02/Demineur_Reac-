import React, { useState, useEffect, useContext } from 'react';
import Case from "./Case.jsx"

export default function Grid({ size, bombs, setGameStarted, triggerGrid, onFlagsUpdate, flags, addVictrory }) {

  const [gridIsRevealed, setGridIsRevealed] = useState(false)

  const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < size; row++) {
      const currentRow = [];
      for (let col = 0; col < size; col++) {
        currentRow.push({
          x: row,
          y: col,
          value: '',
          isRevealed: false,
          hasMine: false,
          hasFlag: false,
        });
      }
      grid.push(currentRow);
    }

    // Placer les mines aléatoirement
    let placedMines = 0;
    while (placedMines < bombs) {
      const randomRow = Math.floor(Math.random() * size);
      const randomCol = Math.floor(Math.random() * size);
      if (!grid[randomRow][randomCol].hasMine) {
        grid[randomRow][randomCol].hasMine = true;
        placedMines++;
      }
    }

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let minesAround = 0;
        // Vérifier les 8 cases autour de la case actuelle
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              row + i >= 0 &&
              row + i < size &&
              col + j >= 0 &&
              col + j < size &&
              grid[row + i][col + j].hasMine
            ) {
              minesAround++;
            }
          }
        }
        if (!grid[row][col].hasMine) {
          grid[row][col].value = minesAround.toString();
        }
      }
    }

    return grid;
  }

  const [grid, setGrid] = useState(initializeGrid());

  useEffect(() => {
    setGrid((initializeGrid()));
    setGridIsRevealed(false)
  }, [size, bombs, triggerGrid]);

  //quand je clique, regarde si y'a une bomb, après si y'a pas de bombs mettre revélé a true et après on fait un update (créer update)

  const handleSquareClick = (x, y) => {
    if (!gridIsRevealed) {
      setGameStarted(true)
      if (grid[y][x].hasFlag) {
        return
      }
      const newGrid = [...grid];
      if (newGrid[y][x].hasMine) {
        alert("Vous avez perdu!");
        // Tout révéler
        setGrid(revealAllGrid(newGrid))
        setGameStarted(false)
      }
      else {
        if (newGrid[y][x].value === '0') {
          revealEmptySquares(x, y, newGrid);
        }

        newGrid[y][x].isRevealed = true;
        setGrid(newGrid)

        // retirer
        addVictrory()

        if (victoryConditions()) {
          setGameStarted(false)
          alert("Vous avez gagné !")
          revealAllGrid(newGrid)
          // ajouter win ici
          addVictrory()
        }
      }
    }
  }

  const revealAllGrid = (newGrid) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        newGrid[row][col].isRevealed = true;
      }
    }
    onFlagsUpdate(0)
    setGridIsRevealed(true)
    return newGrid
  }

  const victoryConditions = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col].hasMine === false && grid[row][col].isRevealed === false) {
          return false
        }
      }
    }
    return true
  }

  const revealEmptySquares = (x, y, newGrid) => {

    if (coordinateInGrid(x, y) && newGrid[y][x].value === '0' && !newGrid[y][x].isRevealed) {

      newGrid[y][x].isRevealed = true;
      newGrid[y][x].hasFlag = false;
      revealAdjacentSquares(x, y, newGrid);

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const row = y + i;
          const col = x + j;
          revealEmptySquares(col, row, newGrid);
        }
      }
      countFlags();
    }
  }

  const countFlags = () => {

    let total = 0;

    for(let row of grid) {
      for(let cell of row) {
        if(cell.hasFlag == true) {
          total++;
        }
      }
    }

    onFlagsUpdate(bombs - total);
  }

  function coordinateInGrid(x, y) {
    return (x >= 0 && x < size && y >= 0 && y < size)
  }

  const revealAdjacentSquares = (x, y, newGrid) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const row = y + i;
        const col = x + j;
        if (
          row >= 0 &&
          row < size &&
          col >= 0 &&
          col < size &&
          !newGrid[row][col].hasMine &&
          newGrid[row][col].value !== '' &&
          newGrid[row][col].value !== '0' &&
          !newGrid[row][col].isRevealed
        ) {
          newGrid[row][col].isRevealed = true;
          newGrid[row][col].hasFlag = false;
        }
      }
    }
  }

  const handleRightClick = (event, x, y) => {
    event.preventDefault();
    setGameStarted(true)
    putFlag(x, y)
  };

  function putFlag(x, y) {
    if (grid[y][x].isRevealed) {
      return
    }
    const newGrid = JSON.parse(JSON.stringify(grid));

    if (newGrid[y][x].hasFlag == true) {

      onFlagsUpdate(flags + 1)
    }
    else {
      onFlagsUpdate(flags - 1)
    }
    newGrid[y][x].hasFlag = !newGrid[y][x].hasFlag
    setGrid(newGrid)
  }

  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${size}, 1fr)`, userSelect: "none" }}>
      {grid.map((row, rowIndex) => (
        row.map((caseData, colIndex) => (
          <Case
            key={colIndex}
            value={caseData.value}
            isRevealed={caseData.isRevealed}
            hasMine={caseData.hasMine}
            hasFlag={caseData.hasFlag}
            onClick={() => handleSquareClick(caseData.y, caseData.x)}
            rightClick={(event) => handleRightClick(event, caseData.y, caseData.x)}
            size={size}
          />
        ))
      ))}
    </div>
  );
}