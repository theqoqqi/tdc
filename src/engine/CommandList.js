export default class CommandList {

    constructor() {
        this.commands = [];
    }

    getAllCommands() {
        let commands = [];
        for (let commandKey in this) {
            commands.push(this[commandKey]);
        }
        return commands;
    }

    addCommand(command, index = undefined) {
        if (index === undefined) {
            this.commands.push (command);
        }
        this.commands.splice (index, 0, command);
    }

    removeCommand(command) {
        let index = this.commands.indexOf(command);
        this.commands.splice (index, 1);
    }
}