class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;


    /**
     * This constructor loads the background-images and sets the coordinates.
     * @param {String} imagePath - The img-path
     * @param {Number} x - The number for the x-coordinate
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}