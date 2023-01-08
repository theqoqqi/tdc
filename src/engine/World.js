export default class World {

    constructor() {
        this.width = 0;
        this.height = 0;
        this.player = {
            x: 0,
            y: 0,
            object: true,
            className: 'player',
        };
        this.finish = {
            x: 0,
            y: 0,
            object: true,
            className: 'finish',
        };
    }

    getAllGameObjects() {
        let objects = [];
        for (let worldKey in this) {
            if (this[worldKey].object === true) {
                objects.push(this[worldKey]);
            }
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
}