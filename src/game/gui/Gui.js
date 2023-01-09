import CommandElementFactory from './CommandElementFactory.js';

export default class Gui {

    constructor(htmlGame) {
        this.htmlGame = htmlGame;
        this.game = htmlGame.game;
        this.$unusedCommands = $('.unused-commands');
        this.$usedCommands = $('.used-commands');
        this.$playButton = $('.play-button');
        this.$stopButton = $('.stop-button');
        this.$nextLevelButton = $('.next-level-button');
        this.isPlaying = false;
        this.isLevelDone = false;

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

        this.$unusedCommands.on('click', '.command', e => {
            let $command = $(e.currentTarget);
            let index = $command.index();

            this.$usedCommands.append($command);
            this.#addCommand(index);
        });

        this.$usedCommands.on('click', '.command', e => {
            let $command = $(e.currentTarget);
            let index = $command.index();

            this.$unusedCommands.append($command);
            this.#removeCommand(index);
        });

        this.$playButton.click(e => {
            this.play();
        });

        this.$stopButton.click(e => {
            this.stop();
        });

        this.$nextLevelButton.click(e => {
            this.loadNextLevel();
        });

        this.setPlaying(false);
    }

    #addCommand(unusedCommandIndex, usedCommandIndex = null) {
        let unusedCommands = this.game.getUnusedCommands();
        let command = unusedCommands[unusedCommandIndex];

        this.game.addCommand(command, usedCommandIndex);
    }

    #removeCommand(usedCommandIndex, unusedCommandIndex = null) {
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

        if (this.game.isLevelDone !== this.isLevelDone) {
            this.setLevelDone(this.game.isLevelDone);
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
        let $command = CommandElementFactory.create(command);

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

    loadNextLevel() {
        this.htmlGame.loadNextLevel();
    }

    setPlaying(isPlaying) {
        this.isPlaying = isPlaying;
        this.$playButton.toggle(!isPlaying);
        this.$stopButton.toggle(isPlaying);
        this.unusedCommandsSortable.option('disabled', isPlaying);
        this.usedCommandsSortable.option('disabled', isPlaying);
    }

    setLevelDone(isLevelDone) {
        this.isLevelDone = isLevelDone;
        this.$nextLevelButton.prop('disabled', !!isLevelDone); // TODO: инвертировал для тестов, убрать один !
    }
}