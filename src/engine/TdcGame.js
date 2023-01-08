import World from '../engine/World.js';
import CommandList from '../engine/CommandList.js';
import CommandExecutor from '../engine/CommandExecutor.js';

export default class TdcGame {

    constructor() {
        this.world = new World();
        this.unusedCommandsList = new CommandList();
        this.usedCommandsList = new CommandList();
        this.commandExecutor = new CommandExecutor(this.world);
        this.level = null;
        this.isPlaying = false;
    }


    setSizeWorld(width, height) {
        this.world.setSizeWorld(width, height);
    }

    setPlayerPosition(x, y) {
        this.world.setPlayerPosition(x, y);
    }

    setFinishPosition(x, y) {
        this.world.setFinishPosition(x, y);
    }

    getUnusedCommands() {
        return this.unusedCommandsList.getAllCommands();
    }

    getUsedCommands() {
        return this.usedCommandsList.getAllCommands();
    }

    addCommands(level) {
        for (const command of level.commands) {
            let steps = command.steps;
            command.steps = [];
            for (let i = 0; i < steps.length; i++) {
                command.steps.push({direction: steps[i]});
            }
            this.unusedCommandsList.addCommand(command);
        }
    }

    addCommand(command, index = undefined) {
        this.usedCommandsList.addCommand(command, index);
        this.unusedCommandsList.removeCommand(command);
    }

    removeCommand(command, index = undefined) {
        this.usedCommandsList.removeCommand(command);
        this.unusedCommandsList.addCommand(command, index);
    }

    reorderCommand(command, toIndex) {
        this.usedCommandsList.reorderCommand(command, toIndex);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async play() {
        this.isPlaying = true;
        let commands = this.getUsedCommands();
        for (let i = 0; i < commands.length ; i++) {
            for (let j = 0; j < commands[i].steps.length; j++) {
                if (this.isPlaying) {
                    this.commandExecutor.move(commands[i].steps[j].direction);
                    await this.sleep(500);
                    console.log(this.world.player.x);
                    console.log(this.world.player.y);
                }
            }
        }
    }

    stop() {
        this.isPlaying = false;
        this.setPlayerPosition(this.level.start.x, this.level.start.y);
    }

    loadLevelFromJson(level) {
        this.level = level;
        this.usedCommandsList.commands = [];
        this.unusedCommandsList.commands = [];
        this.setSizeWorld(level.width, level.height);
        this.setPlayerPosition(level.start.x, level.start.y);
        this.setFinishPosition(level.finish.x, level.finish.y);
        this.addCommands(level);
    }
}