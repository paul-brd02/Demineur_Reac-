import { Difficulty } from '../types/enum.ts'

import "../style/grid.css"

export default function Grid({ mode }) {

    let size, bombs;

    switch (mode) {
        case Difficulty.DEBUTANT:
            size = 9
            bombs = 10;
            break;
        case Difficulty.INTERMEDIARE:
            size = 16
            bombs = 40;
            break;
        case Difficulty.EXPERT:
            size = 22
            bombs = 100;
            break;
        case Difficulty.MAITRE:
            size = 30
            bombs = 250;
            break;
        default:
            size = 0
            break;
    }

    const buttons = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(<button className='case' key={j}></button>);
        }
        buttons.push(<div key={i}>{row}</div>);
    }

    return <div>{buttons}</div>;

}