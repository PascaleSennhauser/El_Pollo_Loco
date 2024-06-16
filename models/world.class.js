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
        this.draw();
        this.setWorld();
        this.run();
        /*        this.setMusic(); */
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

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    
        // The camera_x doesn't follow the character anymore, when the big-bottle is in sight and 300px from the left.
        if (this.bigBottle && (this.bigBottle.x <= -this.camera_x + this.canvas.width - 300)) {
            this.camera_x = -(this.bigBottle.x + 300 - this.canvas.width);
        }
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
    
        this.ctx.translate(-this.camera_x, 0); // Back
        // ---- Space for fixed objects ----
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0); // Forward
    
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableBottle);
        this.ctx.translate(-this.camera_x, 0);
    
    
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
            this.checkWin();
        }, 25);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss)) {
                    setSoundToStart(chickenDead_sound);
                    playSound(chickenDead_sound);
                    enemy.hit(100);
                    setTimeout(() => {
                        let index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                            this.level.enemies.splice(index, 1);
                        }
                    }, 3000);
                } else {
                    this.character.hit(20);
                    this.healthBar.setPercentage(this.character.energy);
                    setSoundToStart(collision_sound);
                    playSound(collision_sound);
                    if(this.character.isDead()) {
                        this.level.enemies.forEach((enemy) => {
                            enemy.stopInterval();
                        })
                        this.level.items.forEach((item) => {
                            if(item instanceof Coin)
                            item.stopInterval();
                        })
                        this.level.clouds.forEach((cloud) => {
                            cloud.stopInterval();
                        })
                        this.character.stopInterval();
                        clearInterval(this.runInterval);
                        setTimeout(() => {
                            showEndScreenLoose();
                        }, 1500);
                    }
                }
            }
        })
    }



    checkCollectingBottles() {
        for (let i = this.level.items.length - 1; i >= 0; i--) {
            let item = this.level.items[i];
            if (item instanceof Bottle && this.character.bottlesInventar < 5 && this.character.isColliding(item) && !this.character.isHurt()) {
                setSoundToStart(collectingBottle_sound);
                playSound(collectingBottle_sound);
                // Adding bottle to the inventar of the character
                this.character.bottlesInventar++;

                // Deleting bottle from the items array
                this.level.items.splice(i, 1);
                this.bottleBar.percentage += 20;
                this.bottleBar.setPercentage(this.bottleBar.percentage);
            }
        }
    }

    checkCollectingCoins() {
        this.level.items.forEach((item, index) => {
            if (item instanceof Coin && this.character.isColliding(item) && !this.character.isHurt()) {
                setSoundToStart(collectCoin_sound);
                playSound(collectCoin_sound);
                // Adding bottle to the inventar of the character
                this.character.coinsInventar++;

                // Deleting bottle from the items array
                this.level.items.splice(index, 1);
                this.coinBar.percentage += (100 / this.amountOfCoins);
                this.coinBar.setPercentage(this.coinBar.percentage);
            }
        })
    }

    checkWin() {
        if (this.character.x >= this.bigBottle.x && this.character.x <= this.bigBottle.x+ this.bigBottle.width - this.bigBottle.offset.right && !this.character.isDead() && !this.character.isHurt()) {
            clearInterval(this.runInterval);
            this.character.stopInterval();
            this.level.enemies.forEach((enemy) => {
                enemy.stopInterval();
            })
            this.level.items.forEach((item) => {
                if(item instanceof Coin)
                item.stopInterval();
            })
            this.level.clouds.forEach((cloud) => {
                cloud.stopInterval();
            })
            setTimeout(() => {
                showEndScreenWin();
            }, 1500);
        }
    }


    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottlesInventar > 0 && this.lastThrow() > 1) {
            let direction = this.checkDirection(); 
            let bottle = new ThrowableBottle(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2, direction);
            setSoundToStart(throwingBottle_sound);
            playSound(throwingBottle_sound);
            console.log('Throwable bottle', bottle);
            this.throwableBottle.push(bottle);
            this.character.bottlesInventar--;
            this.bottleBar.percentage -= 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
            this.timeOfThrow = new Date().getTime();
            this.character.updateTimeLastAction();

            setTimeout(() => {
                let index = this.throwableBottle.indexOf(bottle);
                if (index > -1) {
                    this.throwableBottle.splice(index, 1);
                }
            }, 1500);

        }
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
                if (bottle.isColliding(enemy) && !enemy.isDead() && bottle.isAboveGround() && bottle.hit == false) {
                        bottle.hit = true;
                        bottle.stopGravity();
                        if (!(enemy instanceof Endboss)) {
                            setSoundToStart(chickenDead_sound);
                            playSound(chickenDead_sound);
                            enemy.hit(100);
                            setTimeout(() => {
                                let index = this.level.enemies.indexOf(enemy);
                                if (index > -1) {
                                    this.level.enemies.splice(index, 1);
                                }
                            }, 3000);
                        } else {
                            enemy.hit (100/3);
                            this.endbossBar.setPercentage(enemy.energy);
                            if (enemy.energy > 0) {
                                setSoundToStart(collision_sound);
                                playSound(collision_sound);
                                enemy.isHurt = true;
                                setTimeout(() => {
                                    enemy.isHurt = false;
                                }, 2000);
                            } else {
                                setSoundToStart(chickenDead_sound);
                                playSound(chickenDead_sound);
                                setTimeout(() => {
                                    let index = this.level.enemies.indexOf(enemy);
                                    if (index > -1) {
                                        this.level.enemies.splice(index, 1);
                                    }
                                }, 2000);

                            }
                        }

                }
            });
        });
    }



lastThrow() {
    let timepassed = (new Date().getTime() - this.timeOfThrow) / 1000;
    return timepassed;

}


setMusic() {
    this.level.background_sound.play();
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
    // mo.drawFrame(this.ctx);
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