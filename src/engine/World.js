export default class World {

    constructor() {
        this.width = 0;
        this.height = 0;
        this.objects = [];
    }

    addPlayer(x, y) {
        let player = {
            x: x,
            y: y,
            z: 1,
            className: 'player',
        };
        this.player = player;
        this.addObject(player);
    }

    addFinish(x, y) {
        let finish = {
            x: x,
            y: y,
            z: 0,
            className: 'finish',
        };
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

    removeObject(object) {
        let index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
    }

    addObject(object) {
        this.objects.push(object);
    }
}