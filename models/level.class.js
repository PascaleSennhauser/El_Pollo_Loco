class Level {
    enemies;
    clouds;
    items;
    endboss;
    backgroundObjects;
    level_end_x = 4250;


    constructor(enemies, clouds, items, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
        this.backgroundObjects = backgroundObjects;
        this.setLevelEndX();
    }


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


    getEndboss() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.endboss = enemy;
            }
        });
    }
}