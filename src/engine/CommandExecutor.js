export default class CommandExecutor {

    constructor(game) {
        this.world = game.world;
        this.game = game;
        this.currentRunId = 0;
        this.directionDeltas = {
            'right': {
                dx: 1,
                dy: 0,
            },
            'up': {
                dx: 0,
                dy: -1,
            },
            'up-right': {
                dx: 1,
                dy: -1,
            },
            'left': {
                dx: -1,
                dy: 0,
            },
            'up-left': {
                dx: -1,
                dy: -1,
            },
            'down': {
                dx: 0,
                dy: 1,
            },
            'down-left': {
                dx: -1,
                dy: 1,
            },
            'down-right': {
                dx: 1,
                dy: 1,
            },
        };
    }

    move(direction) {
        let delta = this.directionDeltas[direction];

        this.world.player.x += delta.dx;
        this.world.player.y += delta.dy;
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
        let delta = this.directionDeltas[direction];
        let isTargetPassable = this.world.isCellPassable(x + delta.dx, y + delta.dy);

        if (delta.x !== 0 && delta.y !== 0) {
            let isXNeighborPassable = this.world.isCellPassable(x + delta.dx, y);
            let isYNeighborPassable = this.world.isCellPassable(x, y + delta.dy);

            return isXNeighborPassable
                && isYNeighborPassable
                && isTargetPassable;
        }

        return isTargetPassable;
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
                this.game.addScore(object.score);
                this.world.removeObject(object);
            }
        }
    }

}