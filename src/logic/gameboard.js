"use strict";


let possibleSquares = [
    [0, 0],
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
]

let surroundingSquares = [
    [1, -1],
    [0, -1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
]


function checkBoundaries([x, y]) {
    return (x >= 0 && x <= 9) && (y >= 0 && y <= 9)
}

class Gameboard {
    constructor(size) {
        this.rows = size;
        this.columns = size;
        this.board = [];
    }

    fillBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.board[i].push(' ');
            }
        }
        return this.board;
    }

    getRandomCoords(shipSize) {
        let randomY;
        let randomX;
        let direction = Math.floor(Math.random() * 2);
        do {
            randomY = Math.floor(Math.random() * this.rows);
            randomX = Math.floor(Math.random() * this.columns);
        // if we can't put our ship in range of (size of columns - start coordinate of ship), then we generate new coords
        // if we can put our ship in this range, but if in range of -1 to +1 squares is our neighbour ship, we generate new coords
        } while ((this.columns - randomX) < shipSize || !(this.checkIfNotEmpty(shipSize, randomY, randomX)))
        return [randomY, randomX, direction];
    }

    checkIfNotEmpty(shipSize, randomY, randomX) {
        // so far we place ship horizontally so we iterate only in columns
        for (let i = randomY; i < randomY + 1; i++) {
            for (let j = randomX; j < randomX + shipSize; j++) {
                for (let square of possibleSquares) {
                    let validSquare = [i + square[0], j + square[1]]
                    if (!checkBoundaries(validSquare)) {
                        continue;
                    }
                    if (this.board[validSquare[0]][validSquare[1]] !== ' ') {
                        return false;
                    }
                }
            }
        }
        return [randomY, randomX];
    }

    placeShip(ship, randomY, randomX) {
        let shipCoords = [];
        // so far we place ship horizontally so we iterate only in columns
        for (let i = randomY; i < randomY + 1; i++) {
            for (let j = randomX; j < randomX + ship.length; j++) {
                this.board[i][j] = ship.length;
                shipCoords.push([i, j])
            }
        }
        ship.coords = shipCoords;
    }

    receiveAttack(attackCoords, ships) {
        if (
            this.board[attackCoords[0]][attackCoords[1]] === '🚫' ||
            this.board[attackCoords[0]][attackCoords[1]] === '💢') {
            return
        }
        for (let ship in ships) {
            for (let coords of ships[ship].coords) {
                if (attackCoords[0] === coords[0] && attackCoords[1] === coords[1]) {
                    ships[ship].hit();
                    this.board[attackCoords[0]][attackCoords[1]] = '💢'
                    if (ships[ship].isSunk()) {
                        console.log(`Ship ${ship} was sunk!`)
                        this.makeSurroundingWater(ships[ship])
                    }
                    return;
                }
            }
        }
        this.board[attackCoords[0]][attackCoords[1]] = '🚫'
    }

    makeSurroundingWater(ship){
        for (let i = 0; i < ship.coords.length; i++){
            let coords = ship.coords[i]
            for (let surrCoords of surroundingSquares){
                // handling edge cases [0, +1], [0, -1]
                if ((surrCoords[0] === 0 && surrCoords[1] === 1) && i !== ship.coords.length - 1) continue;
                if ((surrCoords[0] === 0 && surrCoords[1] === -1) && i !== 0) continue;
                let validSquare = [coords[0] + surrCoords[0], coords[1] + surrCoords[1]]
                if (!checkBoundaries(validSquare)){
                    continue;
                }
                this.board[validSquare[0]][validSquare[1]] = '🚫';
            }
        }
    }

    gameOver(ships) {
        for (let ship in ships) {
            if (!ships[ship].isSunk()) {
                return false
            }
        }
        return `Game is over!`;
    }

}


module.exports = Gameboard;
