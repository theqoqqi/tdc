import level1 from './levels/level1';

export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();

        // game.loadLevelFromJson(level1);

        game.createWorld(5, 5);
        game.setPlayerPosition(1, 1);
        game.setFinishPosition(5, 5);
    }
}