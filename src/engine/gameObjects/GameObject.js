export default class GameObject {

    constructor(className,options) {
        let defaultOptions = this.getDefaultOptions();
        options = Object.assign({}, defaultOptions, options);

        this.className = className;
        this.type = options.type;
        this.variant = options.variant;

        this.x = options.x;
        this.y = options.y;
        this.z = options.z;
    }

    getDefaultOptions () {
        return {
            x: 0,
            y: 0,
            z: 0,
            type: null,
            variant: null,
        }
    }

    get isPassable () {
        return true;
    }
}