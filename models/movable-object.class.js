class MovableObject extends DrawableObject {
    speed = 0.08;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    timeLastAction = new Date().getTime();
    startIndexNull = 0;
    gravityInterval;
    animationIntervals = [];


    /**
     * This method stops all intervals from an object.
     */
    stopInterval() {
        this.animationIntervals.forEach((interval) => {
            clearInterval(interval);
        });
        this.animationIntervals = [];
    }


    /**
     * This method shows the images for an animation.
     * @param {Array} images - The array with the images paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 0, rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This method is for playing an animation once.
     * @param {Array} images - The array with the images paths
     */
    playAnimationOnce(images) {
        if (this.startIndexNull < images.length) {
            let path = images[this.startIndexNull];
            this.img = this.imageCache[path];
            this.startIndexNull++;
        }
    }


    /**
     * This method is for moving to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This method is for moving to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This method is to check if an object is standing.
     * @param {Number} time - The last returned time
     * @returns {Boolean} - Returns true if the object is standing, otherwise false.
     */
    isStanding(time) {
        let timepassed = this.getTimePassed(time);
        return timepassed < 3000;
    }


    /**
     * This method is to check if an object is waiting.
     * @param {Nubmer} time - The last returned time
     * @returns {Boolean} - Returns true if the object is waiting, otherwise false.
     */
    isWaiting(time) {
        let timepassed = this.getTimePassed(time);
        return timepassed >= 3000;
    }


    /**
     * This method is to check if an object is hurt.
     * @returns {Boolean} - Returns true if the object is hurt, otherwise false.
     */
    isHurt() {
        let timepassed = this.getTimePassed(this.lastHit);
        return timepassed < 1000;
    }


    /**
     * This method is to check if an object is dead.
     * @returns {Boolean} - Returns true if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This method is to make an object jump.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * This method applys gravity.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isFalling()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 1000 / 25);
    }

    
    /**
     * This method is to check if an object is falling.
     * @returns {Boolean} - Returns true if the object is falling, otherwise false.
     */
    isFalling() {
        return this.speedY > 0 || this.isAboveGround()
    }


    /**
     * This method is to stop the apllied gravity.
     */
    stopGravity() {
        clearInterval(this.gravityInterval);
    }


    /**
     * This function is to check if an object is above the ground.
     * @returns {Boolean} - Returns true if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return this.y < 350;
        } else {
            return this.y < 130;
        }
    }


    /**
     * This method updates the start index of an image.
     */
    updateStartIndex() {
        this.startIndexNull = 0;
    }


    /**
     * This method updates the time, when an objects last did something.
     */
    updateTimeLastAction() {
        this.timeLastAction = new Date().getTime();
    }

    
    /**
     * This method gets the time passed.
     * @param {Number} time - The last returned time
     * @returns {Number} - Returns the time passed.
     */
    getTimePassed(time) {
        let newTime = new Date().getTime();
        let timepassed = newTime - time;
        return timepassed;
    }


    /**
     * This function checks if an object is colliding with another object.
     * @param {Object} mo - The object with whom another object is colliding
     * @returns {Boolean} - Returns true if the object is colliding, otherwise false.
     */
    isColliding(mo) {
        return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
            (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom);
    }


    /**
     * This method calculates the energyloss, when an object is hit.
     * @param {Number} energyloss - The number of the energy loss.
     */
    hit(energyloss) {
        this.energy -= energyloss;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}