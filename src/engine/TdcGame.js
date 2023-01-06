export default class TdcGame {

    constructor() {
        this.world = {

            width: 0,
            height: 0,

            player: {
                x: 0,
                y: 0,
                object: true,
            },
            finish: {
                x: 0,
                y: 0,
                object: true,
            },
            getAllObjects() {
                let objects = [];
                for (let worldKey in this) {
                    if (this[worldKey].object === true) {
                        objects.push (this[worldKey]);
                    }
                }
                return objects;
            }
        };
    }

    setSizeWorld(width, height) {
        this.world.width = width;
        this.world.height = height;
    }

    setPlayerPosition(x, y) {
        this.world.player.x = x;
        this.world.player.y = y;
    }

    setFinishPosition(x, y) {
        this.world.finish.x = x;
        this.world.finish.y = y;
    }

}