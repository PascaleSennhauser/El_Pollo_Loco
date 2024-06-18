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
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        ''
    ];
    isHurt = false;
    isWalking = false;
    walkingTime = 3000;
    attackingTime = 500;


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
        this.directionAnimation();
        this.imagesAnimation();
    }


    directionAnimation() {
        let directionInterval = setInterval(() => {
            if (this.canWalk()) {
                this.speed = 1.2;
                this.moveLeft();
            }
        }, 1000 / 60);
        this.animationIntervals.push(directionInterval);
    }


    canWalk() {
        return this.energy < 100 && this.isWalking;
    }


    imagesAnimation() {
        let animationCycle = this.walkingTime + this.attackingTime;
        let startTime = new Date().getTime();
        let animationInterval = setInterval(() => {
            let currentTime = new Date().getTime();
            let elapsedTime = (currentTime - startTime) % animationCycle;
            if (this.isDead())
                this.playAnimationDead();
            else if (this.isHurt)
                this.playAnimationHurt();
            else if (this.isAttacking())
                if (elapsedTime < this.walkingTime)
                    this.playAnimationWalking();
                else
                    this.playAnimationAttacking();
                else
                    this.playAnimationAlert();
        }, 200);
        this.animationIntervals.push(animationInterval);
    }


    playAnimationDead() {
        this.isWalking = false;
        this.playAnimationOnce(this.IMAGES_DEAD);
    }


    playAnimationHurt() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_HURT);
    }


    isAttacking() {
        return this.energy < 100;
    }


    playAnimationWalking() {
        this.isWalking = true;
        this.playAnimation(this.IMAGES_WALKING);
    }


    playAnimationAttacking() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_ATTACK);
    }


    playAnimationAlert() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_ALERT);
    }

}