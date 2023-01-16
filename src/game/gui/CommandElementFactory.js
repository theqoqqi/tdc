
export default class CommandElementFactory {

    static #defaultActionRenderer = (action, actionType) => {
        return `<span>${actionType}</span>`;
    };

    static #actionRenderers = {
        'move': (action) => {
            return `<div class='command-icon step-arrow arrow-${action.direction}'>`
        },
    };

    static create(command, count) {
        let $command = $(`
            <div class='command'>
                <div class='actions'></div>
                <span class='count'>1</span>
            </div>
        `);
        let $actions = $command.find('.actions');
        let $count = $command.find('.count');

        for (const action of command.actions) {
            let actionType = this.getActionType(action);
            let renderer = this.getActionRenderer(actionType);
            let $action = $(renderer(action, actionType));

            $actions.append($action);
        }

        $count.text(count);

        return $command;
    }

    static getActionRenderer(actionType) {
        return this.#actionRenderers[actionType] ?? this.#defaultActionRenderer;
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