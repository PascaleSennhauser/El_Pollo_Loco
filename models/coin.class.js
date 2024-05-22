class Coin extends MovableObject {
    height = 100;
    width = 100;
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.y = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }
}