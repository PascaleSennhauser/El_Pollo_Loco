class ThrowableBottle extends ThrowableObject {
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ];


    /**
     * This constructor loads the images and the animate method.
     * @param {Number} x - The number of the x-coordinate
     * @param {Number} y - The number of the y-coordinate
     * @param {String} direction - The walking direction of the character ("left" or "right")
     */
    constructor(x, y, direction) {
        super(x, y, direction);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
    }


    /**
     * This method sets an interval to animate the throwing bottle with images.
     */
    animate() {
        setInterval(() => {
            if(this.isFlying()){
                this.playAnimationThrowing();
            } else {
                this.playAnimationSplashing();
            }           
        }, 50);
    }


    /**
     * This method is for checking if the bottle can is flying.
     * @returns {Boolean} - Returns true if the bottle is flying, otherwise false.
     */
    isFlying() {
        return this.isAboveGround() && !this.hit
    }


    /**
     * Thsi method plays the throwing animation.
     */
    playAnimationThrowing() {
        this.playAnimation(this.IMAGES_THROWING);
    }

    
    /**
     * This method plays the splashing animation.
     */
    playAnimationSplashing() {
        this.playAnimationOnce(this.IMAGES_SPLASH);
        clearInterval(this.throwIntervalX); 
    }

}