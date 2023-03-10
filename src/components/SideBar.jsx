import React, { useState, useEffect, useContext } from 'react'

import "../style/sideBar.css"
import { Difficulty } from '../types/enum.ts'
import Mode from '../utility/mode.ts'
import Flag from '../cell/flag.png'

export default function TopBar({ setSize, setBombs, gameStarted, setGameStarted, onTriggerUpdate, flags, addVictory }) {

    const localStorageGameResultsKey = "game-results";

    const [gameResults, setGameResults] = useState(JSON.parse(localStorage.getItem(localStorageGameResultsKey)));
    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const [mode, setMode] = useState(Difficulty.DEBUTANT)


    useEffect(() => {
        AppLoadStorage();
    }, []);

    useEffect(() => {
        if (gameResults !== null) {
            localStorage.setItem(localStorageGameResultsKey, JSON.stringify(gameResults));
        }
    }, [gameResults]);

    const AppLoadStorage = () => {
        const newValue = localStorage.getItem(localStorageGameResultsKey)
        if (newValue) {
            /* setGameResults(JSON.parse(newValue)) */;
        } else {
            setGameResults([]);
            localStorage.setItem(localStorageGameResultsKey, JSON.stringify([]));
        }
    };

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

    useEffect(() => {
        if (secondes > 1) {
            newVictory();
        }
    }, [addVictory])

    const newVictory = () => {

        const pseudo = prompt("Tu as gagné ! Entre donc donc pseudo !")

        if (pseudo !== null && pseudo !== "") {
            addGameResult({
                time: Number(`${minutes.toString()}.${secondes.toString().length < 2 ? 0 : ""}${secondes.toString()}`),
                mode: mode.toString().toLowerCase(),
                pseudo: pseudo
            })
        }
    }

    const addGameResult = (newResult) => {
        setGameResults(gameResults => [...gameResults, newResult]);
    }

    const handleClick = () => {
        setMinutes(0)
        setSecondes(0)

        setGameStarted(true);

        let gameMode = Mode(mode)
        setSize(gameMode.size)
        setBombs(gameMode.bombs)

        onTriggerUpdate()
    }

    const clear = () => {
        setGameResults([])
    }

    const ranks = gameResults ? gameResults
        .sort((a, b) => a.time - b.time)
        .map((result, index) => (
            <tr key={index} className="player-rank">
                <td colspan="2">{index}</td>
                <td colspan="2">{result.pseudo}</td>
                <td colspan="2">{result.time}</td>
                <td colspan="2">{result.mode}</td>
            </tr>
        )) : null;

    return (
        <div className="topBar">
            <div>
                <select name="difficulty" id="difficulty" onChange={(e) => setMode(() => e.target.value)} style={{ borderRadius: '5px', marginTop: '50px' }}>
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
                <img src={Flag} alt="Nombre de drapeau restant par rapport aux nombres de mines" style={{ maxHeight: '40px' }} /><span style={{ marginLeft: '10px', fontSize: '2em', color: 'white' }}>{flags}</span>
            </div>
            <div className="ranks">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">rang</th>
                            <th colspan="2">pseudo</th>
                            <th colspan="2">temps</th>
                            <th colspan="2">mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranks}
                    </tbody>
                </table>
            </div>
            <button onClick={clear}>clear</button>
        </div>
    );
}