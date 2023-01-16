import World from '../engine/World.js';
import CommandList from './commands/CommandList.js';
import CommandExecutor from './commands/CommandExecutor.js';
import LevelLoader from "./LevelLoader.js";
import CommandPalette from "./commands/CommandPalette.js";

export default class TdcGame {

    constructor() {
        this.world = new World();
        this.commandPalette = new CommandPalette();
        this.usedCommandsList = new CommandList();
        this.commandExecutor = new CommandExecutor(this);
        this.levelLoader = new LevelLoader(this);
        this.isPlaying = false;
        this.isLevelDone = false;
        this.score = 0;
    }

    loadLevelFromJson(level) {
        return this.levelLoader.loadLevelFromJson(level);
    }

    getPaletteCommands() {
        return this.commandPalette.getCommands();
    }

    getUsedCommands() {
        return this.usedCommandsList.getAllCommands();
    }

    addCommand(command, index = undefined) {
        this.usedCommandsList.addCommand(command, index);
        this.commandPalette.takeCommand(command);
    }

    removeCommand(command) {
        this.usedCommandsList.removeCommand(command);
        this.commandPalette.putCommand(command);
    }

    reorderCommand(command, toIndex) {
        this.usedCommandsList.reorderCommand(command, toIndex);
    }

    play() {
        this.isPlaying = true;
        this.commandExecutor.run();
    }

    stop() {
        this.isPlaying = false;
        this.levelLoader.restoreLevel();
    }

    setLevelDone(bool) {
        this.isLevelDone = bool;
    }

    setPlaying(bool) {
        this.isPlaying = bool;
    }

    addScore(score) {
        this.score += score;
    }

    setScore(score) {
        this.score = score;
    }
}