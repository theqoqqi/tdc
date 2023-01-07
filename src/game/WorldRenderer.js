import Random from '../util/Random.js';
import SpriteAtlases from './graphics/SpriteAtlases.js';

export default class WorldRenderer {

    #tileSize = 64;

    #pixelScale = 2;

    #game;

    #world;

    constructor(selector, game) {
        this.$world = $(selector);
        this.$terrain = this.$world.find('.terrain');
        this.$objects = this.$world.find('.objects');

        this.#game = game;
        this.#world = game.world;
    }

    render() {
        this.clearWorld();

        this.renderTerrain();
        this.renderGameObjects(this.#world.getAllGameObjects());
    }

    renderTerrain() {
        for (let x = 1; x <= this.#world.width; x++) {
            for (let y = 1; y <= this.#world.height; y++) {
                this.renderTerrainTile(x, y);
            }
        }
    }

    renderTerrainTile(x, y) {
        this.renderTile({
            x,
            y,
            type: 'terrain-tile',
            sprite: this.getRandomGrassSprite(x, y),
        });
    }

    renderGameObjects(gameObjects) {
        for (const gameObject of gameObjects) {
            this.renderGameObject(gameObject);
        }
    }

    renderGameObject(gameObject) {
        this.renderTile({
            x: gameObject.x,
            y: gameObject.y,
            type: 'object-tile',
            sprite: this.getSpriteFor(gameObject),
        });
    }

    clearWorld() {
        this.$terrain.empty();
        this.$objects.empty();
    }

    renderTile({type, x, y, sprite}) {
        let $tile = $(`<div class='grid-tile ${type}'>`);

        $tile.css({
            left: (x - 1) * this.#tileSize + 'px',
            top: (y - 1) * this.#tileSize + 'px',
            backgroundImage: `url('${sprite.atlas.texturePath}')`,
            backgroundPositionX: -sprite.x * this.#pixelScale + 'px',
            backgroundPositionY: -sprite.y * this.#pixelScale + 'px',
        });

        this.$terrain.append($tile);
    }

    getRandomGrassSprite(x, y) {
        let random = new Random(x + '-' + y);
        let spriteX = random.nextInt(4);
        let spriteY = random.nextInt(4);
        let withFlowers = random.nextInt(8) === 0;

        if (withFlowers) {
            spriteX += 4;
        }

        return SpriteAtlases.grassAtlas.getSprite(spriteX, spriteY);
    }

    getSpriteFor(gameObject) {
        return SpriteAtlases
            .get(gameObject.type)
            .getSprite(0, 0);
    }
}