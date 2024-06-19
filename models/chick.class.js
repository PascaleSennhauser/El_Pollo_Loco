class Chick extends MovableObject {
    y = 365;
    height = 55;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    /**
     * This constructor loads the images and sets important attributes.
     * @param {Number} startPoint - The starting point of the chick
     */
    constructor(startPoint) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = startPoint + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * This method animates the chick.
     */
    animate() {
        this.directionAnimation();
        this.imagesAnimation();
    }


    /**
     * This method sets an interval, so that chick walks.
     */
    directionAnimation() {
        let directionInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.animationIntervals.push(directionInterval);
    }

    
    /**
     * This method sets an interval to animate the chick with images.
     */
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