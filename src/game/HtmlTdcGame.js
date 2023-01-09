import level1 from './levels/level1.js';
import level2 from './levels/level2.js';
import level3 from './levels/level3.js';
import TdcGame from '../engine/TdcGame.js';
import WorldRenderer from '../game/WorldRenderer.js';
import Gui from './gui/Gui.js';

export default class HtmlTdcGame {

    static #levels = [
        level1,
        level2,
        level3,
    ];

    #currentLevel = -1;

    constructor() {
        this.game = new TdcGame();
        this.worldRenderer = new WorldRenderer('.world', this.game);
        this.gui = new Gui(this);

        this.loadNextLevel();

        setInterval(() => this.update(), 25);
    }

    loadNextLevel() {
        let nextLevel = ++this.#currentLevel;
        let level = HtmlTdcGame.#levels[nextLevel];

        if (level) {
            this.loadLevel(level);
        }
    }

    loadLevel(levelJson) {
        this.game.loadLevelFromJson(levelJson);

        this.worldRenderer.render();
        this.gui.refillCommands();
    }

    update() {
        this.worldRenderer.update();
        this.gui.update();
    }
}