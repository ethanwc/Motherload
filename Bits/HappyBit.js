class HappyBit extends Bits {
    constructor(game, spritesheet, x, y) {
        super(game, spritesheet, x, y);
    }

    update () {
    }

    onAbsorb() {
        bitList.happyBits++;
    }
}