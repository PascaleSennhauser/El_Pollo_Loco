class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 65;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor(startPoint) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = startPoint + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        this.directionAnimation();
        this.imagesAnimation();
    }


    directionAnimation() {
        let directionInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.animationIntervals.push(directionInterval);
    }


    imagesAnimation() {
        let animationInterval = setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(animationInterval);
                this.loadImage(this.IMAGE_DEAD);
            }
        }, 200);
        this.animationIntervals.push(animationInterval);
    }

}