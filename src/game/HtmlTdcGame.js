import level1 from './levels/level1.js';
import level2 from './levels/level2.js';
import level3 from './levels/level3.js';
import level4 from './levels/level4.js';
import TdcGame from '../engine/TdcGame.js';
import WorldRenderer from '../game/WorldRenderer.js';
import Gui from './gui/Gui.js';
import AudioController from './AudioController.js';

export default class HtmlTdcGame {

    static #levels = [
        level1,
        level2,
        level3,
        level4,
    ];

    #currentLevel = -1;

    constructor() {
        this.game = new TdcGame();
        this.worldRenderer = new WorldRenderer('.world', this);
        this.gui = new Gui(this);
        this.audio = new AudioController();

        this.audio.waitForInteraction();
        this.loadNextLevel();

        window.htmlGame = this;

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

    get currentLevel() {
        return this.#currentLevel;
    }
}