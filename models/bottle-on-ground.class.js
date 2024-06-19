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

    
    /**
     * This constructor loads the bottle-images and sets the coordinate.
     * @param {Number} number - Number 1 or 2, for image1 or image2
     * @param {Number} x - The number for the x-coordinate
     */
    constructor(number, x) {
        super();
        this.loadImage(`img/6_salsa_bottle/${number}_salsa_bottle_on_ground.png`);
        this.x = x;
    }

}