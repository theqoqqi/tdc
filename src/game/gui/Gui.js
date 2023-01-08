import CommandDivFactory from './CommandDivFactory.js';

export default class Gui {

    constructor(game) {
        this.game = game;
        this.$unusedCommands = $('.unused-commands');
        this.$usedCommands = $('.used-commands');
        this.$playButton = $('.play-button');
        this.$stopButton = $('.stop-button');
        this.isPlaying = false;

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
            animation: 150,
            onAdd: e => this.#addCommand(e.oldIndex, e.newIndex),
            onRemove: e => this.#removeCommand(e.oldIndex, e.newIndex),
            onUpdate: e => this.#reorderCommand(e.oldIndex, e.newIndex),
        });

        this.$playButton.click(e => {
            this.play();
        });

        this.$stopButton.click(e => {
            this.stop();
        });
    }

    #addCommand(unusedCommandIndex, usedCommandIndex) {
        let unusedCommands = this.game.getUnusedCommands();
        let command = unusedCommands[unusedCommandIndex];

        this.game.addCommand(command, usedCommandIndex);
    }

    #removeCommand(usedCommandIndex, unusedCommandIndex) {
        let usedCommands = this.game.getUsedCommands();
        let command = usedCommands[usedCommandIndex];

        this.game.removeCommand(command, unusedCommandIndex);
    }

    #reorderCommand(fromIndex, toIndex) {
        let usedCommands = this.game.getUsedCommands();
        let command = usedCommands[fromIndex];

        this.game.reorderCommand(command, toIndex);
    }

    update() {
        if (this.game.isPlaying !== this.isPlaying) {
            this.setPlaying(this.game.isPlaying);
        }
    }

    refillCommands() {
        this.clearCommands();
        this.fillCommands();
    }

    fillCommands() {
        for (const command of this.game.getUnusedCommands()) {
            this.addUnusedCommand(command);
        }
    }

    clearCommands() {
        this.$unusedCommands.empty();
        this.$usedCommands.empty();
    }

    addUnusedCommand(command) {
        let $command = CommandDivFactory.create(command);

        this.$unusedCommands.append($command);
    }

    play() {
        this.game.play();
        this.setPlaying(true);
    }

    stop() {
        this.game.stop();
        this.setPlaying(false);
    }

    setPlaying(isPlaying) {
        this.isPlaying = isPlaying;
        this.$playButton.toggle(!isPlaying);
        this.$stopButton.toggle(isPlaying);
    }
}