import Sprite from './Sprite.js';

export default class SpriteAtlas {

    #sprites;

    #texturePath;

    constructor(options) {
        this.#sprites = this.generateSprites(options);
        this.#texturePath = options.texturePath;
    }

    generateSprites({spriteWidth, spriteHeight, rows, columns}) {
        let sprites = [];

        for (let column = 0; column < columns; column++) {
            sprites.push([]);

            for (let row = 0; row < rows; row++) {
                let sprite = new Sprite({
                    atlas: this,
                    width: spriteWidth,
                    height: spriteHeight,
                    x: column * spriteWidth,
                    y: row * spriteHeight,
                });

                sprites[column].push(sprite);
            }
        }

        return sprites;
    }

    getSprite(column, row) {
        return this.#sprites[column]?.[row] ?? null;
    }

    get texturePath() {
        return this.#texturePath;
    }
}