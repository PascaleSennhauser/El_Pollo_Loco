class Coin extends MovableObject {
    height = 100;
    width = 100;
    offset = {
        top: 32,
        left: 32,
        right: 32,
        bottom: 32
    };
    IMAGES_MOVING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    collecting_coin_sound = new Audio('audio/coin.mp3');


    /**
     * This constructor loads the images and sets important attributes.
     * @param {Number} x - The x-coordinate
     * @param {Number} y - The y-coordinate
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_MOVING);
        this.x = x;
        this.y = y;
        this.animate();
    }

    
    /**
     * This method animates the coin.
     */
    animate() {
        let animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 500);
        this.animationIntervals.push(animationInterval);
    }
    
}