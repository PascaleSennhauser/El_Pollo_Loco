class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    throwableBottle = [new ThrowableBottle()];
    bigBottle;
    amountOfCoins = 0;


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

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkThrowObjects();
        }, 25);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss)) {
                    console.log('Chicken');
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
                }
            }
        })
    }



    checkCollectingBottles() {
        for (let i = this.level.items.length - 1; i >= 0; i--) {
            let item = this.level.items[i];
            if (item instanceof Bottle && this.character.bottlesInventar < 5 && this.character.isColliding(item) && !this.character.isHurt()) {
                // Adding bottle to the inventar of the character
                this.character.bottlesInventar++;

                // Deleting bottle from the items array
                this.level.items.splice(i, 1);
                this.bottleBar.percentage += 20;
                this.bottleBar.setPercentage(this.bottleBar.percentage);

                console.log('Collected bottle: ', item);
                console.log('Remaining items: ', this.level.items);
                console.log('Collected bottles: ', this.character.bottlesInventar);
            }
        }
    }

    checkCollectingCoins() {
        this.level.items.forEach((item, index) => {
            if (item instanceof Coin && this.character.isColliding(item) && !this.character.isHurt()) {
                // Adding bottle to the inventar of the character
                this.character.coinsInventar++;
 
                // Deleting bottle from the items array
                this.level.items.splice(index, 1);
                console.log('This amountofCoins', this.amountOfCoins);
                this.coinBar.percentage += (100/this.amountOfCoins);
                console.log('percentage', this.coinBar.percentage);
                this.coinBar.setPercentage(this.coinBar.percentage);

                console.log('Collected coin: ', item);
                console.log('Remaining items: ', this.level.items);
                console.log('Collected coins: ', this.character.coinsInventar);

            }
        })
    }




    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableBottle(100, 100);
            this.throwableBottle.push(bottle);
        }
    }


    setMusic() {
        this.level.background_sound.play();
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.camera_x = this.canvas.width / 2 - this.character.x - 170;


        // The camera_x doesn't follow the character anymore, when the big-bottle is in sight and 300px from the left.
        if (this.bigBottle && (this.bigBottle.x <= -this.camera_x + this.canvas.width - 300)) {
            this.camera_x = -(this.bigBottle.x + 300 - this.canvas.width);
        }

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottle);

        this.ctx.translate(-this.camera_x, 0); // Back
        // ---- Space for fixed objects ----
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);


        // Draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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