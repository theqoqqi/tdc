
const level4 = {
    width: 5,
    height: 5,
    initialScore: 10,
    start: { x: 1, y: 5 },
    finish: { x: 1, y: 1 },
    objects: [
        {
            className: 'chest',
            type: 'wooden',
            x: 4,
            y: 1,
            content: {
                type: 'command',
                command: {
                    actions: [
                        'move up',
                        'move up',
                        'move up',
                    ]
                },
            },
        },
        {
            className: 'chest',
            type: 'wooden',
            x: 5,
            y: 5,
            content: {
                type: 'item',
                item: {
                    type: 'mushroom',
                },
            },
        },
        {
            className: 'item',
            type: 'green-apple',
            x: 3,
            y: 3,
        },
    ],
    commands: [
        {
            actions: [
                'move right',
                'move right',
            ]
        },
        {
            actions: [
                'move up',
                'move down',
            ]
        },
        {
            actions: [
                'move up-right',
                'move right',
            ]
        },
        {
            actions: [
                'use down',
            ]
        },
        {
            actions: [
                'move down-left',
                'move up-left',
                'use right',
            ]
        },
        {
            actions: [
                'move left',
                'move left',
            ]
        },
    ]
};

export default level4;