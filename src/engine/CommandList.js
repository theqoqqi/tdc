export default class CommandList {

    constructor() {
        this.commands = [];
    }

    getAllCommands() {
        let commands = [];
        for (let command of this.commands) {
            commands.push(command);
        }
        return commands;
    }

    addCommand(command, index = undefined) {
        if (index !== undefined) {
            this.commands.splice (index, 0, command);
        } else {
            this.commands.push (command);
        }
    }

    removeCommand(command) {
        let index = this.commands.indexOf(command);
        this.commands.splice (index, 1);
    }

    reorderCommand(command, toIndex) {
        this.removeCommand(command);
        this.addCommand(command, toIndex);
    }
}