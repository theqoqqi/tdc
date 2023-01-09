export default class World {

    constructor() {
        this.width = 0;
        this.height = 0;
        this.player = {
            x: 0,
            y: 0,
            z: 1,
            object: true,
            className: 'player',
        };
        this.finish = {
            x: 0,
            y: 0,
            z: 0,
            object: true,
            className: 'finish',
        };
        this.objects = [];
    }

    getAllGameObjects() {
        let objects = [];
        for (let worldKey in this) {
            if (this[worldKey].object === true) {
                objects.push(this[worldKey]);
            }
        }
        for (const object of this.objects) {
            objects.push(object);
        }
        return objects;
    }

    setSizeWorld(width, height) {
        this.width = width;
        this.height = height;
    }

    setPlayerPosition(x, y) {
        this.player.x = x;
        this.player.y = y;
    }

    setFinishPosition(x, y) {
        this.finish.x = x;
        this.finish.y = y;
    }

    isInBounds(x, y) {
        return x >= 1 && x <= this.width
            && y >= 1 && y <= this.height
    }

    removeObject (object) {
        let index = this.objects.indexOf(object);
        this.objects.splice (index, 1);
    }
}