
export default class AudioController {

    static #bgMusic = [
        'assets/sounds/music/test.mp3',
    ];

    #backgroundAudio;

    #volume;

    constructor() {
        this.$volumeInput = $('#sound-volume');
        this.#backgroundAudio = null;
        this.#volume = 0;

        this.$volumeInput.on('input', e => {
            let $input = $(e.currentTarget);
            let value = $input.val();

            this.setVolume(value);
        });
    }

    waitForInteraction() {
        let listener = () => {
            this.playRandomBackgroundAudio();
            document.removeEventListener('mousedown', listener);
        };

        document.addEventListener('mousedown', listener);
    }

    playRandomBackgroundAudio() {
        let audio = AudioController.#getRandomBackgroundAudio();

        this.#setBackgroundAudio(audio);
    }

    static #getRandomBackgroundAudio() {
        let randomIndex = Math.floor(Math.random() * AudioController.#bgMusic.length);

        return AudioController.#bgMusic[randomIndex];
    }

    #setBackgroundAudio(audio) {
        this.#backgroundAudio?.pause();
        this.#backgroundAudio = new Audio(audio);
        this.#backgroundAudio.play();
        this.#backgroundAudio.volume = this.#volume;
        this.#backgroundAudio.addEventListener('ended', e => {
            this.playRandomBackgroundAudio();
        });
    }

    setVolume(value) {
        this.#volume = value;

        if (this.#backgroundAudio) {
            this.#backgroundAudio.volume = value;
        }
    }
}