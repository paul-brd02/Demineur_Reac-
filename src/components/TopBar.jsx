import React, { useState, useEffect } from 'react'

import "../style/topBar.css"

export default function TopBar() {

    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const [isGameStarted, setGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState("intermediaire")

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
        setDeadline(Date.now());
        setGameStarted(true);
    }

    const changeDifficulty = (e) => {
        setDifficulty(e.target.value);
        console.log(difficulty);
    }

    return (
        <div className="topBar">
            <div>
                <select name="difficulty" id="difficulty" onChange={changeDifficulty}>
                    <option value="debutant">9x9 cases, 10 bombes</option>
                    <option value="intemediaire" selected>16x16 cases, 40 bombes</option>
                    <option value="expert">22x22 cases, 100 bombes</option>
                    <option value="maitre">30x30 cases, 250 bombes</option>
                </select>
            </div>
            <div className='newGame'>
                <button onClick={handleClick}>
                    Nouvelle partie
                </button>
            </div>
            <div className='timer'>{minutes}:{secondes < 10 ? `0${secondes}` : secondes}</div>
        </div>
    );
}