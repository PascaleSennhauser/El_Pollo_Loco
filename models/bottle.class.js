class Bottle extends MovableObject {
    y = 345;
    height = 80;
    width = 80;

    constructor(number, x) {
        super().loadImage(`img/6_salsa_bottle/${number}_salsa_bottle_on_ground.png`);
        this.x = x;
    }

}