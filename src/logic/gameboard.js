"use strict";


const Ship = require("./ship.js");


let possibleSquares = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
]

// let ships = {
//     '1': new Ship(1),
//     '2': new Ship(2),
//     '3': new Ship(3),
//     '4': new Ship(4),
//     '5': new Ship(5),
// }


function checkBoundaries([x,y]){
    return (x >=0 && x <= 9) && (y >= 0 && y <= 9)
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
                if (i === 9){
                    this.board[i].push(' ');
                }
                else {
                    this.board[i].push(' ');
                }
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
        } while ((this.columns - randomX) < shipSize)
        return [randomY, randomX];
    }

    checkIfNotEmpty(shipSize) {
        const [randomY, randomX] = this.getRandomCoords(shipSize)
        // const randomY = 3;
        // const randomX = 3;
        // console.log(`y is ${randomY} and x is ${randomX}`)
        let haveSpaceForShip = true;
        for (let i = randomY; i < randomY + 1; i++) {
            for (let j = randomX; j < randomX + shipSize; j++) {
                if (this.board[i][j] !== ' ') {
                    haveSpaceForShip = false;
                    return haveSpaceForShip;
                }
                for (let square of possibleSquares) {
                    let validSquare = [i + square[0], j + square[1]]
                    if (checkBoundaries(validSquare) === false) {
                        continue;
                    }
                    if (this.board[validSquare[0]][validSquare[1]] !== ' ') {
                        haveSpaceForShip = false;
                        return haveSpaceForShip;
                    }

                }
            }
        }
        return [randomY, randomX];
    }

    placeShips(shipsObject){
        for (let ship in shipsObject) {
            let shipStartCoords = this.checkIfNotEmpty(+ship)
            let shipCoords = [];
            if (shipStartCoords === false) {
                do {
                    shipStartCoords = this.checkIfNotEmpty(+ship)
                } while (shipStartCoords === false);
            }
            for (let i = shipStartCoords[0]; i < shipStartCoords[0] + 1; i++) {
                for (let j = shipStartCoords[1]; j < shipStartCoords[1] + +ship; j++) {
                    this.board[i][j] = ship;
                    shipCoords.push([i, j])
                }
            }
            shipsObject[ship].coords = shipCoords;
        }
        return shipsObject
    }
    receiveAttack(attackCoords, ships){
        for (let ship in ships){
            for (let coords of ships[ship].coords){
                if (attackCoords[0] === coords[0] && attackCoords[1] === coords[1]){
                    ships[ship].hit();
                    this.board[attackCoords[0]][attackCoords[1]] = '✅'
                    return;
                }
            }
        }
        this.board[attackCoords[0]][attackCoords[1]] = '❌'
    }

    checkShipsState() {
        for (let ship in ships){
            if (!ships[ship].isSunk()){
                return false
            }
        }
        return true;
    }

}


// const testBoard = new Gameboard(10)
// testBoard.fillBoard()
// testBoard.placeShips(ships)
//
// testBoard.receiveAttack([3,3])
// testBoard.receiveAttack([5,5])
// testBoard.receiveAttack([2,2])
// testBoard.receiveAttack([9,9])
//
// console.log(JSON.stringify(ships))
//
// console.table(testBoard.board)





module.exports = Gameboard;
