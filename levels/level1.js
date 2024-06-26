let level1;


/**
 * This function initializes the level with the enemies, the clouds, the items and the background-objects.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(-500),
            new Chicken(-500),
            new Chicken(300),
            new Chicken(300),
            new Chicken(300),
            new Chicken(1400),
            new Chicken(1400),
            new Chicken(1400),
            new Chicken(2000),
            new Chicken(2000),
            new Chicken(2200),
            new Chicken(2800),
            new Chicken(2800),
            new Chicken(3500),
            new Chicken(3500),
            new Chicken(4500),
            new Chicken(4500),
            new Chick(300),
            new Chick(800),
            new Chick(800),
            new Chick(1400),
            new Chick(2200),
            new Chick(2200),
            new Chick(2200),
            new Chick(3000),
            new Chick(3300),
            new Chick(3300),
            new Chick(4700),
            new Chick(4700),
            new Endboss()
        ],
        [
            new Cloud(1, -700),
            new Cloud(1, 0),
            new Cloud(1, 1400),
            new Cloud(1, 2100),
            new Cloud(1, 3500),
            new Cloud(2, -400),
            new Cloud(2, 100),
            new Cloud(2, 1600),
            new Cloud(2, 2500),
            new Cloud(2, 4000)
        ],
        [
            new Coin(-500, 300),
            new Coin(-400, 150),
            new Coin(-350, 150),
            new Coin(10, 100),
            new Coin(250, 325),
            new Coin(300, 300),
            new Coin(350, 325),
            new Coin(500, 150),
            new Coin(730, 325),
            new Coin(800, 325),
            new Coin(1000, 100),
            new Coin(1100, 150),
            new Coin(1440, 150),
            new Coin(1500, 100),
            new Coin(1560, 150),
            new Coin(1700, 300),
            new Coin(2100, 325),
            new Coin(2200, 300),
            new Coin(2300, 325),
            new Coin(2500, 100),
            new Coin(2600, 100),
            new Coin(2700, 100),
            new Coin(2800, 300),
            new Coin(3000, 150),
            new Coin(3100, 325),
            new Bottle(1, - 500),
            new Bottle(1, -350),
            new Bottle(2, 500),
            new Bottle(2, 550),
            new Bottle(2, 770),
            new Bottle(1, 820),
            new Bottle(1, 950),
            new Bottle(2, 1000),
            new Bottle(2, 1300),
            new Bottle(1, 1350),
            new Bottle(1, 1550),
            new Bottle(2, 1650),
            new Bottle(2, 2560),
            new Bottle(1, 2900),
            new BigBottle(4100)
        ],
        [

            new BackgroundObject('img/5_background/layers/air.png', 2 * -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * -719),

            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6)
        ]
    );
}