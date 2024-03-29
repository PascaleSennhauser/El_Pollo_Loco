class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    //img\5_background\layers\4_clouds\1.png
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.08;
        }, 1000 / 60);
    }
}