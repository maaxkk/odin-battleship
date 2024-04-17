"use strict";

//The algorithm is quite straightforward, when pc shoots, we check if this shot was a hit (changing the cell from empty to 💢)
// If yes, we check if the ship was sunk - by checking this ship in userShips object (We have access to all ships and their
// isSunk() property, we can find the ship we hit by coordinates and then check this property. This is cheating, but I haven't
// found a better solution). If the computer is hit and isSunk() = false, then the ship size is greater than 1 and we run the
// TargetFire function which will work until it floods the ship. First of all it shoots in 4 directions, if it misses then the
// right to move goes to the player, but we save the last coordinate of the hit and on the next move the computer shoots in another
// direction, when the computer hits we check if it is sunk or not, if yes then we run the usual pcFire function which shoots at random
// coordinates, if pc hit but the ship is not sunk then the ship size is greater than 2 and we can find out the direction of the ship
// horiz or vert. Now we just compare the coordinates of the last hit and if the last hit is bigger than the starting one then we shoot
// only to the right horizontally, otherwise to the left and so we repeat it.


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
    for (let ship in ships) {
        for (let coords of ships[ship].coords) {
            if (coords[0] === y && coords[1] === x) {
                return ships[ship].isSunk();
            }
        }
    }
}

export function fireMainDirections(board, y, x) {
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    const output = [];
    for (let square of mainSquares) {
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

export function fireLeft(board, y, x) {
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of leftSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireRight(board, y, x) {
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of rightSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireDown(board, y, x) {
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of downSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export function fireTop(board, y, x) {
    board = board.map(row => row.map(cell => {
        if (cell === '#') cell = ' ';
        return cell;
    }));
    let output = []
    for (let square of topSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === ' ') {
            output.push(validSquare)
        }
    }
    return output;
}

export default {shipWasSunk, fireMainDirections, shipIsVert, shipIsHoriz, fireLeft, fireRight, fireTop, fireDown}