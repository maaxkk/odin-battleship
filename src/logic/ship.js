"use strict";

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.coords = [];
    }

    hit() {
        this.hits++;
        return this;
    }

    isSunk() {
        return this.hits === this.length
    }
}


module.exports = Ship;
