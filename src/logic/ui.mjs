"use strict";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import {shipOfOneSunk, fireMainDirections, shipIsVert, shipIsHoriz} from "./ai.js";

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
    '5': new Ship(3),
    '6': new Ship(3),
    '11': new Ship(2),
    '12': new Ship(2),
    '13': new Ship(2),

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
        if (active.gameOver(pcShips)) {
            dialog.showModal();
            return;
        }
        if (shipOfOneSunk(active.board, y, x)) {
            setTimeout(pcFire, 1000)
            userRender();
            console.log('ship with size 1 was sunk')
            return;
        } else { // if ship did not sink, his size is more than 2
            const boardFromPcView = active.board.map(row => row.map(cell => {
                if (cell === '#'){
                    cell = ' ';
                }
                return cell;
            }))
            q = fireMainDirections(boardFromPcView, y, x)
            startCoords = [y, x]
            setTimeout(() => smartPc(y, x), 1000);
            userRender();
            return;
        }
    }
    userRender();
    changePlayer();
}

let q = []
let startCoords = []
let wasHit = false;


// not finished bad solution
function smartPc(y, x) {
    if (q.length === 0){
        console.log('q is empty')
        return;
    }
    let active = players[0]
    if (!shipIsHoriz(active.board, y, x) || !shipIsVert(active.board, y, x)){
        const nextSquare = q.shift()
        active.receiveAttack(nextSquare, userShips)
        userRender();
        if (active.board[nextSquare[0]][nextSquare[1]] === '💢') {
            // if ship was size of 2
            // trying to find direction of ship
            const skip = [nextSquare[0] - startCoords[0], nextSquare[1] - startCoords[1]]
            const skip2 = [startCoords[0] - nextSquare[0], startCoords[1] - nextSquare[1]]
            if (nextSquare[1] > startCoords[1]) {
                // ship is horizontally
                if (shipOfOneSunk(active.board, startCoords[0], startCoords[1], skip) && shipOfOneSunk(active.board, nextSquare[0], nextSquare[1], skip2)) {
                    // ship was sunk
                    q = [];
                    startCoords = [];
                    wasHit = false;
                    setTimeout(pcFire, 1000);
                    return;
                } else {
                    // if size is more than 2
                    q = [];
                    wasHit = false;
                    if (startCoords[1] - 1 >= 0) q.push([startCoords[0], startCoords[1] - 1])
                    if (nextSquare[1] + 1 <= 9) q.push([nextSquare[0], nextSquare[1] + 1])
                    setTimeout(() => smartPc(y, x), 1000);
                    return;
                }
            } else if (nextSquare[1] < startCoords[1]){
                if (shipOfOneSunk(active.board, startCoords[0], startCoords[1], skip2) && shipOfOneSunk(active.board, nextSquare[0], nextSquare[1], skip)) {
                    // ship was sunk
                    q = [];
                    startCoords = [];
                    wasHit = false;
                    setTimeout(pcFire, 1000);
                    return;
                } else {
                    // if size is more than 2
                    q = [];
                    wasHit = false;
                    if (startCoords[1] + 1 <= 9) q.push([startCoords[0], startCoords[1] + 1])
                    if (nextSquare[1] - 1 >= 0) q.push([nextSquare[0], nextSquare[1] - 1])
                    smartPc(y, x);
                    return;
                }
            } else if (nextSquare[0] > startCoords[0]){
                // ship is vertically
                if (shipOfOneSunk(active.board, startCoords[0], startCoords[1], skip) && shipOfOneSunk(active.board, nextSquare[0], nextSquare[1], skip2)) {
                    // ship was sunk
                    q = [];
                    startCoords = [];
                    wasHit = false;
                    setTimeout(pcFire, 1000);
                    return;
                } else {
                    // if size is more than 2
                    q = [];
                    wasHit = false;
                    if (startCoords[0] - 1 >= 0) q.push([startCoords[0] - 1, startCoords[1]])
                    if (nextSquare[1] + 1 <= 9) q.push([nextSquare[0] + 1, nextSquare[1]])
                    smartPc(y, x);
                    return;
                }
            } else if (nextSquare[0] < startCoords[0]) {
                // ship is vertically
                if (shipOfOneSunk(active.board, startCoords[0], startCoords[1], skip2) && shipOfOneSunk(active.board, nextSquare[0], nextSquare[1], skip)) {
                    // ship was sunk
                    q = [];
                    startCoords = [];
                    wasHit = false;
                    setTimeout(pcFire, 1000);
                    return;
                } else {
                    // if size is more than 2
                    q = [];
                    wasHit = false;
                    if (startCoords[0] + 1 <= 9) q.push([startCoords[0] + 1, startCoords[1]])
                    if (nextSquare[0] - 1 >= 0) q.push([nextSquare[0] - 1, nextSquare[1]])
                    smartPc(y, x);
                    return;
                }
            }
        } else {
            wasHit = true;
            console.log(JSON.stringify(q))
            changePlayer();
            return;
        }
    }
    if (shipIsHoriz(active.board, y, x)) {
        const horNextSquare = q.shift();
        active.receiveAttack(horNextSquare, userShips);
        userRender();
        if (active.board[horNextSquare[0]][horNextSquare[1]] === '💢') {
            // if ship was size of 3
            console.log('Ship with size of 3 was sunk')
            wasHit = false;
            q = [];
            startCoords = [];
            pcFire();
            return;
        } else {
            wasHit = true;
            changePlayer();
            return;
        }
    } else {
        wasHit = true;
        changePlayer();
        // return;
    }
    if (shipIsVert(active.board, y, x)){
        const verNextSquare = q.shift();
        active.receiveAttack(verNextSquare, userShips);
        userRender();
        if (active.board[verNextSquare[0]][verNextSquare[1]] === '💢') {
            // if ship was size of 3
            console.log('Ship with size of 3 was sunk')
            wasHit = false;
            q = [];
            startCoords = [];
            pcFire();
            return;
        } else {
            wasHit = true;
            changePlayer();
            return;
        }
    } else {
        wasHit = true;
        changePlayer();
        return;
    }
}


function handleFire() {
    if (activePlayer === 0) {
        fireUser();
    } else if (activePlayer === 1 && wasHit) {
        smartPc(startCoords[0], startCoords[1]);
    } else {
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
