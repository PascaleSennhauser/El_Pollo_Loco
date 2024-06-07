class ThrowableObject extends MovableObject {

    throwIntervalX;
    hit = false;

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw(direction);
    }

    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        this.throwIntervalX = setInterval(() => {
            if (direction == "right") {
                this.x += 10;
            } else {
                this.x -= 10;
            }
            
        }, 25)
    }


}