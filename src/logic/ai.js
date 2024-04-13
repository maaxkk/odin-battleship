"use strict";

let surroundingSquares = [
    // diag
    [1, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    // horiz
    [0, -1],
    [0, 1],
    // vert
    [-1, 0],
    [1, 0],

]

let diagonalSquares = [
    [1, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
]

let mainSquares = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
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

// check if ship with length 1 is Sunk and also checks if length of ship is more than 1
// If after hitting ship, water outside ship is not surrounded, it means ship size is more than 1

// ship with size of 1 is edge case, we check every square outside of this ship
function shipOfOneSunk(board, y, x) {
    for (let surrCoords of surroundingSquares) {
        let validSquare = [y + surrCoords[0], x + surrCoords[1]]
        if (!checkBoundaries(validSquare)) continue;
        else if (board[validSquare[0]][validSquare[1]] === ' ') {
            return false;
        }
        return true;
    }
}

// if function above returns false, it means ship length is more than 1
// now we can check main direction, horizontally and vertically and we will get direction of ship
// but firstly computer has to fire in 4 main directions


// Algorithm:
// 1) check if ship was size of 1, if true, ship size was only 1, and we can generate new random coords, otherwise ->
// 2) fire in 4 main directions E-W-N-S and after each of them check both directions and finding out what direction of ship
// 3) After finding direction of ship -> check their start-1 and end+1 if they are water -> then ship size is more than 2
// otherwise ship size was 2
// 4) Repeat process for ship with size 3 and 4

function shipIsHoriz(board, y, x) {
    for (let square of horizSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === '💢') {
            return true;
        }
    }
    return false;
}

function shipIsVert(board, y, x) {
    for (let square of vertSquares) {
        let validSquare = [y + square[0], x + square[1]]
        if (!checkBoundaries(validSquare)) continue;
        if (board[validSquare[0]][validSquare[1]] === '💢') {
            return true;
        }
    }
    return false;
}