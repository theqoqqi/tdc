import GameObject from "./GameObject.js";

export default class Item extends GameObject {

    static itemScores = {
        'apple': 1,
        'green-apple': 2,
        'cheese': 3,
        'mushroom': 4,
    };

    constructor(options) {
        super('item', options);

        this.setScoreObject();
    }

    setScoreObject() {
        this.score = Item.itemScores[this.type] ?? 0;
    }
}