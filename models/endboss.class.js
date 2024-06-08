class Endboss extends MovableObject {
    x = 0;
    y = 60;
    height = 400;
    width = 270;
    offset = {
        top: 70,
        left: 30,
        right: 30,
        bottom: 50
    };
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    isHurt = false;
    isWalking = false;


    constructor() {
        super();
        this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.animate();
    }

    animate() {
        let walkingTime = 3000;
        let attackingTime = 2000;
        let animationCycle = walkingTime + attackingTime;
        let startTime = new Date().getTime();

        setInterval(() => {
            if (this.energy < 100 && this.isWalking) {
                this.speed = 0.3;
                this.moveLeft();
            }
        }, 1000 / 60);


        setInterval(() => {
            let currentTime = new Date().getTime();
            let elapsedTime = (currentTime - startTime) % animationCycle;

            if (this.isDead()) {
                this.isWalking = false;
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.isWalking = false;
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.energy < 100) {
                if (elapsedTime < walkingTime) {
                    this.isWalking = true;
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.isWalking = false;
                    this.playAnimation(this.IMAGES_ATTACK);
                }
             } else {
                this.isWalking = false;
                this.playAnimation(this.IMAGES_ALERT);
             }


        }, 200);
    }
}