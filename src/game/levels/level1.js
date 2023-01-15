
const level1 = {
    width: 5,
    height: 5,
    initialScore: 6,
    start: { x: 1, y: 5 },
    finish: { x: 5, y: 1 },
    commands: [
        {
            actions: [
                'move up',
            ]
        },
        {
            actions: [
                'move right',
                'move right',
            ]
        },
        {
            actions: [
                'move up-right',
            ]
        },
        {
            actions: [
                'move up-right',
                'move up',
            ]
        },
    ]
};

export default level1;