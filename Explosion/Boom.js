class Boom extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 256, 256, 8, .05, 32, true), x, y);
    }

    update () {

    }
}