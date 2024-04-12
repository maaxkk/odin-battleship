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
        let randomX
        do {
            randomY = Math.floor(Math.random() * this.rows);
            randomX = Math.floor(Math.random() * this.columns);
        } while ((this.columns - randomX) < shipSize || !(this.checkIfNotEmpty(shipSize, randomY, randomX)))
        return [randomY, randomX];
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
        for (let ship in ships) {
            for (let coords of ships[ship].coords) {
                if (attackCoords[0] === coords[0] && attackCoords[1] === coords[1]) {
                    ships[ship].hit();
                    this.board[attackCoords[0]][attackCoords[1]] = '💢'
                    if (ships[ship].isSunk()) {
                        console.log(`Ship ${ship} was sunk!`)
                    }
                    return;
                }
            }
        }
        this.board[attackCoords[0]][attackCoords[1]] = '🚫'
    }

    gameOver(ships) {
        for (let ship in ships) {
            if (!ships[ship].isSunk()) {
                return false
            }
        }
        return true;
    }

}


module.exports = Gameboard;
