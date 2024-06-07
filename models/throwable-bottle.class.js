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
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    
    constructor(x, y) {
        super(x, y);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isAboveGround() && !this.hit){
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                this.handleSplashAnimation(this.IMAGES_SPLASH);
                clearInterval(this.throwIntervalX); 
            }           
        }, 70);
    }

    handleSplashAnimation(images) {
        if (this.startIndex < images.length) {
            let path = images[this.startIndex];
            this.img = this.imageCache[path];
            this.startIndex++;
        }
    }

}