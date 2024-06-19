class StatusbarBottle extends Statusbar {
    x = 20;
    y = 40;
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    percentage = 0;

    
    /**
     * This constructor lods the images and sets the statusbar percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }

}