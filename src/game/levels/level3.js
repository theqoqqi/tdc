const level3 = {
    width: 7,
    height: 7,
    initialScore: 100,
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
            actions: [
                'move up',
                'move up-right',
                'move right',
                'move right',
                'move right',
            ],
        },
        {
            actions: [
                'move down',
                'move down',
                'move down-left',
                'move down-right',
                'move down-left',
            ],
        },
        {
            actions: [
                'move down-left',
                'move down',
            ],
        },
        {
            actions: [
                'move up-right',
                'move up-right',
                'move up',
                'move up',
                'move down',
            ],
        },
        {
            actions: [
                'move up-left',
                'move up-left',
            ],
        },
        {
            actions: [
                'move left',
                'move up',
                'move up',
                'move up',
            ],
        },
        {
            actions: [
                'move up',
                'move left',
            ],
        },
    ],
};

export default level3;