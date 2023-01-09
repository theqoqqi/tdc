import SpriteAtlas from './SpriteAtlas.js';

export default class SpriteAtlases {

    static #grassAtlas = new SpriteAtlas({
        texturePath: 'assets/images/grass.png',
        spriteWidth: 32,
        spriteHeight: 32,
        columns: 8,
        rows: 4,
        scale: 2,
    });

    static #defaultAtlas = new SpriteAtlas({
        texturePath: 'assets/images/not-found.png',
        spriteWidth: 64,
        spriteHeight: 64,
        columns: 1,
        rows: 1,
    });

    static #gameObjectAtlases = {
        player: SpriteAtlases.#createObjectAtlas('player', {
            columns: 2,
            rows: 2,
        }),
        finish: SpriteAtlases.#createObjectAtlas('finish'),
        item: {
            apple: SpriteAtlases.#createObjectAtlas('items/apple'),
            'green-apple': SpriteAtlases.#createObjectAtlas('items/green-apple'),
            cheese: SpriteAtlases.#createObjectAtlas('items/cheese'),
            mushroom: SpriteAtlases.#createObjectAtlas('items/mushroom'),
        },
        obstacle: {
            wall: SpriteAtlases.#createObjectAtlas('obstacles/wall'),
            grave: {
                cross: SpriteAtlases.#createObjectAtlas('obstacles/graves/cross'),
                monument: SpriteAtlases.#createObjectAtlas('obstacles/graves/monument'),
            },
        },
    };

    static get grassAtlas() {
        return this.#grassAtlas;
    }

    static get(className, type, variant) {
        let atlas = this.#gameObjectAtlases[className];

        if (!atlas) {
            return this.#defaultAtlas;
        }

        if (!(atlas instanceof SpriteAtlas)) {
            atlas = atlas[type];
        }

        if (!atlas) {
            return this.#defaultAtlas;
        }

        if (!(atlas instanceof SpriteAtlas)) {
            atlas = atlas[variant];
        }

        return atlas ?? this.#defaultAtlas;
    }

    static #createObjectAtlas(atlasSubPath, {columns = 1, rows = 1} = {}) {
        return new SpriteAtlas({
            texturePath: `assets/images/objects/${atlasSubPath}.png`,
            spriteWidth: 64,
            spriteHeight: 64,
            columns,
            rows,
        });
    }
}