import React, { useState, useEffect } from 'react'

import "../style/topBar.css"
import { Difficulty } from '../types/enum.ts'
import Mode from '../utility/mode.ts'

export default function TopBar({ size, setSize, setBombs }) {

    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const [isGameStarted, setGameStarted] = useState(false);
    const [mode, setMode] = useState(Difficulty.DEBUTANT)
    const [deadline, setDeadline] = useState()

    const getTime = () => {
        const time = -(deadline - Date.now());
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSecondes(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        if (isGameStarted) {
            const interval = setInterval(() => getTime(), 1000);

            return () => clearInterval(interval);
        };

    }, [isGameStarted, deadline]);

    const handleClick = () => {
        let restart = Mode("")
        setSize(restart.size)
        setBombs(restart.bombs)


        setDeadline(Date.now());
        setGameStarted(true);
        let gameMode = Mode(mode)
        setSize(gameMode.size)
        setBombs(gameMode.bombs)
    }

    return (
        <div className="topBar">
            <div>
                <select name="difficulty" id="difficulty" onChange={(e) => setMode(() => e.target.value)} style={{ borderRadius: '5px' }}>
                    <option value={Difficulty.DEBUTANT}>9x9 cases, 10 bombes</option>
                    <option value={Difficulty.INTERMEDIARE}>16x16 cases, 40 bombes</option>
                    <option value={Difficulty.EXPERT}>22x22 cases, 100 bombes</option>
                    <option value={Difficulty.MAITRE}>30x30 cases, 250 bombes</option>
                </select>
            </div>
            <div className='newGame'>
                <button onClick={handleClick} style={{ borderRadius: '5px', border: 'none' }}>
                    Nouvelle partie
                </button>
            </div>
            <div className='timer'>{minutes}:{secondes < 10 ? `0${secondes}` : secondes}</div>
        </div>
    );
}