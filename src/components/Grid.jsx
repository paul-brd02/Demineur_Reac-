import { Difficulty } from '../types/enum.ts'

import "../style/grid.css"

export default function Grid({ mode, restart }) {
    let gridSize, bombs;

    switch (mode) {
        case Difficulty.DEBUTANT:
            gridSize = 9
            bombs = 10;
            break;
        case Difficulty.INTERMEDIARE:
            gridSize = 16
            bombs = 40;
            break;
        case Difficulty.EXPERT:
            gridSize = 22
            bombs = 100;
            break;
        case Difficulty.MAITRE:
            gridSize = 30
            bombs = 250;
            break;
        default:
            gridSize = 0
            break;
    }

    let bombsPosition = [];

    while (bombsPosition.length < bombs) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        let bombCoords = [row, col];
        if (!bombsPosition.some(coord => coord[0] === row && coord[1] === col)) {
            bombsPosition.push(bombCoords);
        }
    }

    const countAdjacentBombs = (gridSize, bombsPosition, row, col) => {
        let bombCount = 0;
        for (let rowDelta = -1; rowDelta <= 1; rowDelta++) {
            for (let colDelta = -1; colDelta <= 1; colDelta++) {
                if (bombsPosition.some(([r, c]) => r === (row + rowDelta) && c === (col + colDelta))) {
                    bombCount++;
                }
            }
        }
        return bombCount;
    };
    
    const buttons = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            let bombCount = countAdjacentBombs(gridSize, bombsPosition, i, j);
            if (bombsPosition.some(([r, c]) => r === i && c === j)) {
                row.push(<button className='case' key={j}>b</button>)
            } else if (bombCount > 0) {
                row.push(<button className='case' key={j}>{bombCount}</button>)
            } else {
                row.push(<button className='case' key={j}></button>)
            }
        }
        buttons.push(<div key={i}>{row}</div>);
    }

    return <div>{buttons}</div>;

}