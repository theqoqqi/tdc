import Random from '../util/Random.js';
import SpriteAtlases from './graphics/SpriteAtlases.js';

export default class WorldRenderer {

    #tileSize = 64;

    #pixelScale = 2;

    #game;

    #world;

    #objectsToElements = new Map();

    constructor(selector, game) {
        this.$world = $(selector);
        this.$terrain = this.$world.find('.terrain');
        this.$objects = this.$world.find('.objects');

        this.#game = game;
        this.#world = game.world;
    }

    render() {
        this.clearWorld();

        this.setWorldSize(this.#world.width, this.#world.height);

        this.renderTerrain();
    }

    update() {
        for (const $gameObject of this.#objectsToElements.values()) {
            $gameObject.data('removed', true);
        }

        for (const gameObject of this.#world.getAllGameObjects()) {
            let $gameObject = this.getOrCreateObjectElement(gameObject);

            $gameObject.css({
                left: this.gamePosToCssPos(gameObject.x),
                top: this.gamePosToCssPos(gameObject.y),
            });

            $gameObject.data('removed', false);
        }

        for (const gameObject of this.#objectsToElements.keys()) {
            let $gameObject = this.getObjectElement(gameObject);

            if ($gameObject.data('removed')) {
                this.removeObjectElement(gameObject);
            }
        }
    }

    getOrCreateObjectElement(gameObject) {
        let $gameObject = this.getObjectElement(gameObject);

        if (!$gameObject) {
            $gameObject = this.createObjectElement(gameObject);
        }

        return $gameObject;
    }

    getObjectElement(gameObject) {
        return this.#objectsToElements.get(gameObject);
    }

    createObjectElement(gameObject) {
        let $gameObject = this.renderGameObject(gameObject);

        this.#objectsToElements.set(gameObject, $gameObject);

        return $gameObject;
    }

    removeObjectElement(gameObject) {
        let $gameObject = this.getObjectElement(gameObject);

        if ($gameObject) {
            $gameObject.remove();
            this.#objectsToElements.delete(gameObject);
        }
    }

    renderTerrain() {
        for (let x = 1; x <= this.#world.width; x++) {
            for (let y = 1; y <= this.#world.height; y++) {
                this.renderTerrainTile(x, y);
            }
        }
    }

    setWorldSize(width, height) {
        this.$world.css({
            width: width * this.#tileSize + 'px',
            height: height * this.#tileSize + 'px',
        });
    }

    renderTerrainTile(x, y) {
        this.renderTile({
            x,
            y,
            type: 'terrain-tile',
            sprite: this.getRandomGrassSprite(x, y),
        });
    }

    renderGameObject(gameObject) {
        return this.renderTile({
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
        let $container = type === 'terrain-tile' ? this.$terrain : this.$objects;

        $tile.css({
            left: this.gamePosToCssPos(x),
            top: this.gamePosToCssPos(y),
            backgroundImage: `url('${sprite.atlas.texturePath}')`,
            backgroundPositionX: -sprite.x * this.#pixelScale + 'px',
            backgroundPositionY: -sprite.y * this.#pixelScale + 'px',
        });

        $container.append($tile);

        return $tile;
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
            .get(gameObject.className, gameObject.type)
            .getSprite(0, 0);
    }

    gamePosToCssPos(pos) {
        return (pos - 1) * this.#tileSize + 'px';
    }
}