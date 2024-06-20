class DrawWorld {
    world;

    /**
     * This constructor is for getting a reference of the world and loading important methods.
     * @param {Object} world - The world object
     */
    constructor(world) {
        this.world = world;
        this.draw();
    }


    /**
     * This method is to draw all the objects in the canvas.
     */
    draw() {
        this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.setCameraAtTheEnd();
        this.world.ctx.translate(this.world.camera_x, 0);
        this.addLevelObjectsToMap();
        this.world.ctx.translate(-this.world.camera_x, 0); // Back
        this.addFixedObjectsToMap();
        this.world.ctx.translate(this.world.camera_x, 0); // Forward
        this.addCharacterToMap();
        this.addThrowableBottleToMap();
        this.world.ctx.translate(-this.world.camera_x, 0);
        this.redrawCanvas();
    }


    /**
     * This method sets the camera at the end.
     */
    setCameraAtTheEnd() {
        // The camera_x doesn't follow the character anymore, when the big-bottle is in sight and 300px from the left.
        if (this.world.bigBottle && (this.world.bigBottle.x <= -this.world.camera_x + this.world.canvas.width - 300)) {
            this.world.camera_x = -(this.world.bigBottle.x + 300 - this.world.canvas.width);
        }
    }

    /**
     * This method adds all level objects to the map.
     */
    addLevelObjectsToMap() {
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.level.clouds);
        this.addObjectsToMap(this.world.level.items);
        this.addObjectsToMap(this.world.level.enemies);
    }


    /**
     * This method adds all fixed objects to the map.
     */
    addFixedObjectsToMap() {
        this.addToMap(this.world.healthBar);
        this.addToMap(this.world.bottleBar);
        this.addToMap(this.world.coinBar);
        this.addToMap(this.world.endbossBar);
    }


    /**
     * This method adds the character to the map.
     */
    addCharacterToMap() {
        this.addToMap(this.world.character);
    }


    /**
     * This method adds the throwable bottles to the map.
     */
    addThrowableBottleToMap() {
        this.addObjectsToMap(this.world.throwObjects.throwableBottle);
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
        mo.draw(this.world.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This method is executed, when an image should be placed in the other direction.
     * @param {Object} mo - The object
     */
    flipImage(mo) {
        this.world.ctx.save();
        this.world.ctx.translate(mo.width, 0);
        this.world.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This method is executed to flip the canvas back, when a image is placed in the other direction.
     * @param {Object} mo - The object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.world.ctx.restore();
    }
}