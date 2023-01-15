
export default class CommandElementFactory {

    static #defaultCommandType = (command, $command) => {
        $command.text(`${command.type} ${command.actions.map(step => step.direction).join(',')}`);
    };

    static #commandTypes = {
        move(command, $command) {
            for (const step of command.actions) {
                $command.append(`<div class='command-icon step-arrow arrow-${step.direction}'>`);
            }
        },
    };

    static create(command) {
        let $command = $(`<div class='command'>`);
        let commandType = this.#commandTypes[command.type] ?? this.#defaultCommandType;

        commandType(command, $command);

        return $command;
    }
}