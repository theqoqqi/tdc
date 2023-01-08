import SpriteAtlas from './SpriteAtlas.js';

export default class SpriteAtlases {

    static #grassAtlas = new SpriteAtlas({
        texturePath: 'assets/images/grass.png',
        spriteWidth: 32,
        spriteHeight: 32,
        columns: 8,
        rows: 4,
    });

    static #gameObjectAtlases = {
        player: new SpriteAtlas({
            texturePath: 'assets/images/objects/player.png',
            spriteWidth: 64,
            spriteHeight: 64,
            columns: 2,
            rows: 2,
        }),
        finish: new SpriteAtlas({
            texturePath: 'assets/images/objects/finish.png',
            spriteWidth: 64,
            spriteHeight: 64,
            columns: 1,
            rows: 1,
        }),
        item: {
            apple: new SpriteAtlas({
                texturePath: 'assets/images/objects/items/apple.png',
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 1,
                rows: 1,
            }),
            'green-apple': new SpriteAtlas({
                texturePath: 'assets/images/objects/items/green-apple.png',
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 1,
                rows: 1,
            }),
            cheese: new SpriteAtlas({
                texturePath: 'assets/images/objects/items/cheese.png',
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 1,
                rows: 1,
            }),
            mushroom: new SpriteAtlas({
                texturePath: 'assets/images/objects/items/mushroom.png',
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 1,
                rows: 1,
            }),
        }
    };

    static get grassAtlas() {
        return this.#grassAtlas;
    }

    static get(className, type) {
        let atlas = this.#gameObjectAtlases[className];

        if (!atlas) {
            return null; // TODO: добавить атлас по умолчанию
        }

        if (!(atlas instanceof SpriteAtlas)) {
            atlas = atlas[type];
        }

        return atlas ?? null; // TODO: добавить атлас по умолчанию
    }
}