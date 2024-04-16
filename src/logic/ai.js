"use strict";

let mainSquares = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
]

let horizSquares = [
    [0, -1],
    [0, 1],
]

let vertSquares = [
    [-1, 0],
    [1, 0],
]

function checkBoundaries([x, y]) {
    return (x >= 0 && x < 10) && (y >= 0 && y < 10)
}

export function shipWasSunk(ships, y, x) {
    for (let ship in ships){
        for (let coords of ships[ship].coords){
            if (coords[0] === y && coords[1] === x){
                return ships[ship].isSunk();
            }
        }
    }
}

export function fireMainDirections(board, y, x){
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    const output = [];
    for (let square of mainSquares){
        let validSquare = [y + square[0], x + square[1]];
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare);
        }
    }
    return output;
}

export function shipIsHoriz(board, y, x) {
    for (let square of horizSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === '💢') {
            return true;
        }
    }
    return false;
}

export function shipIsVert(board, y, x) {
    for (let square of vertSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === '💢') {
            return true;
        }
    }
    return false;
}

let leftSquares = [
    [0, -1],
    [0, -2],
]

let rightSquares = [
    [0, 1],
    [0, 2],
]

let downSquares = [
    [-1, 0],
    [-2, 0],
]

let topSquares = [
    [1, 0],
    [2, 0],
]

export function fireLeft(board, y, x){
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of leftSquares){
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireRight(board, y, x){
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of rightSquares){
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireDown(board, y, x){
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of downSquares){
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireTop(board, y, x){
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of topSquares){
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export default {shipWasSunk, fireMainDirections, shipIsVert, shipIsHoriz, fireLeft, fireRight, fireTop, fireDown}