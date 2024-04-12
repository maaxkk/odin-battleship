"use strict";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";


const players = {
    0: new Gameboard(10),
    1: new Gameboard(10),
}

const userShips = {
    '1': new Ship(1),
    '2': new Ship(2),
    '3': new Ship(3),
    '4': new Ship(4),
    '5': new Ship(5),
}

const pcShips = {
    '1': new Ship(1),
    '2': new Ship(2),
    '3': new Ship(3),
    '4': new Ship(4),
    '5': new Ship(5),
}

let activePlayer = 0;

function changePlayer() {
    return activePlayer = activePlayer === 0 ? 1 : 0;
}

players[activePlayer].fillBoard()

userShips['3'].direction = 0
let [y,x] = players[activePlayer].getRandomCoords(userShips['3'])
players[activePlayer].placeShip(userShips['3'], y, x)

userShips['2'].direction = 0
let [y2,x2] = players[activePlayer].getRandomCoords(userShips['2'])
players[activePlayer].placeShip(userShips['2'], y2, x2)

userShips['2'].direction = 0
let [y5,x5] = players[activePlayer].getRandomCoords(userShips['2'])
players[activePlayer].placeShip(userShips['2'], y5, x5)

userShips['2'].direction = 0
let [y6, x6] = players[activePlayer].getRandomCoords(userShips['2'])
players[activePlayer].placeShip(userShips['2'], y6, x6)
//
userShips['4'].direction = 0
let [y3,x3] = players[activePlayer].getRandomCoords(userShips['4'])
players[activePlayer].placeShip(userShips['4'], y3, x3)
//
userShips['3'].direction = 1
let [y4,x4] = players[activePlayer].getRandomCoords(userShips['3'])
players[activePlayer].placeShip(userShips['3'], y4, x4)

userShips['1'].direction = 0
let [y7,x7] = players[activePlayer].getRandomCoords(userShips['1'])
players[activePlayer].placeShip(userShips['1'], y7, x7)

userShips['1'].direction = 0
let [y8,x8] = players[activePlayer].getRandomCoords(userShips['1'])
players[activePlayer].placeShip(userShips['1'], y8, x8)

userShips['1'].direction = 0
let [y9,x9] = players[activePlayer].getRandomCoords(userShips['1'])
players[activePlayer].placeShip(userShips['1'], y9, x9);

activePlayer = 1;


players[activePlayer].fillBoard();

pcShips['3'].direction = 0
let [y10, x10] = players[activePlayer].getRandomCoords(pcShips['3'])
players[activePlayer].placeShip(pcShips['3'], y10, x10)

pcShips['2'].direction = 0
let [y11, x11] = players[activePlayer].getRandomCoords(pcShips['2'])
players[activePlayer].placeShip(pcShips['2'], y11, x11)

pcShips['2'].direction = 0
let [y12, x12] = players[activePlayer].getRandomCoords(pcShips['2'])
players[activePlayer].placeShip(pcShips['2'], y12, x12)

pcShips['2'].direction = 0
let [y13, x13] = players[activePlayer].getRandomCoords(pcShips['2'])
players[activePlayer].placeShip(pcShips['2'], y13, x13)

pcShips['4'].direction = 0
let [y14, x14] = players[activePlayer].getRandomCoords(pcShips['4'])
players[activePlayer].placeShip(pcShips['4'], y14, x14)

pcShips['3'].direction = 1
let [y15, x15] = players[activePlayer].getRandomCoords(pcShips['3'])
players[activePlayer].placeShip(pcShips['3'], y15, x15)

pcShips['1'].direction = 0
let [y16, x16] = players[activePlayer].getRandomCoords(pcShips['1'])
players[activePlayer].placeShip(pcShips['1'], y16, x16)

pcShips['1'].direction = 0
let [y17, x17] = players[activePlayer].getRandomCoords(pcShips['1'])
players[activePlayer].placeShip(pcShips['1'], y17, x17)

pcShips['1'].direction = 0
let [y18, x18] = players[activePlayer].getRandomCoords(pcShips['1'])
players[activePlayer].placeShip(pcShips['1'], y18, x18)


activePlayer = 0

export function screenController() {
    const board = document.querySelector('.user-board')
    const pcBoard = document.querySelector('.pc-board')
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const btn = document.createElement('button')
            const pcBtn = document.createElement('button')
            pcBtn.addEventListener('click', () => pcBtn.style.background = 'green')
            btn.textContent = players[0].board[i][j]
            pcBtn.textContent = players[1].board[i][j]
            btn.classList.add('cell')
            pcBtn.classList.add('cell')
            board.appendChild(btn)
            pcBoard.appendChild(pcBtn)
        }
    }
}

export default screenController