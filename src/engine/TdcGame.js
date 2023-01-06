export default class TdcGame {

    constructor() {
        this.world = {};
        this.player = {};
        this.finish = {};
    }

    createWorld(width, height) {
        this.world = {
            width: width,
            height: height,
        };
    }

    setPlayerPosition(x, y) {
        this.player = {
            x: x,
            y: y,
        }
    };

    setFinishPosition(x, y) {
        this.finish = {
            x: x,
            y: y,
        }
    };
}