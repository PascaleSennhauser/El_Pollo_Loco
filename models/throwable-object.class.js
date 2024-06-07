class ThrowableObject extends MovableObject {

    throwIntervalX;
    hit = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwIntervalX = setInterval(() => {
            this.x += 10;
        }, 25)
    }


}