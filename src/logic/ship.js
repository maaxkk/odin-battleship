"use strict";

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.coords = [];
        this.direction = Math.floor(Math.random()*2)
    }

    hit() {
        this.hits++;
        return this;
    }
    resetHits() {
        this.hits = 0;
    }
    resetCoords() {
        this.coords = [];
    }
    isSunk() {
        return this.hits === this.length
    }
}


module.exports = Ship;
