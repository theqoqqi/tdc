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
    };

    static get grassAtlas() {
        return this.#grassAtlas;
    }

    static get(name) {
        return this.#gameObjectAtlases[name] ?? null; // TODO: добавить атлас по умолчанию
    }
}