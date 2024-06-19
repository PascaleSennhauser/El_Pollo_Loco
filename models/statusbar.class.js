class Statusbar extends DrawableObject {
    x = 20;
    y = 0;
    IMAGES = [];
    height = 50;
    width = 170;
    percentage = 100;

    
    /**
     * This method sets the percentage of a status bar.
     * @param {Number} percentage - The percentage number
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This method resolves the percentage number to an image.
     * @returns {Number} - Returns a number for the image in the array
     */
    resolveImageIndex() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage >= 80)
            return 4;
        else if (this.percentage >= 60)
            return 3;
        else if (this.percentage >= 40)
            return 2;
        else if (this.percentage >= 20)
            return 1;
        else
            return 0;
    }
}