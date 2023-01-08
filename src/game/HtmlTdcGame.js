import level1 from './levels/level1.js';
import TdcGame from '../engine/TdcGame.js';
import WorldRenderer from '../game/WorldRenderer.js';
import Gui from './gui/Gui.js';

export default class HtmlTdcGame {

    constructor() {
        this.game = new TdcGame();
        this.worldRenderer = new WorldRenderer('.world', this.game);
        this.gui = new Gui(this.game);

        this.loadLevel(level1);

        setInterval(() => this.update(), 25);
    }

    loadLevel(levelJson) {
        this.game.loadLevelFromJson(levelJson);

        this.worldRenderer.render();
        this.gui.refillCommands();
    }

    update() {
        this.gui.update();
    }
}