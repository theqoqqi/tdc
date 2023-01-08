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
        this.objects = [
        //     {
        //         className: 'item',
        //         type: 'apple',
        //         x: 0,
        //         y: 0,
        //     },
        //     {
        //         className: 'item',
        //         type: 'green-apple',
        //         x: 0,
        //         y: 0,
        //     },
        //     {
        //         className: 'item',
        //         type: 'cheese',
        //         x: 0,
        //         y: 0,
        //     },
        //     {
        //         className: 'item',
        //         type: 'mushroom',
        //         x: 0,
        //         y: 0,
        //     },
        ];
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
}