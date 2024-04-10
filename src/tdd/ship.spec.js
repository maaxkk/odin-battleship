"use strict";

const Ship = require("../logic/ship.js");

const smallShip = new Ship(3);
smallShip.hit().hit().hit();

describe("Ship", () => {
    test("Should return true, ship is sunk", () => {
        expect(smallShip.isSunk()).toBe(true);
    });
});
