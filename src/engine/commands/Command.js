import ActionFactory from "./actions/ActionFactory.js";

export default class Command {

    constructor(game, options) {
        this.world = game.world;
        this.game = game;
        this.type = options.type;
        this.actions = options.actions.map((actionString) => {
            return ActionFactory.parse(game, actionString);
        });
    }

    getActions() {
        return this.actions;
    }

}