class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableBottle = [new ThrowableBottle()];
    bigBottle;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.findingBigBottle();
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


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            let bottle = new ThrowableBottle(100, 100);
            this.throwableBottle.push(bottle);
        }
    }

    
    setMusic() {
        this.level.background_sound.play();
    }

    
    draw() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.bigBottle && (this.bigBottle.x <= -this.camera_x + this.canvas.width - 200)) {
            this.camera_x = -(this.bigBottle.x + 200 - this.canvas.width);
        }

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottle);

        this.ctx.translate(-this.camera_x, 0); // Back
        // ---- Space for fixed objects ----
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
  

        // Draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
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