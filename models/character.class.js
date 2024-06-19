class Character extends MovableObject {
    y = 120;
    height = 300;
    width = 120;
    offset = {
        top: 118,
        bottom: 15,
        left: 25,
        right: 35
    };
    speed = 10;
    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    bottlesInventar = 0;
    coinsInventar = 0;


    /**
     * This constructor loads all the different images and other important functions for the character.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.updateTimeLastAction();
    }


    /**
     * This function animates the character.
     */
    animate() {
        this.directionAniamtion();
        this.imagesAnimation();
    }


    /**
     * This function sets an interval, so that the character can walk left and right, as well as jump.
     */
    directionAniamtion() {
        let directionInterval = setInterval(() => {
            pauseSound('walking_sound');
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
            this.settingCamera();
        }, 1000 / 60);
        this.animationIntervals.push(directionInterval);
    }


    /**
     * This function is for looking if the character can move right.
     * @returns {Boolean} - Returns true if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead();
    }


    /**
     * This function is to move the character right.
     */
    moveRight() {
        this.otherDirection = false;
        super.moveRight();
        if (!this.isAboveGround()) {
            playSound('walking_sound');
        }
    }


    /**
     * This function is for looking if the character can move left.
     * @returns {Boolean} - Returns true if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -610 && !this.isDead();
    }


    /**
     * This function is to move the character left.
     */
    moveLeft() {
        this.otherDirection = true;
        super.moveLeft();
        if (!this.isAboveGround()) {
            playSound('walking_sound');
        }
    }


    /**
     * This function is for looking if the character can jump.
     * @returns {Boolean} - Returns true if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() && !this.isDead();
    }


    /**
     * This function is to jump.
     */
    jump() {
        super.jump();
        setSoundToStart('jumping_sound');
        playSound('jumping_sound');
    }


    /**
     * This function is for setting the camera.
     */
    settingCamera() {
        this.world.camera_x = -this.x + 200;
    }


    /**
     * This function sets an interval to animate the character with images.
     */
    imagesAnimation() {
        let animationInterval = setInterval(() => {
            pauseSound('snoring_sound');
            if (this.isDead()) {
                this.playAnimationDead();
            } else if (this.isHurt()) {
                this.playAnimationHurt();
            } else if (this.isAboveGround()) {
                this.playAnimationJumping();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimationWalking();
            } else if (this.isStanding(this.timeLastAction)) {
                this.playAnimationStanding();
            } else if (this.isWaiting(this.timeLastAction)) {
                this.playAnimationSnoring();
            }
        }, 100);
        this.animationIntervals.push(animationInterval);
    }


    /**
     * This function plays the dead animation.
     */
    playAnimationDead() {
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * This function plays the hurt animation.
     */
    playAnimationHurt() {
        this.updateStartIndex();
        this.updateTimeLastAction();
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * This function plays the jumping animation.
     */
    playAnimationJumping() {
        this.updateTimeLastAction();
        this.playAnimationOnce(this.IMAGES_JUMPING);
    }


    /**
     * This function plays the walking animation.
     */
    playAnimationWalking() {
        this.updateStartIndex();
        this.updateTimeLastAction();
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * This function plays the standing animation.
     */
    playAnimationStanding() {
        this.updateStartIndex();
        this.playAnimation(this.IMAGES_STANDING);
    }


    /**
     * This function plays the snoring animation.
     */
    playAnimationSnoring() {
        playSound('snoring_sound');
        this.updateStartIndex();
        this.playAnimation(this.IMAGES_WAITING);
    }

}