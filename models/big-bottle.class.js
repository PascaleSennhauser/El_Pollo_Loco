class BigBottle extends MovableObject {
    y = 250;
    height = 200;
    width = 200;
    offset = {
        top: 30,
        left: 80,
        right: 80,
        bottom: 30
    };


    /**
     * This constructor loads the imag of the big-bottle and sets the coordinates.
     * @param {Number} x - The number for the x-coordinate
     */
    constructor(x) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
    }

}