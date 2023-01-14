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
            type: 'move',
            steps: [
                'up',
                'up-right',
            ],
            count: 6,
        },
        {
            type: 'move',
            steps: [
                'left',
                'down-left',
            ],
            count: 4,
        },
        {
            type: 'move',
            steps: [
                'left',
                'left',
                'down-left',
            ],
            count: 2,
        },
        {
            type: 'move',
            steps: [
                'down-right',
                'down-right',
            ],
            count: 2,
        },
        {
            type: 'move',
            steps: [
                'up-right',
                'up-right',
                'up-right',
                'up-right',
            ]
        },
    ]
};

export default level1;