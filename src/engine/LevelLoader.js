import Command from "./commands/Command.js";
import Player from "./gameObjects/Player.js";
import Finish from "./gameObjects/Finish.js";
import Item from "./gameObjects/Item.js";
import Obstacle from "./gameObjects/Obstacle.js";

export default class LevelLoader {

    static gameObjectClasses = {
        player: Player,
        finish: Finish,
        item: Item,
        obstacle: Obstacle,
    };

    constructor(game) {
        this.level = null;
        this.game = game;
        this.world = game.world;
    }

    loadLevelFromJson(level) {
        this.level = level;

        this.loadStaticLevelData(level);
        this.loadDynamicLevelData(level);
    }

    loadDynamicLevelData(level) {
        this.game.setScore(level.initialScore);
        this.world.objects = [];
        this.addObjects(level);
        this.world.addPlayer(level.start.x, level.start.y);
        this.world.addFinish(level.finish.x, level.finish.y);
    }

    loadStaticLevelData(level) {
        this.game.setPlaying(false);
        this.game.setLevelDone(false);
        this.game.programCommandsList.commands = [];
        this.game.commandPalette.clear();
        this.world.setWorldSize(level.width, level.height);
        this.addCommands(level);
    }

    restoreLevel() {
        this.loadDynamicLevelData(this.level);
    }

    addCommands(level) {
        for (const commandJson of level.commands) {
            let command = new Command(this.game, commandJson);

            this.game.commandPalette.addCommand(command, commandJson.count ?? 1);
        }
    }

    addObjects(level) {
        if (!level.objects) {
            return
        }

        for (const objectJson of level.objects) {
            let gameObjectClass = LevelLoader.gameObjectClasses[objectJson.className];
            let object = new gameObjectClass(objectJson);
            this.world.objects.push(object);
        }
    }
}