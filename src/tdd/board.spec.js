"use strict";

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

const testArr = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["9", "9", "9", "9", "9", "9", "9", "9", "9", "9"], // e.g we have ship with size 9 👍
];


describe("Gameboard", () => {
    test("Should return board(array)", () => {
        expect(board.fillBoard()).toStrictEqual(testArr);
    });
});


describe("Check if we have empty space for ship", () => {
    test("Should return false or true, if y is 8 or 9 it should return false, because there is ship with size 9", () => {
        expect(board.checkIfNotEmpty(3)).toBe(true);
    });
});

// hardcoded x and y values for test
describe("Check if we have empty space for ship", () => {
    test("Should return array of coordinates [3,3]", () => {
        expect(board.checkIfNotEmpty(3)).toStrictEqual([3, 3]);
    });
});

describe("Check if we have coords was applied to each ship correctly", () => {
    test("Check if we have coords was applied to each ship correctly", () => {
        expect(board.placeShips(ships)).toStrictEqual(ships);
    });
});


