"use strict";

// visualize board
//[
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
// ];

const Gameboard = require("../logic/gameboard.js");
const Ship = require("../logic/ship.js");

const board = new Gameboard(10);

let ships = {
    '1': new Ship(1),
    '2': new Ship(2),
    '3': new Ship(3),
    '4': new Ship(4),
    '5': new Ship(5),
}

let shipsCoords = [
    [0,0],
    [2,2],
    [4,4],
    [0,6],
    [9,0]
]

const testArr = []
for (let i = 0; i < 10; i++) {
    testArr[i] = []
    for (let j = 0; j < 10; j++) {
        testArr[i].push(' ')
    }
}


// filling gameBoard
describe("Gameboard", () => {
    test("Should return board(array)", () => {
        expect(board.fillBoard()).toStrictEqual(testArr);
    });
});


describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([3,3])
        board.placeShip(ships['1'])
        expect(board[3][3]).toBe('1')
    })
})



