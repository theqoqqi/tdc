export default class Action {

    static STOP_REASON_GENERIC = 1;

    static directionDeltas = {
        'right': {dx: 1, dy: 0},
        'up': {dx: 0, dy: -1},
        'up-right': {dx: 1, dy: -1},
        'left': {dx: -1, dy: 0},
        'up-left': {dx: -1, dy: -1},
        'down': {dx: 0, dy: 1},
        'down-left': {dx: -1, dy: 1},
        'down-right': {dx: 1, dy: 1},
    };

    constructor(game, options) {
        this.world = game.world;
        this.game = game;

    }


}