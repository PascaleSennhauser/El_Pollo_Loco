class DrawableObject {
    x = 120;
    y = 330;
    height = 100;
    width = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    img;
    imageCache = {};
    currentImage = 0;



    /**
     * This method loads an image.
     * @param {String} path - The path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This method draws the image in the canvas.
     * @param {Object} ctx - The canvas object
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This method loads the images from an array.
     * @param {Array} arr - ['img/image1.png': img, 'img/image2.png': img, ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }



    /**
     * This method draws a frame around an image for developping purposes.
     * @param {Object} ctx - The canvas object
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof BigBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.right - this.offset.left), (this.height - this.offset.bottom - this.offset.top));
            ctx.stroke();
        }
    }
}