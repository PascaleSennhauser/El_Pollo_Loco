class ThrowObjects {
    world;
    timeOfThrow = 0;
    throwableBottle = [];


    /**
     * This constructor is for getting a reference of teh world.
     * @param {Object} world - The world object
     */
    constructor (world) {
        this.world = world;
    }


    /**
     * This method checks if a bottle is thrown and then executed.
     */
    checkThrowObjects() {
        if (this.bottleIsThrown()) {
            let direction = this.checkDirection();
            let bottle = new ThrowableBottle(this.world.character.x + this.world.character.width / 2, this.world.character.y + this.world.character.height / 2, direction);
            this.playThrowingBottleSound();
            this.throwableBottle.push(bottle);
            this.world.character.bottlesInventar--;
            this.removeFromBottleBar();
            this.timeOfThrow = new Date().getTime();
            this.world.character.updateTimeLastAction();
            this.removeThrowableBottle(bottle);
        }
    }


    /**
     * This method checks if a bottle is and can be thrown.
     * @returns {Boolean} - Returns true, if the bottle can be thrown, otherwise false.
     */
    bottleIsThrown() {
        return this.world.keyboard.SPACE && this.world.character.bottlesInventar > 0 && this.lastThrow() > 1;
    }


    /**
     * This method plays the throwingBottle sound.
     */
    playThrowingBottleSound() {
        setSoundToStart('throwingBottle_sound');
        playSound('throwingBottle_sound');
    }


    /**
     * This method updates the bottle bar, when a bottle is thrown.
     */
    removeFromBottleBar() {
        this.world.bottleBar.percentage -= 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
    }


    /**
     * This method removes the throwable bottle from the array.
     * @param {Object} bottle - The bottle object
     */
    removeThrowableBottle(bottle) {
        setTimeout(() => {
            let index = this.throwableBottle.indexOf(bottle);
            if (index > -1) {
                this.throwableBottle.splice(index, 1);
            }
        }, 1500);
    }


    /**
     * This method checks the direction of the character.
     * @returns {String} - Returns "left" or "right"
     */
    checkDirection() {
        if (this.world.character.otherDirection) {
            return "left";
        } else {
            return "right";
        };
    }


    /**
     * This method checks if an enemy is hit with a bottle.
     */
    checkHitWithBottle() {
        this.world.level.enemies.forEach((enemy) => {
            this.throwableBottle.forEach((bottle) => {
                if (this.canBottleCollideWithEnemy(enemy, bottle)) {
                    bottle.hit = true;
                    bottle.stopGravity();
                    if (this.regularEnemy(enemy))
                        this.world.chickenGetsHit(enemy);
                    else
                        this.endbossGetsHit(enemy);
                }
            });
        });
    }


    /**
     * This method gets executed when the endboss is hit with a bottle.
     * @param {Object} enemy - The enemy object of the endboss
     */
    endbossGetsHit(enemy) {
        enemy.hit(100 / 3);
        this.world.endbossBar.setPercentage(enemy.energy);
        if (this.endbossNotDead(enemy)) {
            this.world.playCollisionSound();
            this.endbossHurt(enemy);
        } else {
            this.world.playChickenDeadSound();
            this.removeEndboss(enemy);
        }
    }


    /**
     * This method checks if the endboss is dead.
     * @param {Object} enemy - The enemy object of the endboss
     * @returns {Boolean} - Returns true if the endboss is still alive, otherwise false.
     */
    endbossNotDead(enemy) {
        return enemy.energy > 0;
    }


    /**
     * This method gets executed, when the endboss is hurt.
     * @param {Object} enemy - The enemy object of the endboss
     */
    endbossHurt(enemy) {
        enemy.isHurt = true;
        setTimeout(() => {
            enemy.isHurt = false;
        }, 2000);
    }


    /**
     * This method removes the endboss from the enemy-array.
     * @param {object} enemy - The enemy object of the endboss
     */
    removeEndboss(enemy) {
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 2000);
    }


    /**
     * This method checks if the bottle can collide with an enemy.
     * @param {Object} enemy - The enemy object
     * @param {Object} bottle - The bottle object
     * @returns {Boolean} - Returns true if the bottle can collide, otherwise false.
     */
    canBottleCollideWithEnemy(enemy, bottle) {
        return bottle.isColliding(enemy) && !enemy.isDead() && bottle.isAboveGround() && bottle.hit == false;
    }


    /**
     * This method checks if the enemy is an instance of a chicken or chick.
     * @param {Object} enemy - The enemy object
     * @returns {Boolean} - Returns true if the object is a chicken or chick, otherwise false.
     */
    regularEnemy(enemy) {
        return !(enemy instanceof Endboss);
    }


    /**
     * This method calculates the time of the last throw.
     * @returns {Numbwer} - Returns the time passed since the last throw.
     */
    lastThrow() {
        let timepassed = (new Date().getTime() - this.timeOfThrow) / 1000;
        return timepassed;

    }
}