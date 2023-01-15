import Player from "./gameObjects/Player.js";
import Finish from "./gameObjects/Finish.js";
import Item from "./gameObjects/Item.js";

export default class World {

    constructor() {
        this.width = 0;
        this.height = 0;
        this.objects = [];
    }

    addPlayer(x, y) {
        let player = new Player({
            x: x,
            y: y,
        });
        this.player = player;
        this.addObject(player);
    }

    addFinish(x, y) {
        let finish = new Finish({
            x: x,
            y: y,
        });
        this.finish = finish;
        this.addObject(finish);
    }

    getAllGameObjects() {
        return this.objects;
    }

    setWorldSize(width, height) {
        this.width = width;
        this.height = height;
    }

    isInBounds(x, y) {
        return x >= 1 && x <= this.width
            && y >= 1 && y <= this.height
    }

    isCellPassable(x, y) {
        if (!this.isInBounds(x, y)) {
            return false
        }

        let object = this.getObjectAt(x, y);

        if (!object) {
            return true;
        }
        return object.isPassable;
    }

    removeObject(object) {
        let index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
    }

    addObject(object) {
        this.objects.push(object);
    }

    getObjectAt(x, y) {
        for (const object of this.objects) {
            if (x === object.x && y === object.y) {
                return object;
            }
        }
        return null;
    }
}