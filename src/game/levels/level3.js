const level3 = {
    width: 7,
    height: 7,
    start: {x: 1, y: 7},
    finish: {x: 1, y: 3},
    objects: [
        {
            className: 'item',
            type: 'apple',
            x: 2,
            y: 1,
        },
        {
            className: 'item',
            type: 'green-apple',
            x: 5,
            y: 4,
        },
        {
            className: 'item',
            type: 'cheese',
            x: 5,
            y: 7,
        },
        {
            className: 'item',
            type: 'mushroom',
            x: 7,
            y: 1,
        },
        {
            className: 'obstacle',
            type: 'wall',
            x: 3,
            y: 6,
        },
        {
            className: 'obstacle',
            type: 'wall',
            x: 3,
            y: 7,
        },
        {
            className: 'obstacle',
            type: 'wall',
            x: 2,
            y: 4,
        },
        {
            className: 'obstacle',
            type: 'wall',
            x: 3,
            y: 4,
        },
        {
            className: 'obstacle',
            type: 'wall',
            x: 4,
            y: 4,
        },
        {
            className: 'obstacle',
            type: 'grave',
            variant: 'monument',
            x: 6,
            y: 1,
        },
        {
            className: 'obstacle',
            type: 'grave',
            variant: 'cross',
            x: 6,
            y: 2,
        },
    ],
    commands: [
        {
            type: 'move',
            steps: [
                'up',
                'up-right',
                'right',
                'right',
                'right',
            ],
        },
        {
            type: 'move',
            steps: [
                'up-right',
                'up-right',
                'up',
                'up',
                'down',
            ],
        },
        {
            type: 'move',
            steps: [
                'down',
                'down',
                'down-left',
                'down-right',
                'down-left',
            ],
        },
        {
            type: 'move',
            steps: [
                'left',
                'up',
                'up',
                'up',
            ],
        },
        {
            type: 'move',
            steps: [
                'up',
                'left',
            ],
        },
        {
            type: 'move',
            steps: [
                'up-left',
                'up-left',
            ],
        },
        {
            type: 'move',
            steps: [
                'down-left',
                'down',
            ],
        },
    ],
};

export default level3;