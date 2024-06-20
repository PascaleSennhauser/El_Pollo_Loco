class ItemCollecting {
    amountOfCoins = 0;
    world;

    
    /**
     * This constructor is for getting a reference of the world and loading important methods.
     * @param {Object} world - The world object
     */
    constructor(world) {
        this.world = world;
        this.getAmountOfCoins();
    }


    /**
     * This method is for getting the amount of coins in the game.
     */
    getAmountOfCoins() {
        this.world.level.items.forEach((item) => {
            if (item instanceof Coin) {
                this.amountOfCoins++;
            }
        })
    }


    /**
     * This method checks if the character is colleting a coin.
     */
    checkCollectingCoins() {
        this.world.level.items.forEach((item, index) => {
            if (this.canCharacterCollectCoin(item)) {
                this.playCollectingCoinSound();
                // Adding bottle to the inventar of the character
                this.world.character.coinsInventar++;
                // Deleting bottle from the items array
                this.world.level.items.splice(index, 1);
                this.updateCoinBar();
            }
        })
    }


    /**
     * This method checks if the character can collect a coin.
     * @param {Object} item - The item object
     * @returns {Boolean} - Returns true if the character can collect a coin, otherwise false.
     */
    canCharacterCollectCoin(item) {
        return item instanceof Coin && this.world.character.isColliding(item) && !this.world.character.isHurt();
    }


    /**
     * This method plays the collectingCoin sound.
     */
    playCollectingCoinSound() {
        setSoundToStart('collectCoin_sound');
        playSound('collectCoin_sound');
    }


    /**
     * This method updates the coin bar.
     */
    updateCoinBar() {
        this.world.coinBar.percentage += (100 / this.amountOfCoins);
        this.world.coinBar.setPercentage(this.world.coinBar.percentage);
    }
    
    
    /**
     * This method checks if the character is collecting a bottle.
     */
    checkCollectingBottles() {
        for (let i = this.world.level.items.length - 1; i >= 0; i--) {
            let item = this.world.level.items[i];
            if (this.canCharacterCollectBottle(item)) {
                this.playCollectingBottleSound();
                // Adding bottle to the inventar of the character
                this.world.character.bottlesInventar++;
                // Deleting bottle from the items array
                this.world.level.items.splice(i, 1);
                this.updateBottleBar();
            }
        }
    }


    /**
     * This method checks if the character can collect a bottle.
     * @param {Object} item - The item object
     * @returns {Boolean} - Returns true if the character can collect a bottle, otherwise false.
     */
    canCharacterCollectBottle(item) {
        return item instanceof Bottle && this.world.character.bottlesInventar < 5 && this.world.character.isColliding(item) && !this.world.character.isHurt();
    }


    /**
     * This method plays the collectingbottle sound.
     */
    playCollectingBottleSound() {
        setSoundToStart('collectingBottle_sound');
        playSound('collectingBottle_sound');
    }


    /**
     * This method updates the bottle bar.
     */
    updateBottleBar() {
        this.world.bottleBar.percentage += 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
    }
}