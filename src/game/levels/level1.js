
const level1 = {
    width: 5,
    height: 5,
    start: { x: 1, y: 5 },
    finish: { x: 5, y: 1 },
    commands: [
        {
            className: 'move',
            steps: [
                'up',
            ]
        },
        {
            className: 'move',
            steps: [
                'right',
                'right',
            ]
        },
        {
            className: 'move',
            steps: [
                'up-right',
            ]
        },
        {
            className: 'move',
            steps: [
                'up-right',
                'up',
            ]
        },
    ]
};

export default level1;