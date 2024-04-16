"use strict";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import {
    fireMainDirections,
    shipIsVert,
    shipIsHoriz,
    shipWasSunk,
    fireRight,
    fireLeft,
    fireTop,
    fireDown
} from "./ai.js";

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
    '10': new Ship(3),
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
            // btn.textContent = active.board[i][j]
            board.appendChild(btn)
        }
    }
}

function fireUser() {
    const board = document.querySelector('.pc-board')
    board.addEventListener('click', attackHandler)
}

function attackHandler(event) {
    if (event.target.dataset.y && event.target.dataset.x && activePlayer === 0) {
        const active = players[1]
        const squareY = event.target.dataset.y;
        const squareX = event.target.dataset.x;
        if (!active.receiveAttack([+squareY, +squareX], pcShips)) { // if this square was attacked already
            errorMsg.textContent = `*Square ${[squareY, squareX]} already was attacked!`
        } else {
            // we don't let pc fire, if our last attacked square was a hit
            if (active.board[+squareY][+squareX] === '💢') {
                active.receiveAttack([+squareY, +squareX], pcShips)
                pcRender();
                if (active.gameOver(pcShips)) {
                    dialog.showModal();
                    return;
                }
                return;
            }
            errorMsg.textContent = "";
            pcRender();
            changePlayer();
            handleFire();
        }
    }
}

function getRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function pcFire() {
    const active = players[0];
    let y, x;
    do {
        [y, x] = getRandomCoordinates();
    } while (!active.receiveAttack([y, x], userShips));
    if (active.board[y][x] === '💢') { // if pc hits user's ship
        if (shipWasSunk(userShips, y, x)) {
            console.log('test')
            userRender();
            setTimeout(pcFire, 500);
            return;
        } else {
            setTimeout(() => targetFire(y, x), 500)
            return;
        }
    }
    userRender();
    changePlayer();
}

let tmpSquare = null;
let start = null;
let queue = []

function targetFire(y, x) {

    const gameBoard = players[0]

    if (shipIsHoriz(gameBoard.board, y, x)) {
        // after handling ship of size 2, we determined that ship size is > 2
        // now we will handle this ship, if that ship is horizontal
        // compare only horizontal coords
        if (x >= start[1]) {
            queue = fireRight(gameBoard.board, y, x);
            const next = queue.shift()
            gameBoard.receiveAttack(next, userShips);
            userRender();
            if (shipWasSunk(userShips, next[0], next[1])) {
                console.log('ship with size 3 was sunk')
                setTimeout(pcFire, 500);
                tmpSquare = null;
                return;
            } else if (gameBoard.board[next[0]][next[1]] === '💢') {
                // ship size is more than 3
                setTimeout(() => targetFire(next[0], next[1]), 500)
                return;
                } else {
                    changePlayer();
                    return;
                }
        } else {
            queue = fireLeft(gameBoard.board, y, x)
            const next = queue.shift();
            gameBoard.receiveAttack(next, userShips);
            userRender();
            if (shipWasSunk(userShips, next[0], next[1])) {
                console.log('ship with size 3 was sunk')
                setTimeout(pcFire, 500);
                tmpSquare = null;
                return;
            } else if (gameBoard.board[next[0]][next[1]] === '💢') {
                // ship size is more than 3
                if (next[1] - 1 >= 0) {
                    gameBoard.receiveAttack([next[0], next[1]-1], userShips)
                    if (shipWasSunk(userShips, next[0], next[1] - 1)){
                        setTimeout(pcFire, 500);
                        return;
                    } else {
                        setTimeout(() => targetFire(start[0], start[1]), 500);
                        return;
                    }
                } else {
                    tmpSquare = [start[0], start[1]]
                    changePlayer();
                    return;
                }
            } else {
                tmpSquare = [start[0], start[1]]
                changePlayer();
                return;
            }
        }
    }
    if (shipIsVert(gameBoard.board, y, x)) {
        // after handling ship of size 2, we determined that ship size is > 2
        // now we will handle this ship, if that ship is vertical
        // compare only vertical coords
        if (y > start[0]) {
            queue = fireTop(gameBoard.board, y, x);
            const next = queue.shift()
            gameBoard.receiveAttack(next, userShips);
            userRender();
            if (shipWasSunk(userShips, next[0], next[1])) {
                console.log('ship with size 3 was sunk')
                setTimeout(pcFire, 500);
                tmpSquare = null;
                return;
            } else {
                changePlayer();
                return;
            }
        } else {
            queue = fireDown(gameBoard.board, y, x)
            const next = queue.shift();
            gameBoard.receiveAttack(next, userShips);
            userRender();
            if (shipWasSunk(userShips, next[0], next[1])) {
                console.log('ship with size 3 was sunk')
                setTimeout(pcFire, 500);
                tmpSquare = null;
                return;

            } else {
                changePlayer();
                return;
            }
        }
    }
    console.log('test')
    const q = fireMainDirections(gameBoard.board, y, x)
    const next = q.shift();

    gameBoard.receiveAttack(next, userShips);
    userRender();

    if (shipWasSunk(userShips, next[0], next[1])) {
        // ship size was 2
        console.log('ship with length was sunk!')
        setTimeout(pcFire, 500);
        tmpSquare = null;
    } else if (gameBoard.board[next[0]][next[1]] === '💢') {
        // ship size is more than 2, we need additional function-handler
        start = [y, x]
        setTimeout(() => targetFire(next[0], next[1]), 500);
    } else {
        // ship was not sunk, pc missed
        tmpSquare = [y, x]
        changePlayer();
    }
}


function handleFire() {
    if (activePlayer === 0) {
        fireUser();
    } else if (activePlayer === 1 && tmpSquare) {
        setTimeout(() => targetFire(tmpSquare[0], tmpSquare[1]), 500);
    } else {
        setTimeout(pcFire, 500);
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
