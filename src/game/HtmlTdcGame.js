import level1 from './levels/level1';

export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();

        game.loadLevelFromJson(level1);
    }
}