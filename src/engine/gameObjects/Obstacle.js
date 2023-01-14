import GameObject from "./GameObject.js";

export default class Obstacle extends GameObject {

    constructor(options) {
        super('obstacle', options);
    }

    get isPassable () {
        return false;
    }

}