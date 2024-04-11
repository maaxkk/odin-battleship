"use strict";

// import "./style/style.css";

const Ship = require("./logic/ship.js");
const Gameboard = require("./logic/gameboard.js");



let ships = {
    '1': new Ship(1),
    '2': new Ship(2),
    '3': new Ship(3),
    '4': new Ship(4),
    '5': new Ship(5),
}

let ships2 = {
    '1': new Ship(1),
    '2': new Ship(2),
    '3': new Ship(3),
    '4': new Ship(4),
    '5': new Ship(5),
}


const players = {
    0: new Gameboard(10),
    1: new Gameboard(10),
}

let activePlayer = 0
function getActivePlayer(){
    return activePlayer = activePlayer === 0 ? 1 : 0;
}

players[activePlayer].fillBoard()
players[activePlayer].placeShips(ships)
// console.table(players[activePlayer].board)

getActivePlayer()
players[activePlayer].fillBoard()
players[activePlayer].placeShips(ships2)
// console.table(players[activePlayer].board)

players[activePlayer].receiveAttack([7,1], ships2)
players[activePlayer].receiveAttack([2,1], ships2)
players[activePlayer].receiveAttack([3,6], ships2)
players[activePlayer].receiveAttack([6,1], ships2)
getActivePlayer()

players[activePlayer].receiveAttack([2,5], ships)
players[activePlayer].receiveAttack([5,7], ships)
players[activePlayer].receiveAttack([2,1], ships)

console.table(players[activePlayer].board)
getActivePlayer()
console.table(players[activePlayer].board)

console.log(JSON.stringify(ships))
console.log(JSON.stringify(ships2))
