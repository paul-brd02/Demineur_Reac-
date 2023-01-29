import React from "react";
import '../style/topBar.css'
import { BsFlag, BsClockFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import ListDifficulty from "./ListDifficulty";

export default function TopBar() {

    return (
        <div className="topBar">
            <div>
                <ListDifficulty />
            </div>
            <div className="infos">
                <BsFlag />
                <BsClockFill />
            </div>
            <div>
                <AiFillCloseCircle />
            </div>
        </div>
    );
}