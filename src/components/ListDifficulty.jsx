import React from "react";
import "../style/listDifficulty.css"

export default function ListDifficulty() {
    return (
        <select name="difficulty" id="difficulty" className="listDiff">
            <option value="easy">Easy</option>
            <option value="medium" selected>Medium</option>
            <option value="hard">Hard</option>
        </select>
    );
}