
export default class CommandElementFactory {

    static #defaultActionRenderer = (action, actionType) => {
        return `<span>${actionType}</span>`;
    };

    static #actionRenderers = {
        'move': (action) => {
            return `<div class='command-icon step-arrow arrow-${action.direction}'>`
        },
    };

    static create(command) {
        let $command = $(`<div class='command'>`);

        for (const action of command.actions) {
            let actionType = this.getActionType(action);
            let renderer = this.#actionRenderers[actionType] ?? this.#defaultActionRenderer;

            $command.append($(renderer(action, actionType)));
        }

        return $command;
    }

    static getActionType(action) {
        return this.pascalCaseToKebabCase(action.constructor.name).slice(0, -'-action'.length);
    }

    static pascalCaseToKebabCase(string) {
        return string.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
                ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
                : letter;
        }).join('');
    }
}