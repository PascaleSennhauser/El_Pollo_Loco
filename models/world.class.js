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
    animationIntervals = [];
    runInterval;
    itemCollecting;
    drawWorld;
    throwObjects;



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
        this.throwObjects = new ThrowObjects(this);
        this.drawWorld = new DrawWorld(this);
        this.findingBigBottle();
        this.getEndboss();
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
            this.throwObjects.checkThrowObjects();
            this.throwObjects.checkHitWithBottle();
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
}