import level1 from './levels/level1.js';
import TdcGame from '../engine/TdcGame.js';

export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();

        // game.loadLevelFromJson(level1);

        console.log(game.world);

        game.setSizeWorld(5, 5);

        console.log(game.world);

        game.setPlayerPosition(1, 1);
        game.setFinishPosition(5, 5);

        this.renderWorld(game.world);
    }

    renderWorld(world) {
        this.clearWorld();
        this.renderTerrain(world);
        this.renderObjects(world.getAllObjects());
    }

    renderTerrain(world) {
        for (let x = 1; x <= world.width; x++) {
            for (let y = 1; y <= world.height; y++) {
                this.renderTerrainTile(x, y);
            }
        }
    }

    renderTerrainTile(x, y) {
        this.renderTile(x, y, 'grass.png');
    }

    renderObjects(objects) {
        for (const object of objects) {
            this.renderObject(object);
        }
    }

    renderObject(object) {
        this.renderTile(object.x, object.y, 'player.png'); // TODO: Или finish.png и т.д.
    }

    clearWorld() {
        $('.world .terrain').empty();
        $('.world .objects').empty();
    }

    renderTile(x, y, texture) {
        let $tile = $(`<div class='grid-item'>`);

        $tile.css({
            left: (x - 1) * 64 + 'px',
            top: (y - 1) * 64 + 'px',
            backgroundImage: `url('assets/images/${texture}')`,
        });

        $('.world .terrain').append($tile);
    }
}