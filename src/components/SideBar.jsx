import React, { useState, useEffect } from 'react'

import "../style/sideBar.css"
import { Difficulty } from '../types/enum.ts'
import Mode from '../utility/mode.ts'
import Flag from '../cell/flag.png'

export default function TopBar({ setSize, setBombs, gameStarted, setGameStarted, onTriggerUpdate, flags }) {

    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const [mode, setMode] = useState(Difficulty.DEBUTANT)

    useEffect(() => {
        if (gameStarted) {
            let interval = setInterval(() => {
                setSecondes(secondes + 1)
                if (secondes === 60) {
                    setMinutes(minutes + 1)
                    setSecondes(0)
                }
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        };
        
    }, [gameStarted, minutes, secondes]);

    const handleClick = () => {
        setMinutes(0)
        setSecondes(0)

        setGameStarted(true);

        let gameMode = Mode(mode)
        setSize(gameMode.size)
        setBombs(gameMode.bombs)

        onTriggerUpdate()
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
            <div className='gameInfoFlag'>
                <img src={Flag} alt="Nombre de drapeau restant par rapport aux nombres de mines" style={{maxHeight:'40px'}} /><span style={{marginLeft:'10px', fontSize:'2em', color:'white'}}>{flags}</span>
            </div>
        </div>
    );
}