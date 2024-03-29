class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    //img\5_background\layers\4_clouds\1.png
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
    }
}