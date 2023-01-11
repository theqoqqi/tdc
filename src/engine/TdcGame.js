import World from '../engine/World.js';
import CommandList from '../engine/CommandList.js';
import CommandExecutor from '../engine/CommandExecutor.js';
import Item from "./gameObjects/Item.js";
import Obstacle from "./gameObjects/Obstacle.js";
import Finish from "./gameObjects/Finish.js";
import Player from "./gameObjects/Player.js";

export default class TdcGame {

    static gameObjectClasses = {
        player: Player,
        finish: Finish,
        item: Item,
        obstacle: Obstacle,
    };

    constructor() {
        this.world = new World();
        this.unusedCommandsList = new CommandList();
        this.usedCommandsList = new CommandList();
        this.commandExecutor = new CommandExecutor(this);
        this.level = null;
        this.isPlaying = false;
        this.isLevelDone = false;
        this.score = 0;
    }

    setWorldSize(width, height) {
        this.world.setWorldSize(width, height);
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

    play() {
        this.isPlaying = true;
        this.commandExecutor.run();
    }

    isInBounds(x, y) {
        return this.world.isInBounds(x, y);
    }

    stop() {
        this.isPlaying = false;
        this.loadDynamicLevelData(this.level);
    }

    setLevelDone(bool) {
        this.isLevelDone = bool;
    }

    setPlaying(bool) {
        this.isPlaying = bool;
    }

    addObjects(level) {
        if (!level.objects) {
            return
        }
        for (const objectJson of level.objects) {
            let gameObjectClass = TdcGame.gameObjectClasses[objectJson.className];
            let object = new gameObjectClass (objectJson);
            if (object.type === 'apple') {
                object.score = 1;
            }
            if (object.type === 'green-apple') {
                object.score = 2;
            }
            if (object.type === 'cheese') {
                object.score = 3;
            }
            if (object.type === 'mushroom') {
                object.score = 4;
            }
            this.world.objects.push(object);
        }
    }

    addScore(score) {
        this.score += score;
    }

    loadLevelFromJson(level) {
        this.level = level;

        this.loadStaticLevelData(level);
        this.loadDynamicLevelData(level);
    }

    loadDynamicLevelData(level) {
        this.score = 0;
        this.world.objects = [];
        this.addObjects(level);
        this.world.addPlayer(level.start.x, level.start.y);
        this.world.addFinish(level.finish.x, level.finish.y);
    }

    loadStaticLevelData(level) {
        this.setPlaying(false);
        this.setLevelDone(false);
        this.usedCommandsList.commands = [];
        this.unusedCommandsList.commands = [];
        this.setWorldSize(level.width, level.height);
        this.addCommands(level);
    }
}