class MovableObject extends DrawableObject {
    speed = 0.08;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    timeLastAction = new Date().getTime();
    isJumping = false;
    startIndex = 0;


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 0,, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    
    handleJumpingAnimation(images) {
        if (this.isJumping == true) {
            return;
        } else {
            if (this.startIndex < images.length) {
                let path = images[this.startIndex];
                this.img = this.imageCache[path];
                this.startIndex++;
            }
        }
    }


    playAnimationOnce(images) {
        if (this.startIndex < images.length) {
            let path = images[this.startIndex];
            this.img = this.imageCache[path];
            this.startIndex++;
        }
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    isStanding(time) {
        let timepassed = this.getTimePassed(time);
        return timepassed < 3000;
    }


    isWaiting(time) {
        let timepassed = this.getTimePassed(time);
        return timepassed >= 3000;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    jump() {
        this.speedY = 30;
    }


    applyGravity() {
        setInterval(() => {
            if (this.speedY > 0 || this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return this.y < 350;
        } else {
            return this.y < 130;
        }
    }


    updateIsJumping() {
        this.isJumping = false;
        this.startIndex = 0;
    }


    updateTimeLastAction() {
        this.timeLastAction = new Date().getTime();
    }

    
    getTimePassed(time) {
        let newTime = new Date().getTime();
        let timepassed = newTime - time;
        return timepassed;
    }


    // character.isColliding(chicken);
    isColliding(mo) {
        return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
            (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom);
    }


    hit(energyloss) {
        this.energy -= energyloss;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}