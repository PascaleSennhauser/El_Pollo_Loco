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


    /**
     * This constructor loads the images, sets important attributes and loads other important methods.
     */
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


    /**
     * This method animates the endboss.
     */
    animate() {
        this.directionAnimation();
        this.imagesAnimation();
    }


    /**
     * This method sets an interval, so that the endboss walks.
     */
    directionAnimation() {
        let directionInterval = setInterval(() => {
            if (this.canWalk()) {
                this.speed = 1.5;
                this.moveLeft();
            }
        }, 1000 / 60);
        this.animationIntervals.push(directionInterval);
    }


    /**
     * This method is for looking if the endboss can walk.
     * @returns {Boolean} - Returns true if the endboss can walk, otherwise false.
     */
    canWalk() {
        return this.energy < 100 && this.isWalking;
    }


    /**
     * This method sets an interval to animate the endboss with images.
     */
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


    /**
     * This method plays the dead animation.
     */
    playAnimationDead() {
        this.isWalking = false;
        this.playAnimationOnce(this.IMAGES_DEAD);
    }


    /**
     * This method plays the hurt animation.
     */
    playAnimationHurt() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_HURT);
        this.setHurtTimeout();
    }


    /**
     * This method is for setting the time for how long the endboss is hurt.
     */
    setHurtTimeout() {
        setTimeout(() => {
            this.isHurt = false;
        }, 300)
    }


    /**
     * This method is for looking if the endboss has to attack.
     * @returns {Boolean} - Returns true if the endboss has to attack, otherwise false.
     */
    isAttacking() {
        return this.energy < 100;
    }


    /**
     * This method plays the walking animation.
     */
    playAnimationWalking() {
        this.isWalking = true;
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * This method plays the attacking animation.
     */
    playAnimationAttacking() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_ATTACK);
    }


    /**
     * This method plays the alert animation.
     */
    playAnimationAlert() {
        this.isWalking = false;
        this.playAnimation(this.IMAGES_ALERT);
    }

}