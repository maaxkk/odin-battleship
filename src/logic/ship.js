"use strict";

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
        return this;
    }

    isSunk() {
        if (this.hits === this.length) {
            return true;
        }
        return false;
    }
}

module.exports = Ship;
