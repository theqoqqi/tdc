import World from '../engine/World.js';
export default class TdcGame {

    constructor() {
        this.world = new World();
    }

    setSizeWorld(width, height) {
        this.world.setSizeWorld (width,height);
    }

    setPlayerPosition(x, y) {
        this.world.setPlayerPosition(x, y);
    }

    setFinishPosition(x, y) {
        this.world.setFinishPosition(x, y);
    }

    loadLevelFromJson (level) {
        this.setSizeWorld(level.width, level.height);
        this.setPlayerPosition(level.start.x, level.start.y);
        this.setFinishPosition(level.finish.x, level.finish.y);
    }
}