import World from '../engine/World.js';
import CommandList from '../engine/CommandList.js';

export default class TdcGame {

    constructor() {
        this.world = new World();
        this.unusedCommandsList = new CommandList();
        this.usedCommandsList = new CommandList();
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
        console.log(this.unusedCommandsList.getAllCommands());
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

    play() {
        this.isPlaying = true;
        let commands = this.usedCommandsList;


    }

    stop() {
        this.isPlaying = false;


    }

    loadLevelFromJson(level) {
        this.setSizeWorld(level.width, level.height);
        this.setPlayerPosition(level.start.x, level.start.y);
        this.setFinishPosition(level.finish.x, level.finish.y);
        this.addCommands(level);
    }
}