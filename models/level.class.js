class Level {
    enemies;
    clouds;
    items;
    endboss;
    backgroundObjects;
    level_end_x = 4250;


    /**
     * This constructor initializes the level enemies, clouds, items and backgroundObjects.
     * @param {Array} enemies - An array of enemy objects
     * @param {Array} clouds - An array of cloud objects
     * @param {Array} items - An array of item objects (coins and bottles)
     * @param {Array} backgroundObjects - An array of background objects
     */
    constructor(enemies, clouds, items, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
        this.backgroundObjects = backgroundObjects;
        this.setLevelEndX();
    }


    /**
     * This method sets the level end.
     */
    setLevelEndX() {
        setInterval(() => {
                this.getEndboss();
                if (!this.endboss.isDead()) {
                    this.level_end_x = this.endboss.x - 30;
                } else {
                    this.level_end_x = 4250;
                }
            }
        , 50);
    }


    /**
     * This method gets an reference of the endboss.
     */
    getEndboss() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.endboss = enemy;
            }
        });
    }
}