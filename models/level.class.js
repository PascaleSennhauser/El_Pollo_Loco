class Level {
    enemies;
    clouds;
    items;
    backgroundObjects;
    background_sound;
    level_end_x = 4400;


    constructor(enemies, clouds, items, backgroundObjects, background_sound) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
        this.backgroundObjects = backgroundObjects;
        this.background_sound = background_sound;
    }
}