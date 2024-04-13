"use strict";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const errorMsg = document.querySelector('.error')
const dialog = document.querySelector('dialog')
const restartBtn = document.querySelector('.restart')
const randomBtn = document.querySelector('.random')

const players = {
    0: new Gameboard(10),
    1: new Gameboard(10),
}

// I will try to make an algorithm later to make the coordinate search work for all ships
// so far it works only if you exclude Ship with size 1 and 2
const userShips = {
    // '1': new Ship(1),
    '2': new Ship(1),
    '3': new Ship(1),
    '4': new Ship(1),
    // '5': new Ship(2),
    '6': new Ship(2),
    '7': new Ship(2),
    '8': new Ship(3),
    '9': new Ship(3),
    '10': new Ship(4),
}

const pcShips = {
    // '1': new Ship(1),
    '2': new Ship(1),
    '3': new Ship(1),
    '4': new Ship(1),
    // '5': new Ship(2),
    '6': new Ship(2),
    '7': new Ship(2),
    '8': new Ship(3),
    '9': new Ship(3),
    '10': new Ship(4),
}

let activePlayer = 0;

function changePlayer() {
    return activePlayer = activePlayer === 0 ? 1 : 0;
}

players[activePlayer].placeShips(userShips)

changePlayer()

players[activePlayer].placeShips(pcShips)

changePlayer();

function userRender() {
    const board = document.querySelector('.user-board');
    const active = players[0];
    board.innerHTML = '';
    for (let i = 0; i < active.rows; i++) {
        for (let j = 0; j < active.columns; j++) {
            const btn = document.createElement('button')
            if (active.board[i][j] === '💢') btn.classList.add('fired')
            else if (active.board[i][j] === '🚫') btn.classList.add('surrounded')
            else btn.classList.add('cell')
            btn.textContent = active.board[i][j]
            board.appendChild(btn)
        }
    }
}

function pcRender() {
    const board = document.querySelector('.pc-board');
    const active = players[1];
    board.innerHTML = '';
    for (let i = 0; i < active.rows; i++) {
        for (let j = 0; j < active.columns; j++) {
            const btn = document.createElement('button')
            btn.dataset.y = `${i}`;
            btn.dataset.x = `${j}`;
            if (active.board[i][j] === '💢') {
                btn.textContent = active.board[i][j]
                btn.classList.add('fired')
            } else if (active.board[i][j] === '🚫') {
                btn.textContent = active.board[i][j]
                btn.classList.add('surrounded')
            } else btn.classList.add('cell')
            btn.textContent = active.board[i][j]
            board.appendChild(btn)
        }
    }
}

function fireUser() {
    const board = document.querySelector('.pc-board')
    board.addEventListener('click', attackHandler)
}

function attackHandler(event){
    if (event.target.dataset.y && event.target.dataset.x) {
        const active = players[1]
        const squareY = event.target.dataset.y;
        const squareX = event.target.dataset.x;

        if (!active.receiveAttack([+squareY, +squareX], pcShips)) { // if this square was attacked already
            errorMsg.textContent = `*Square ${[squareY, squareX]} already was attacked!`
        } else {
            if (active.gameOver(pcShips)) {
                dialog.showModal();
                return;
            }
            errorMsg.textContent = "";
            pcRender();
            changePlayer();
            handleFire();
        }
    }
}

function pcFire() {
    const active = players[0]
    let y = Math.floor(Math.random() * 10)
    let x = Math.floor(Math.random() * 10)
    if (!active.receiveAttack([y, x], userShips)) {
        do {
            y = Math.floor(Math.random() * 10)
            x = Math.floor(Math.random() * 10)
        } while (!active.receiveAttack([y, x], userShips))
    }
    userRender();
    changePlayer();
}


function handleFire() {
    if (activePlayer === 0) {
        fireUser();
    } else if (activePlayer === 1) {
        pcFire();
    }
}

function restart() {
    restartBtn.addEventListener('click', function () {
        dialog.close();
        players[0].fillBoard();
        players[1].fillBoard();

        players[0].placeShips(userShips);
        players[1].placeShips(pcShips);

        screenController();
    })
}

function random() {
    randomBtn.addEventListener('click', function () {
        players[0].fillBoard();
        players[1].fillBoard();

        players[0].resetShips(userShips);
        players[1].resetShips(pcShips);

        players[0].placeShips(userShips);
        players[1].placeShips(pcShips);
        screenController();
    })
}

restart();
random();

export function screenController() {
    userRender();
    pcRender();
    handleFire();
}

export default screenController
