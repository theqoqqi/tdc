import Item from "../gameObjects/Item.js";
import Command from "./Command.js";

export default class CommandExecutor {

    constructor(game) {
        this.world = game.world;
        this.game = game;
        this.currentRunId = 0;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run() {
        let runId = ++this.currentRunId;
        let commands = this.game.getUsedCommands();

        for (const command of commands) {
            for (const action of command.getActions()) {
                if (!this.game.isPlaying) {
                    return Command.STOP_REASON_GENERIC;
                }

                if (runId !== this.currentRunId) {
                    return Command.STOP_REASON_GENERIC;
                }

                let result = action.execute();

                if (result) {
                    return result;
                }

                this.collectItems();

                if (this.isLevelDone()) {
                    this.game.setLevelDone(true);
                    return Command.STOP_REASON_GENERIC;
                }

                await this.sleep(500);
            }
        }
    }

    isLevelDone() {
        let x = this.world.player.x;
        let y = this.world.player.y;

        return x === this.world.finish.x && y === this.world.finish.y && this.game.score >= 0;
    }

    collectItems() {
        let x = this.world.player.x;
        let y = this.world.player.y;
        let object = this.world.getObjectAt(x, y);

        if (object instanceof Item) {
            this.game.addScore(object.score);
            this.world.removeObject(object);
        }
    }
}