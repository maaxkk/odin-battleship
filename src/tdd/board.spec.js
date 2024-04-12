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
    // '5': new Ship(5),
}

let shipsCoords = [
    [0,0],
    [2,2],
    [4,4],
    [8,6],
    [9,0]
]

// helpers

const testArr = []
for (let i = 0; i < 10; i++) {
    testArr[i] = []
    for (let j = 0; j < 10; j++) {
        testArr[i].push(' ')
    }
}

function sinkShips(shipLen, y, x){
    for (let i = x; i < x + shipLen; i++) {
        board.receiveAttack([y, i], ships)
    }
}

// filling gameBoard
describe("Gameboard", () => {
    test("Should return board(array)", () => {
        expect(board.fillBoard()).toStrictEqual(testArr);
    });
});

// Places ship at determined coordinates, e.g for ship with length 3 and start coords [9,0] -> [9,0], [9,1], [9,2]
describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([0,0])
        let [y,x] = board.getRandomCoords(ships['1'].length)
        board.placeShip(ships['1'], y, x)
        for (let i = x; i < ships['1'].length; i++) {
            expect(board.board[y][i]).toBe(1)
        }
    })
})

describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([2,2])
        let [y,x] = board.getRandomCoords(ships['2'].length)
        board.placeShip(ships['2'], y, x)
        for (let i = x; i < ships['2'].length; i++) {
            expect(board.board[y][i]).toBe(2)
        }
    })
})

describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([4,4])
        let [y,x] = board.getRandomCoords(ships['3'].length)
        board.placeShip(ships['3'], y, x)
        for (let i = x; i < ships['3'].length; i++) {
            expect(board.board[y][i]).toBe(3)
        }
    })
})

describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([8,6])
        let [y,x] = board.getRandomCoords(ships['4'].length)
        board.placeShip(ships['4'], y, x)
        for (let i = x; i < ships['4'].length; i++) {
            expect(board.board[y][i]).toBe(4)
        }
    })
})


// Testing receiveAttack function, did ship got hit or not
describe('Receive attack function', () => {
    it('Hits ship', () => {
        board.receiveAttack([0,0], ships)
        expect(board.board[0][0]).toBe('💢')
    })
    it('Ship was not hitted', () => {
        board.receiveAttack([0,1], ships)
        expect(board.board[0][1]).toBe('🚫')
    })
})

// Testing was ship sunk function, after receive attack function
describe('ship is sunk', () => {
    it('tests if ship was sunk', () => {
        console.table(board.board)
        expect(ships['1'].isSunk()).toBe(true)
    })
})

// Testing gameIsOver function
describe('gameIsOver', () => {
    it('tests if all ships was sunk', () => {
        sinkShips(ships['1'].length, 0, 0)
        sinkShips(ships['2'].length, 2, 2)
        sinkShips(ships['3'].length, 4, 4)
        sinkShips(ships['4'].length, 8, 6)
        console.table(board.board)
        console.log(JSON.stringify(ships))
        expect(board.gameOver(ships)).toBe('Game is over!')
    })
})
