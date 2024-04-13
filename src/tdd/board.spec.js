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

ships['1'].direction = 0; // horizontally
ships['2'].direction = 0;
ships['3'].direction = 0;
ships['4'].direction = 1; // vertically

// helpers

const testArr = []
for (let i = 0; i < 10; i++) {
    testArr[i] = []
    for (let j = 0; j < 10; j++) {
        testArr[i].push(' ')
    }
}

function sinkShips(shipLen, y, x, direction){
    if (direction === 0) {
        for (let j = x; j < x + shipLen; j++) {
            board.receiveAttack([y, j], ships)
        }
    } else {
        for (let i = y; i < y + shipLen; i++) {
            board.receiveAttack([i, x], ships)
        }

    }
}

// comparing board array
describe("Gameboard", () => {
    test("Should return board(array)", () => {
        expect(board.board).toStrictEqual(testArr);
    });
});

// Places ship at determined coordinates, e.g for ship with length 3 and start coords [9,0] -> [9,0], [9,1], [9,2]
describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([0,0])
        let [y,x] = board.getRandomCoords(ships['1'].length)
        board.placeShip(ships['1'], y, x)
        for (let i = x; i < ships['1'].length; i++) {
            expect(board.board[y][i]).toBe('#')
        }
    })
})

describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([2,2,0])
        let [y,x] = board.getRandomCoords(ships['2'].length)
        board.placeShip(ships['2'], y, x)
        for (let i = x; i < ships['2'].length; i++) {
            expect(board.board[y][i]).toBe(2)
        }
    })
})

describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([4,4, 0])
        let [y,x] = board.getRandomCoords(ships['3'].length)
        board.placeShip(ships['3'], y, x)
        for (let i = x; i < ships['3'].length; i++) {
            expect(board.board[y][i]).toBe(3)
        }
    })
})

// Placing ship vertically
describe('Placing ship', () => {
    it('Places ship at determined coords', () => {
        jest.spyOn(board, 'getRandomCoords').mockReturnValue([6,9,1])
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
        sinkShips(ships['1'].length, 0, 0, 0)
        sinkShips(ships['2'].length, 2, 2, 0)
        sinkShips(ships['3'].length, 4, 4, 0)
        sinkShips(ships['4'].length, 6, 9, 1)
        console.table(board.board)
        console.log(JSON.stringify(ships))
        expect(board.gameOver(ships)).toBe('Game is over!')
    })
})


// Testing surroundingWater function
describe('surroundingWater', () => {
    it('tests if in radius 1 square water was surrounded', () => {
        // testing for [6,9] vertical ship with length 4
        let surrounded = true;
        for (let i = 5; i < 9; i++) { // ship is in the right bottom corner, we have to check only [5,8] [5,9] and range [5,8] to [9,8]
            if (board.board[i][8] !== '🚫' || board.board[5][8] !== '🚫' ||
                board.board[5][9] !== "🚫"
            )
            {
                surrounded = false;
            }
        }
        expect(surrounded).toBe(true)
    })
})
