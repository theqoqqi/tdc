const level1 = {
    width: 7,
    height: 7,
    initialScore: 100,
    start: {x: 4, y: 7},
    finish: {x: 4, y: 1},
    objects: [
        {
            className: 'item',
            type: 'apple',
            x: 2,
            y: 2,
        },
        {
            className: 'item',
            type: 'green-apple',
            x: 2,
            y: 6,
        },
        {
            className: 'item',
            type: 'cheese',
            x: 6,
            y: 2,
        },
        {
            className: 'item',
            type: 'mushroom',
            x: 6,
            y: 6,
        },
    ],
    commands: [
        {
            actions: [
                'move up',
                'move up-right',
            ],
            count: 6,
        },
        {
            actions: [
                'move left',
                'move down-left',
            ],
            count: 4,
        },
        {
            actions: [
                'move left',
                'move left',
                'move down-left',
            ],
            count: 2,
        },
        {
            actions: [
                'move down-right',
                'move down-right',
            ],
            count: 2,
        },
        {
            actions: [
                'move up-right',
                'move up-right',
                'move up-right',
                'move up-right',
            ]
        },
    ]
};

export default level1;