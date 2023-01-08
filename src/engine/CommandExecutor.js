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
        for (let i = 0; i < commands.length; i++) {
            for (let j = 0; j < commands[i].steps.length; j++) {
                if (this.game.isPlaying && this.shouldMove(commands[i].steps[j].direction) && runId === this.currentRunId) {
                    this.move(commands[i].steps[j].direction);
                    await this.sleep(500);
                    console.log(this.world.player.x);
                    console.log(this.world.player.y);
                } else {
                    return;
                }
            }
        }
    }

    shouldMove (direction) {
        let x = this.world.player.x;
        let y = this.world.player.y
        for (const command of this.moveCommands) {
            if (direction === command.direction) {
                x += command.dx;
                y += command.dy;
            }
        }
        return this.world.isInBounds (x, y);
    }
}