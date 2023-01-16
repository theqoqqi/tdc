export default class CommandPalette {

    constructor() {
        this.commands = new Map();
    }

    addCommand(command, count) {
        this.commands.set (command, count);
    }

    takeCommand(command) {
        this.#modifyCommandCount(command, -1);
    }

    putCommand(command) {
        this.#modifyCommandCount(command, 1);
    }

    #modifyCommandCount(command, modifyBy) {
        let count = this.commands.get(command);
        this.commands.set(command, count + modifyBy);
    }

    getCommands() {
        return Array.from(this.commands.keys());
    }

    getCommandCount(command) {
        return this.commands.get(command);
    }

    clear() {
        this.commands.clear();
    }

}