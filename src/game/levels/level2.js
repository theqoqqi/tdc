const level1 = {
    width: 7,
    height: 7,
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
                'right',
                'right',
                'up-right',
            ]
        },
        {
            type: 'move',
            steps: [
                'up-left',
                'down-left',
                'up-left',
            ]
        },
        {
            type: 'move',
            steps: [
                'up-left',
                'down-left',
                'down-left',
                'up-left',
            ]
        },
        {
            type: 'move',
            steps: [
                'up-right',
                'right',
            ]
        },
        {
            type: 'move',
            steps: [
                'right',
                'right',
                'down',
                'down',
                'up-left',
            ]
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
        {
            type: 'move',
            steps: [
                'left',
                'up-left',
                'down-left',
            ]
        },
    ]
};

export default level1;