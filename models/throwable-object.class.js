class ThrowableObject extends MovableObject {
    throwIntervalX;
    hit = false;


    /**
     * This constructor loads the image, sets important attributes and loads other methods.
     * @param {Number} x - The number of the x-coordinate
     * @param {Number} y - The number of the y-coordinate
     * @param {String} direction - The walking direction of the character ("left" or "right")
     */
    constructor(x, y, direction) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw(direction);
    }


    /**
     * This method is to throw an object.
     * @param {String} direction - The walking direction of the character ("left" or "right")
     */
    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        this.throwIntervalX = setInterval(() => {
            if (this.isCharacterLookingRight(direction)) {
                this.x += 10;
            } else {
                this.x -= 10;
            }            
        }, 25)
    }


    /**
     * This method is for checking if the character is looking to the right.
     * @param {String} direction - The walking direction of the character ("left" or "right")
     * @returns {Boolean} - Returns true if the direction is right, otherwise false.
     */
    isCharacterLookingRight(direction) {
        return direction == "right";        
    }

}