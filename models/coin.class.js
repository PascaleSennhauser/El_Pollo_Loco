class Coin extends MovableObject {
    height = 100;
    width = 100;
    IMAGES_MOVING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 32,
        left: 32,
        right: 32,
        bottom: 32
    };
    collecting_coin_sound = new Audio('audio/coin.mp3');

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_MOVING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 500);
    }
}