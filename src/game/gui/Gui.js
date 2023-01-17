import CommandElementFactory from './CommandElementFactory.js';

export default class Gui {

    constructor(htmlGame) {
        this.htmlGame = htmlGame;
        this.game = htmlGame.game;
        this.$paletteCommands = $('.palette-commands');
        this.$programCommands = $('.program-commands');
        this.$playButton = $('.play-button');
        this.$stopButton = $('.stop-button');
        this.$nextLevelButton = $('.next-level-button');
        this.$scoreSpan = $('.score-number');
        this.isPlaying = false;
        this.isLevelDone = false;

        this.paletteCommandsSortable = new Sortable(this.$paletteCommands[0], {
            group: {
                name: 'commands',
                put: true,
                pull: 'clone',
            },
            onAdd: e => $(e.item).remove(),
            animation: 150,
            sort: false,
        });

        this.programCommandsSortable = new Sortable(this.$programCommands[0], {
            group: 'commands',
            animation: 150,
            onAdd: e => this.#addCommand(e.oldIndex, e.newIndex),
            onRemove: e => this.#removeCommand(e.oldIndex),
            onUpdate: e => this.#reorderCommand(e.oldIndex, e.newIndex),
        });

        this.$paletteCommands.on('click', '.command', e => {
            if (this.isPlaying) {
                return;
            }

            let $command = $(e.currentTarget);
            let index = $command.index();
            let paletteCommands = this.game.getPaletteCommands();
            let command = paletteCommands[index];

            if (!this.game.commandPalette.hasCommand(command)) {
                return;
            }

            this.$programCommands.append($command.clone());
            this.#addCommand(index);
        });

        this.$programCommands.on('click', '.command', e => {
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

    #addCommand(paletteCommandIndex, programCommandIndex = null) {
        let paletteCommands = this.game.getPaletteCommands();
        let command = paletteCommands[paletteCommandIndex];

        if (!this.game.commandPalette.hasCommand(command)) {
            return;
        }

        this.game.addCommand(command, programCommandIndex);
    }

    #removeCommand(programCommandIndex) {
        this.game.removeCommand(programCommandIndex);
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

            this.addProgramCommand(command, count);
        }
    }

    clearCommands() {
        this.$paletteCommands.empty();
        this.$programCommands.empty();
    }

    addProgramCommand(command, count) {
        let $command = CommandElementFactory.create(command, count);

        this.$paletteCommands.append($command);
    }

    setCommandCountInPalette(command, count) {
        let paletteCommands = this.game.getPaletteCommands();
        let indexInPalette = paletteCommands.indexOf(command);
        let $command = this.$paletteCommands.find('.command').eq(indexInPalette);
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
        this.paletteCommandsSortable.option('disabled', isPlaying);
        this.programCommandsSortable.option('disabled', isPlaying);
    }

    setLevelDone(isLevelDone) {
        this.isLevelDone = isLevelDone;
        this.$nextLevelButton.prop('disabled', !isLevelDone);
    }

    setScore(score) {
        this.$scoreSpan.text(score);
    }
}