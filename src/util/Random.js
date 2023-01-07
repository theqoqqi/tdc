import {default as rngImpl} from './random-impl.js';

export default class Random {

    #implementation;

    constructor(seed) {
        this.setSeed(seed);
    }

    setSeed(seed) {
        this.#implementation = rngImpl(seed);
    }

    nextInt(min = null, max = null) {
        if (min === null && max === null) {
            return this.#implementation.int32();
        }

        if (max === null) {
            max = min;
            min = 0;
        }

        return Math.floor(this.#implementation() * (max - min)) + min;
    }
}