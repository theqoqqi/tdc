import GameObject from "./GameObject.js";

export default class Player extends GameObject {

    constructor(options) {
        super('player', options);
    }

    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            z: 1,
        };
    }
}
