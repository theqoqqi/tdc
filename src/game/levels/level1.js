
const level1 = {
    width: 5,
    height: 5,
    start: { x: 1, y: 5 },
    finish: { x: 5, y: 1 },
    commands: [
        {
            type: 'move',
            steps: [
                'up',
            ]
        },
        {
            type: 'move',
            steps: [
                'right',
                'right',
            ]
        },
        {
            type: 'move',
            steps: [
                'up-right',
            ]
        },
        {
            type: 'move',
            steps: [
                'up-right',
                'up',
            ]
        },
    ]
};

export default level1;