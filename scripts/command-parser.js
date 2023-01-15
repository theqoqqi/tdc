
let commands = [
    'move 78999',
    'move 99882',
    'move 22131',
    'move 4888',
    'move 84',
    'move 77',
    'move 12',
];
let parsed = parseCommands(commands);
let json = JSON.stringify(parsed, null, 4);

console.log(json);

function parseCommands(commands) {
    return commands.map(parseCommand);
}

function parseCommand(string) {
    let [type, ...args] = string.split(' ');
    let command = {
        type,
    };

    if (type === 'move') {
        if ('12346789'.includes(args[0][0])) {
            args = args[0].split('');
        }

        command.actions = args.map(step => {
            let mapping = {
                1: 'down-left',
                2: 'down',
                3: 'down-right',
                4: 'left',
                6: 'right',
                7: 'up-left',
                8: 'up',
                9: 'up-right',
            };

            return mapping[step] ?? step;
        });
    }

    return command;
}
