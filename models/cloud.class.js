class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor(number, startPoint) {
        super().loadImage(`img/5_background/layers/4_clouds/${number}.png`);
        this.x = startPoint + Math.random() * 500;
        this.speed = Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isOutOfCanvas()) {
                this.setToEndOfCanvas();
            }
            this.moveLeft();
        }, 1000 / 60);
    }

    isOutOfCanvas() {
        this.x < -1400
    }


    setToEndOfCanvas() {
        this.x = 4315;
    }
}