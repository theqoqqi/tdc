
export default class CommandDivFactory {

    static #commandTypes = {
        move(command, $command) {
            $command.text(`${command.type} ${command.steps.map(step => step.direction).join(',')}`);
        },
    };

    static create(command) {
        let $command = $('<div class="command">');
        let commandType = this.#commandTypes[command.type] ?? (() => {});

        commandType(command, $command);

        return $command;
    }
}