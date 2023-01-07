
export default class Gui {

    constructor({game, unusedCommandsSelector, usedCommandsSelector}) {
        this.game = game;
        this.$unusedCommands = $(unusedCommandsSelector);
        this.$usedCommands = $(usedCommandsSelector);

        this.unusedCommandsSortable = new Sortable(this.$unusedCommands[0], {
            group: {
                name: 'commands',
                put: true,
            },
            animation: 150,
            sort: false,
        });

        this.usedCommandsSortable = new Sortable(this.$usedCommands[0], {
            group: 'commands',
            animation: 150
        });
    }

    render() {
        this.clearCommands();

        for (const command of this.game.getUnusedCommands()) {
            this.addUnusedCommand(command);
        }
    }

    clearCommands() {
        this.$unusedCommands.empty();
        this.$usedCommands.empty();
    }

    addUnusedCommand(command) {
        let $command = this.createCommandDiv(command);

        this.$unusedCommands.append($command);
    }

    createCommandDiv(command) {
        let $command = $('<div class="command">');

        $command.text(`COMMAND ${command.type}`);

        return $command;
    }
}