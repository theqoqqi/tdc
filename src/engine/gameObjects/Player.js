import GameObject from "./GameObject.js";

export default class Player extends GameObject {

    constructor(options) {
        super('player', options);
        this.isAlive = true;
    }

    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            z: 1,
        };
    }

    kill () {
        this.isAlive = false;
    }
}
