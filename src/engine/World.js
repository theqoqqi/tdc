export default class World {

    constructor() {
        this.width = 0;
        this.height = 0;
        this.player = {
            x: 0,
            y: 0,
            object: true,
            type: 'player',
        };
        this.finish = {
            x: 0,
            y: 0,
            object: true,
            type: 'finish',
        };
        this.objects = [
            {
                type: 'item',
                model: 'apple',
                x: 0,
                y: 0,
            },
            {
                type: 'item',
                model: 'green-apple',
                x: 0,
                y: 0,
            },
            {
                type: 'item',
                model: 'cheese',
                x: 0,
                y: 0,
            },
            {
                type: 'item',
                model: 'mushroom',
                x: 0,
                y: 0,
            },
        ];
    }

    getAllGameObjects() {
        let objects = [];
        for (let worldKey in this) {
            if (this[worldKey].object === true) {
                objects.push(this[worldKey]);
            }
        }
        // for (const object of this.objects) {
        //     objects.push(object);
        // }
        // console.log(objects);
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