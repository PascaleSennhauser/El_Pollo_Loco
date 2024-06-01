class DrawableObject {
    x = 120;
    y = 330;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof BigBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.right - this.offset.left), (this.height - this.offset.bottom - this.offset.top));
            ctx.stroke();
        }
    }

    
    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
        loadImages(arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            })
        }
}