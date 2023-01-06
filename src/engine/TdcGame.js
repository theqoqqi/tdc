export default class TdcGame {

    constructor() {
        this.world = {
            width: 0,
            height: 0,
        };
        this.player = {
            x: 0,
            y: 0,
        };
        this.finish = {
            x: 0,
            y: 0,
        };
    }

    setSizeWorld(width, height) {
        this.world.width = width;
        this.world.height = height;
    }

    setPlayerPosition(x, y) {
        this.player.x = x;
        this.player.y = y;
    };

    setFinishPosition(x, y) {
        this.finish.x = x;
        this.finish.y = y;
    }
}