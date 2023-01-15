import Action from "./Action.js";

export default class AttackAction extends Action{

    constructor(game, options) {
        super(game);
        this.direction = options.direction;
        this.damage = options.damage;
    }
}