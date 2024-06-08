class Bottle extends MovableObject {
    y = 345;
    height = 80;
    width = 80;
    offset = {
        top: 15,
        left: 30,
        right: 25,
        bottom: 10
    };

    constructor(number, x) {
        super();
        this.loadImage(`img/6_salsa_bottle/${number}_salsa_bottle_on_ground.png`);
        this.x = x;
    }

}