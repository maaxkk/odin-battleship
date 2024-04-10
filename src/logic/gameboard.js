"use strict";

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
    placeShips() {
        const randomY = Math.floor(Math.random() * this.rows);
        const randomX = Math.floor(Math.random() * this.columns);
        let haveSpaceForShip = true;
        for (let i = randomY; i < this.rows; i++) {
            for (let j = randomX; j < this.columns; j++) {
                if (this.board[i][j] !== ' ') haveSpaceForShip = false;
                else if (this.board[i+2][j] !== ' ' || this.board[i+1][j] !== ' ') {
                    haveSpaceForShip = false;
                }
                else if (this.board[i][j+2] !== ' ' || this.board[i][j+1] !== ' ') {
                    haveSpaceForShip = false;
                }
            }
        }
    }
}

class Cell {
    constructor(value) {
        this.value = value;
    }
}

module.exports = Gameboard;
