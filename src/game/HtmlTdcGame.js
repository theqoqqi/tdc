
export default class HtmlTdcGame {

    constructor() {
        let game = new TdcGame();
        let levelJson = {};

        game.loadLevelFromJson(levelJson);
    }
}