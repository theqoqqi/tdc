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

    addCommand(command, index = null) {
        if (typeof index === 'number') {
            this.commands.splice (index, 0, command);
        } else {
            this.commands.push (command);
        }
    }

    removeCommand(index) {
        let command = this.commands[index];
        this.commands.splice (index, 1);
        return command;
    }

    reorderCommand(fromIndex, toIndex) {
        let command = this.commands[fromIndex];
        this.removeCommand(fromIndex);
        this.addCommand(command, toIndex);
    }
}