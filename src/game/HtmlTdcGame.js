import level1 from './levels/level1.js';
import TdcGame from '../engine/TdcGame.js';
import WorldRenderer from '../game/WorldRenderer.js';
import Gui from './gui/Gui.js';

export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();
        let worldRenderer = new WorldRenderer('.world', game);
        let gui = new Gui({
            game,
            unusedCommandsSelector: '.unused-commands',
            usedCommandsSelector: '.used-commands',
        });

        game.loadLevelFromJson(level1);

        worldRenderer.render();
        gui.refillCommands();
    }
}