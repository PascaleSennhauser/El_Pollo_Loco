class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;


    /**
     * This constructor loads the image and sets important attributes.
     * @param {Number} number - Number 1 or 2 for the cloud-img 1 or cloud-img 2
     * @param {Number} startPoint - The starting point of the cloud
     */
    constructor(number, startPoint) {
        super();
        this.loadImage(`img/5_background/layers/4_clouds/${number}.png`);
        this.x = startPoint + Math.random() * 500;
        this.speed = Math.random() * 0.25;
        this.animate();
    }


    /**
     * This method sets an interval to animate the clouds.
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.isOutOfCanvas()) {
                this.setToEndOfCanvas();
            }
            this.moveLeft();
        }, 1000 / 60);
        this.animationIntervals.push(animationInterval);
    }

    
    /**
     * This method checks, if the clouds are out of the canvas.
     */
    isOutOfCanvas() {
        this.x < -1400
    }


    /**
     * This method sets the cloud, who is out of the canvas, to the end of the canvas.
     */
    setToEndOfCanvas() {
        this.x = 4315;
    }
}