import Action from "./Action.js";

export default class MoveAction extends Action{

    constructor(game, options) {
        super (game);
        this.direction = options.direction;
    }

    execute () {
        if (this.game.score - 1 < 0) {
            return Action.STOP_REASON_GENERIC;
        }

        if (!this.shouldMove(this.direction)) {
            this.move(this.direction, 0.3);
            this.game.world.player.kill();
            return Action.STOP_REASON_GENERIC;
        }

        this.move(this.direction);
        this.game.addScore(-1);
    }

    move(direction, distance = 1) {
        let delta = Action.directionDeltas[direction];

        this.world.player.x += delta.dx * distance;
        this.world.player.y += delta.dy * distance;
    }

    shouldMove(direction) {
        let x = this.world.player.x;
        let y = this.world.player.y;
        let delta = Action.directionDeltas[direction];
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
}