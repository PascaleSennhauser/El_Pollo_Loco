class Level {
    enemies;
    clouds;
    items;
    endboss;
    backgroundObjects;
    background_sound;
    level_end_x = 4250;


    constructor(enemies, clouds, items, backgroundObjects, background_sound) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
        this.backgroundObjects = backgroundObjects;
        this.background_sound = background_sound;
        this.setLevelEndX();
    }

    setLevelEndX() {
        setInterval(() => {
                this.getEndboss();
                if (!this.endboss.isDead()) {
                    this.level_end_x = this.endboss.x - 30;
                    console.log('levelEnd', this.level_end_x);
                } else {
                    this.level_end_x = 4250;
                }

            }

        , 50);
    }


    getEndboss() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                console.log('enemyx', enemy.x);
                this.endboss = enemy;
            }
        });
    }
}