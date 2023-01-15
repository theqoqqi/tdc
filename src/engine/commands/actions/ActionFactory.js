import MoveAction from "./MoveAction.js";
import AttackAction from "./AttackAction.js";

export default class ActionFactory {

    static classes = {
        move: MoveAction,
        attack: AttackAction,
    }

    static parsers = {
        move: function (args) {
            return {
                direction: args[0],
            }
        },
        attack: function (args) {
            return {
                direction: args[0],
                damage: +args[1],
            }
        }
    };

    static parseOptions(type, args) {
        let parser = this.parsers[type];

        if (!parser) {
            console.error(`No parser for action type '${type}'`);
            return {};
        }

        return parser(args);
    }

    static parse(game, actionString) {
        let parts = actionString.split(' ');
        let type = parts[0];
        let args = parts.slice(1);
        let actionClass = this.classes[type];
        let options = this.parseOptions(type, args);

        return new actionClass(game, options);
    }
}