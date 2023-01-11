export default class CommandExecutor {

    constructor(game) {
        this.world = game.world;
        this.game = game;
        this.currentRunId = 0;
        this.moveCommands = [
            {
                direction: 'right',
                dx: 1,
                dy: 0,
            },
            {
                direction: 'up',
                dx: 0,
                dy: -1,
            },
            {
                direction: 'up-right',
                dx: 1,
                dy: -1,
            },
            {
                direction: 'left',
                dx: -1,
                dy: 0,
            },
            {
                direction: 'up-left',
                dx: -1,
                dy: -1,
            },
            {
                direction: 'down',
                dx: 0,
                dy: 1,
            },
            {
                direction: 'down-left',
                dx: -1,
                dy: 1,
            },
            {
                direction: 'down-right',
                dx: 1,
                dy: 1,
            },
        ];
    }

    move(direction) {
        for (const command of this.moveCommands) {
            if (direction === command.direction) {
                this.world.player.x += command.dx;
                this.world.player.y += command.dy;
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run() {
        let runId = ++this.currentRunId;
        let commands = this.game.getUsedCommands();

        for (const command of commands) {
            for (const step of command.steps) {
                if (!this.game.isPlaying) {
                    return;
                }

                if (runId !== this.currentRunId) {
                    return;
                }

                if (!this.shouldMove(step.direction)) {
                    return;
                }

                this.move(step.direction);
                this.collectItems();

                if (this.isLevelDone()) {
                    this.game.setLevelDone(true);
                    return;
                }

                await this.sleep(500);
            }
        }
    }

    shouldMove(direction) {
        let x = this.world.player.x;
        let y = this.world.player.y;
        for (const command of this.moveCommands) {
            if (direction === command.direction) {
                x += command.dx;
                y += command.dy;
            }
        }
        return this.world.isInBounds(x, y);
    }

    isLevelDone() {
        let x = this.world.player.x;
        let y = this.world.player.y;
        return x === this.world.finish.x && y === this.world.finish.y
    }

    collectItems() {
        let x = this.world.player.x;
        let y = this.world.player.y;
        for (const object of this.world.objects) {
            if (x === object.x && y === object.y && object.className === 'item') {
                this.game.addScore (object.score);
                this.world.removeObject (object);
            }
        }
    }

}