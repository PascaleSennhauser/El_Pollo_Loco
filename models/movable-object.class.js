class MovableObject {
    x = 120;
    y = 330;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.08;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }


    isAboveGround() {
        return this.y < 130;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.right - this.offset.left), (this.height - this.offset.bottom - this.offset.top));
            ctx.stroke();
        }
    }


    // character.isColliding(chicken);
    isColliding(mo) {
        return  (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
                (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
                (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
                (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom);
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


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 0,, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }

    
    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }
}