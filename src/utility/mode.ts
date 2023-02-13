// @ts-ignore
import { Difficulty } from "../types/enum.ts"

export default function Mode(mode) {
    switch (mode) {
        case Difficulty.DEBUTANT:
            return { size: 9, bombs: 10}
        case Difficulty.INTERMEDIARE:
            return { size: 16, bombs: 40}
        case Difficulty.EXPERT:
            return { size: 22, bombs: 100}
        case Difficulty.MAITRE:
            return { size: 30, bombs: 250}
        default:
            return { size: 0, bombs: 0}
    }
}