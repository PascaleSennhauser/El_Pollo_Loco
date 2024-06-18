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

    animate() {
        this.directionAniamtion();
        this.imagesAnimation();
    }


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


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    moveRight() {
        this.otherDirection = false;
        super.moveRight();
        if (!this.isAboveGround()) {
            playSound('walking_sound');
        }
    }


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -610;
    }


    moveLeft() {
        this.otherDirection = true;
        super.moveLeft();
        if (!this.isAboveGround()) {
            playSound('walking_sound');
        }
    }


    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    jump() {
        super.jump();
        setSoundToStart('jumping_sound');
        playSound('jumping_sound');
    }


    settingCamera() {
        return this.world.camera_x = -this.x + 200;
    }


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


    playAnimationDead() {
        this.playAnimation(this.IMAGES_DEAD);
    }


    playAnimationHurt() {
        this.updateStartIndex();
        this.updateTimeLastAction();
        this.playAnimation(this.IMAGES_HURT);
    }


    playAnimationJumping() {
        this.updateTimeLastAction();
        this.playAnimationOnce(this.IMAGES_JUMPING);
    }


    playAnimationWalking() {
        this.updateStartIndex();
        this.updateTimeLastAction();
        this.playAnimation(this.IMAGES_WALKING);
    }


    playAnimationStanding() {
        this.updateStartIndex();
        this.playAnimation(this.IMAGES_STANDING);
    }


    playAnimationSnoring() {
        playSound('snoring_sound');
        this.updateStartIndex();
        this.playAnimation(this.IMAGES_WAITING);
    }

}