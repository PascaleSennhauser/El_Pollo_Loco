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
    amountOfCoins = 0;
    timeOfThrow = 0;
    throwableBottle = [];
    animationIntervals = [];
    runInterval;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.findingBigBottle();
        this.getAmountOfCoins();
        this.getEndboss();
        this.draw();
        this.setWorld();
        this.run();
    }


    findingBigBottle() {
        this.level.items.forEach((item) => {
            if (item instanceof BigBottle) {
                this.bigBottle = item;
            }
        });
    }


    getAmountOfCoins() {
        this.level.items.forEach((item) => {
            if (item instanceof Coin) {
                this.amountOfCoins++;
            }
        })
    }


    getEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.endboss = enemy;
            }
        })
    }


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


    setCameraAtTheEnd() {
        // The camera_x doesn't follow the character anymore, when the big-bottle is in sight and 300px from the left.
        if (this.bigBottle && (this.bigBottle.x <= -this.camera_x + this.canvas.width - 300)) {
            this.camera_x = -(this.bigBottle.x + 300 - this.canvas.width);
        }
    }


    addLevelObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
    }


    addFixedObjectsToMap() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    }


    addCharacterToMap() {
        this.addToMap(this.character);
    }


    addThrowableBottleToMap() {
        this.addObjectsToMap(this.throwableBottle);
    }


    redrawCanvas() {
        // Draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkThrowObjects();
            this.checkHitWithBottle();
            this.checkSoundFightEndboss();
            this.checkWin();
        }, 25);
    }


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


    chickenGetsHit(enemy) {
        enemy.hit(100);
        this.playChickenDeadSound();
        this.removeEnemy(enemy);
    }


    characterGetsHit() {
        this.characterLoosingEnergy();
        this.playCollisionSound();
        if (this.character.isDead()) {
            this.clearIntervals();
            this.showEndScreenLoose();
        }
    }


    canCharacterCollideWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead();
    }


    isCharacterJumpingOnRegularEnemy(enemy) {
        return this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss);
    }


    playChickenDeadSound() {
        setSoundToStart('chickenDead_sound');
        playSound('chickenDead_sound');
    }


    removeEnemy(enemy) {
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 3000);
    }


    characterLoosingEnergy() {
        this.character.hit(20);
        this.healthBar.setPercentage(this.character.energy);
    }


    playCollisionSound() {
        setSoundToStart('collision_sound');
        playSound('collision_sound');
    }


    clearIntervals() {
        this.clearEnemyInterval();
        this.clearItemInterval();
        this.clearCloudInterval();
        clearInterval(this.runInterval);
    }


    clearEnemyInterval() {
        this.level.enemies.forEach((enemy) => {
            enemy.stopInterval();
        })
    }


    clearItemInterval() {
        this.level.items.forEach((item) => {
            if (item instanceof Coin)
                item.stopInterval();
        })
    }


    clearCloudInterval() {
        this.level.clouds.forEach((cloud) => {
            cloud.stopInterval();
        })
    }


    showEndScreenLoose() {
        setTimeout(() => {
            this.character.stopInterval();
            showEndScreenLoose();
        }, 1500);
    }


    checkCollectingBottles() {
        for (let i = this.level.items.length - 1; i >= 0; i--) {
            let item = this.level.items[i];
            if (this.canCharacterCollectBottle(item)) {
                this.playCollectingBottleSound();
                // Adding bottle to the inventar of the character
                this.character.bottlesInventar++;
                // Deleting bottle from the items array
                this.level.items.splice(i, 1);
                this.updateBottleBar();
            }
        }
    }


    canCharacterCollectBottle(item) {
        return item instanceof Bottle && this.character.bottlesInventar < 5 && this.character.isColliding(item) && !this.character.isHurt();
    }


    playCollectingBottleSound() {
        setSoundToStart('collectingBottle_sound');
        playSound('collectingBottle_sound');
    }


    updateBottleBar() {
        this.bottleBar.percentage += 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
    }


    checkCollectingCoins() {
        this.level.items.forEach((item, index) => {
            if (this.canCharacterCollectCoin(item)) {
                this.playCollectingCoinSound();
                // Adding bottle to the inventar of the character
                this.character.coinsInventar++;
                // Deleting bottle from the items array
                this.level.items.splice(index, 1);
                this.updateCoinBar();
            }
        })
    }


    canCharacterCollectCoin(item) {
        return item instanceof Coin && this.character.isColliding(item) && !this.character.isHurt();
    }


    playCollectingCoinSound() {
        setSoundToStart('collectCoin_sound');
        playSound('collectCoin_sound');
    }


    updateCoinBar() {
        this.coinBar.percentage += (100 / this.amountOfCoins);
        this.coinBar.setPercentage(this.coinBar.percentage);
    }


    checkSoundFightEndboss() {
        if (this.isCharacterNearEndboss()) {
            pauseSound('background_sound');
            playSound('endboss_sound');
        } else {
            pauseSound('endboss_sound');
            playSound('background_sound');
        }
    }


    isCharacterNearEndboss() {
        return this.character.x >= this.endboss.x - 400 && !this.endboss.isDead();
    }


    checkWin() {
        if (this.canCharacterCollectBigBottle()) {
            this.character.stopInterval();
            this.clearIntervals();
            this.showEndScreenWin();
        }
    }


    canCharacterCollectBigBottle() {
        return this.character.x >= this.bigBottle.x && this.character.x <= this.bigBottle.x + 70 && !this.character.isDead() && !this.character.isHurt();
    }


     showEndScreenWin() {
        setTimeout(() => {
            showEndScreenWin();
        }, 1500);
    }


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


    bottleIsThrown() {
        return this.keyboard.SPACE && this.character.bottlesInventar > 0 && this.lastThrow() > 1;
    }


    playThrowingBottleSound() {
        setSoundToStart('throwingBottle_sound');
        playSound('throwingBottle_sound');
    }


    removeFromBottleBar() {
        this.bottleBar.percentage -= 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
    }


    removeThrowableBottle(bottle) {
        setTimeout(() => {
            let index = this.throwableBottle.indexOf(bottle);
            if (index > -1) {
                this.throwableBottle.splice(index, 1);
            }
        }, 1500);
    }


    checkDirection() {
        if (this.character.otherDirection) {
            return "left";
        } else {
            return "right";
        };
    }


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


    endbossNotDead(enemy) {
        return enemy.energy > 0;
    }


    endbossHurt(enemy) {
        enemy.isHurt = true;
        setTimeout(() => {
            enemy.isHurt = false;
        }, 2000);
    }


    removeEndboss(enemy) {
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 2000);
    }


    canBottleCollideWithEnemy(enemy, bottle) {
        return bottle.isColliding(enemy) && !enemy.isDead() && bottle.isAboveGround() && bottle.hit == false;
    }


    regularEnemy(enemy) {
        return !(enemy instanceof Endboss);
    }


    lastThrow() {
        let timepassed = (new Date().getTime() - this.timeOfThrow) / 1000;
        return timepassed;

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}