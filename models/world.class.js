class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusbarHealth();
    bottleBar = new StatusbarBottle();
    coinBar = new StatusbarCoins();
    endbossBar = new StatusbarEndboss();
    bigBottle;
    endboss;
    timeOfThrow = 0;
    throwableBottle = [];
    animationIntervals = [];
    runInterval;
    itemCollecting;



    /**
     * This constructor is for getting the canvas, drawing in the canvas and loading all important methods for the world-object.
     * @param {Object} canvas - The canvas object
     * @param {Object} keyboard - The keyboard object
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.itemCollecting = new ItemCollecting(this);
        this.findingBigBottle();
        this.getEndboss();
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This method is for creating a reference of the big bottle.
     */
    findingBigBottle() {
        this.level.items.forEach((item) => {
            if (item instanceof BigBottle) {
                this.bigBottle = item;
            }
        });
    }


    /**
     * This method is for creating a reference of the endboss.
     */
    getEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.endboss = enemy;
            }
        })
    }


    /**
     * This method is to draw all the objects in the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setCameraAtTheEnd();
        this.ctx.translate(this.camera_x, 0);
        this.addLevelObjectsToMap();
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addFixedObjectsToMap();
        this.ctx.translate(this.camera_x, 0); // Forward
        this.addCharacterToMap();
        this.addThrowableBottleToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.redrawCanvas();
    }


    /**
     * This method sets the camera at the end.
     */
    setCameraAtTheEnd() {
        // The camera_x doesn't follow the character anymore, when the big-bottle is in sight and 300px from the left.
        if (this.bigBottle && (this.bigBottle.x <= -this.camera_x + this.canvas.width - 300)) {
            this.camera_x = -(this.bigBottle.x + 300 - this.canvas.width);
        }
    }


    /**
     * This method adds all level objects to the map.
     */
    addLevelObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
    }


    /**
     * This method adds all fixed objects to the map.
     */
    addFixedObjectsToMap() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    }


    /**
     * This method adds the character to the map.
     */
    addCharacterToMap() {
        this.addToMap(this.character);
    }


    /**
     * This method adds the throwable bottles to the map.
     */
    addThrowableBottleToMap() {
        this.addObjectsToMap(this.throwableBottle);
    }


    /**
     * This method redraws the canvas.
     */
    redrawCanvas() {
        // Draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This method sets the world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This method sets an interval for all the important methods in the game.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.itemCollecting.checkCollectingBottles();
            this.itemCollecting.checkCollectingCoins();
            this.checkThrowObjects();
            this.checkHitWithBottle();
            this.checkSoundFightEndboss();
            this.checkWin();
        }, 25);
    }


    /**
     * This method checks the collisions with the enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.canCharacterCollideWithEnemy(enemy)) {
                if (this.isCharacterJumpingOnRegularEnemy(enemy)) {
                    this.chickenGetsHit(enemy);
                } else {
                    this.characterGetsHit(enemy);
                }
            }
        });
    }


    /**
     * This method gets executed, when a chicken is hit.
     * @param {Object} enemy - The enemy object
     */
    chickenGetsHit(enemy) {
        enemy.hit(100);
        this.playChickenDeadSound();
        this.removeEnemy(enemy);
    }


    /**
     * THis method gets executed, when the character is hit.
     */
    characterGetsHit() {
        this.characterLoosingEnergy();
        this.playCollisionSound();
        if (this.character.isDead()) {
            this.clearIntervals();
            this.showEndScreenLoose();
        }
    }


    /**
     * This method is to check if the character can collide with an enemy.
     * @param {Object} enemy - The enemy object
     * @returns {Boolean} - Returns true if the character can collide, otherwise false.
     */
    canCharacterCollideWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead();
    }


    /**
     * This method is to check if the character is jumping on a regular enemy.
     * @param {Object} enemy - The enemy object
     * @returns {Boolean} - Returns true if the character is jumping on a regular enemy, otherwise false.
     */
    isCharacterJumpingOnRegularEnemy(enemy) {
        return this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss);
    }


    /**
     * This method plays the "chickenDead" sound.
     */
    playChickenDeadSound() {
        setSoundToStart('chickenDead_sound');
        playSound('chickenDead_sound');
    }


    /**
     * This function removes the dead enemy from the array.
     * @param {Object} enemy - The enemy object
     */
    removeEnemy(enemy) {
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 3000);
    }


    /**
     * This method is executed, when the character is loosing energy.
     */
    characterLoosingEnergy() {
        this.character.hit(20);
        this.healthBar.setPercentage(this.character.energy);
    }


    /**
     * This method plays the collision sound.
     */
    playCollisionSound() {
        setSoundToStart('collision_sound');
        playSound('collision_sound');
    }


    /**
     * This method clears all intervals.
     */
    clearIntervals() {
        this.clearEnemyInterval();
        this.clearItemInterval();
        this.clearCloudInterval();
        clearInterval(this.runInterval);
    }


    /**
     * This method clears the enemy intervals.
     */
    clearEnemyInterval() {
        this.level.enemies.forEach((enemy) => {
            enemy.stopInterval();
        })
    }


    /**
     * This method clears the items intervals.
     */
    clearItemInterval() {
        this.level.items.forEach((item) => {
            if (item instanceof Coin)
                item.stopInterval();
        })
    }


    /**
     * This method clears the clouds intervals.
     */
    clearCloudInterval() {
        this.level.clouds.forEach((cloud) => {
            cloud.stopInterval();
        })
    }


    /**
     * This method shows the end screen, when the game is over.
     */
    showEndScreenLoose() {
        setTimeout(() => {
            this.character.stopInterval();
            showEndScreenLoose();
        }, 1500);
    }


    /**
     * This method checks if the endboss sound has to play or not.
     */
    checkSoundFightEndboss() {
        if (this.isCharacterNearEndboss()) {
            pauseSound('background_sound');
            playSound('endboss_sound');
        } else {
            pauseSound('endboss_sound');
            playSound('background_sound');
        }
    }


    /**
     * This method checks if the character is near the endboss.
     * @returns {Boolean} - Returns true if the character is near the endboss, otherwise false.
     */
    isCharacterNearEndboss() {
        return this.character.x >= this.endboss.x - 400 && !this.endboss.isDead();
    }


    /**
     * This method checks if the game is won.
     */
    checkWin() {
        if (this.canCharacterCollectBigBottle()) {
            this.character.stopInterval();
            this.clearIntervals();
            this.showEndScreenWin();
        }
    }


    /**
     * This method checks if the character can collect the big bottle.
     * @returns {Boolean} - Returns true if the character can collect the big bottle, otherwise false.
     */
    canCharacterCollectBigBottle() {
        return this.character.x >= this.bigBottle.x && this.character.x <= this.bigBottle.x + 70 && !this.character.isDead() && !this.character.isHurt();
    }


    /**
     * This method shows the end screen, when the game is won.
     */
     showEndScreenWin() {
        setTimeout(() => {
            showEndScreenWin();
        }, 1500);
    }


    /**
     * This method checks if a bottle is thrown and then executed.
     */
    checkThrowObjects() {
        if (this.bottleIsThrown()) {
            let direction = this.checkDirection();
            let bottle = new ThrowableBottle(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2, direction);
            this.playThrowingBottleSound();
            this.throwableBottle.push(bottle);
            this.character.bottlesInventar--;
            this.removeFromBottleBar();
            this.timeOfThrow = new Date().getTime();
            this.character.updateTimeLastAction();
            this.removeThrowableBottle(bottle);
        }
    }


    /**
     * This method checks if a bottle is and can be thrown.
     * @returns {Boolean} - Returns true, if the bottle can be thrown, otherwise false.
     */
    bottleIsThrown() {
        return this.keyboard.SPACE && this.character.bottlesInventar > 0 && this.lastThrow() > 1;
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
        this.bottleBar.percentage -= 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
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
        if (this.character.otherDirection) {
            return "left";
        } else {
            return "right";
        };
    }


    /**
     * This method checks if an enemy is hit with a bottle.
     */
    checkHitWithBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableBottle.forEach((bottle) => {
                if (this.canBottleCollideWithEnemy(enemy, bottle)) {
                    bottle.hit = true;
                    bottle.stopGravity();
                    if (this.regularEnemy(enemy))
                        this.chickenGetsHit(enemy);
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
        this.endbossBar.setPercentage(enemy.energy);
        if (this.endbossNotDead(enemy)) {
            this.playCollisionSound();
            this.endbossHurt(enemy);
        } else {
            this.playChickenDeadSound();
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
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
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


    /**
     * This method adds objects to the map.
     * @param {Array} objects - An array with the objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This method adds a single object to the map.
     * @param {Object} mo - The object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This method is executed, when an image should be placed in the other direction.
     * @param {Object} mo - The object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This method is executed to flip the canvas back, when a image is placed in the other direction.
     * @param {Object} mo - The object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}