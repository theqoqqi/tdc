import level1 from './levels/level1.js';
import TdcGame from '../engine/TdcGame.js';
import WorldRenderer from '../game/WorldRenderer.js';

export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();
        let worldRenderer = new WorldRenderer('.world', game);

        // game.loadLevelFromJson(level1);

        game.setSizeWorld(5, 5);
        game.setPlayerPosition(1, 1);
        game.setFinishPosition(5, 5);

        worldRenderer.render();
    }
}