export default class CommandExecutor {

    constructor(world) {
        this.world = world;
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
}