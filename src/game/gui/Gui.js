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
        this.$scoreSpan = $('.score-number');
        this.isPlaying = false;
        this.isLevelDone = false;

        this.unusedCommandsSortable = new Sortable(this.$unusedCommands[0], {
            group: {
                name: 'commands',
                put: true,
                pull: 'clone',
            },
            onAdd: e => $(e.item).remove(),
            animation: 150,
            sort: false,
        });

        this.usedCommandsSortable = new Sortable(this.$usedCommands[0], {
            group: 'commands',
            animation: 150,
            onAdd: e => this.#addCommand(e.oldIndex, e.newIndex),
            onRemove: e => this.#removeCommand(e.oldIndex),
            onUpdate: e => this.#reorderCommand(e.oldIndex, e.newIndex),
        });

        this.$unusedCommands.on('click', '.command', e => {
            if (this.isPlaying) {
                return;
            }

            let $command = $(e.currentTarget);
            let index = $command.index();
            let unusedCommands = this.game.getPaletteCommands();
            let command = unusedCommands[index];

            if (!this.game.commandPalette.hasCommand(command)) {
                return;
            }

            this.$usedCommands.append($command.clone());
            this.#addCommand(index);
        });

        this.$usedCommands.on('click', '.command', e => {
            if (this.isPlaying) {
                return;
            }

            let $command = $(e.currentTarget);
            let index = $command.index();

            $command.remove();
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

        $(document).on('keydown', e => {
            if (e.code === 'Enter') {
                this.loadNextLevel();
            }
        });

        this.setPlaying(false);
        this.setLevelDone(false);
        this.setScore(0);
    }

    #addCommand(unusedCommandIndex, usedCommandIndex = null) {
        let unusedCommands = this.game.getPaletteCommands();
        let command = unusedCommands[unusedCommandIndex];

        if (!this.game.commandPalette.hasCommand(command)) {
            return;
        }

        this.game.addCommand(command, usedCommandIndex);
    }

    #removeCommand(usedCommandIndex) {
        this.game.removeCommand(usedCommandIndex);
    }

    #reorderCommand(fromIndex, toIndex) {
        this.game.reorderCommand(fromIndex, toIndex);
    }

    update() {
        if (this.game.isPlaying !== this.isPlaying) {
            this.setPlaying(this.game.isPlaying);
        }

        if (this.game.isLevelDone !== this.isLevelDone) {
            this.setLevelDone(this.game.isLevelDone);
        }

        for (const command of this.game.getPaletteCommands()) {
            let currentCount = this.game.commandPalette.getCommandCount(command);

            this.setCommandCountInPalette(command, currentCount);
        }

        this.setScore(this.game.score);
    }

    refillCommands() {
        this.clearCommands();
        this.fillCommands();
    }

    fillCommands() {
        for (const command of this.game.getPaletteCommands()) {
            let count = this.game.commandPalette.getCommandCount(command);

            this.addUnusedCommand(command, count);
        }
    }

    clearCommands() {
        this.$unusedCommands.empty();
        this.$usedCommands.empty();
    }

    addUnusedCommand(command, count) {
        let $command = CommandElementFactory.create(command, count);

        this.$unusedCommands.append($command);
    }

    setCommandCountInPalette(command, count) {
        let paletteCommands = this.game.getPaletteCommands();
        let indexInPalette = paletteCommands.indexOf(command);
        let $command = this.$unusedCommands.find('.command').eq(indexInPalette);
        let $count = $command.find('.count');
        let countFromText = +$count.text();

        if (countFromText !== count) {
            $count.text(count);
        }
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
        this.$nextLevelButton.prop('disabled', !isLevelDone);
    }

    setScore(score) {
        this.$scoreSpan.text(score);
    }
}