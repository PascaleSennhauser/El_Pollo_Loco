let canvas;
let world;
let keyboard = new Keyboard();


/**
 * This function gets exeuted when the start button is clicked and starts the game.
 */
function startGame() {
    touchStartEvents();
    touchEndEvents();
    mouseDownEvents();
    mouseUpEvents();
    init();
    setSoundsForStartingGame();
    displayGameScreen();
    setVolumeGameScreen();
}


/**
 * This function initializes the game.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * This function is for getting the correct sounds, when starting the game.
 */
function setSoundsForStartingGame() {
    pauseWinAndGameOverSound();
    setSoundsToStart();
    playSound('background_sound');
}


/**
 * This function pauses the winning- and game-over-sounds.
 */
function pauseWinAndGameOverSound() {
    pauseSound('gameOver_sound');
    pauseSound('gameWin_sound');
}


/**
 * This function shows the gaming-screen.
 */
function displayGameScreen() {
    display('gameScreenWrapper');
    noDisplay('startScreen');
    noDisplay('endScreen');
}


/**
 * This function displays a html-element by the id.
 * @param {String} name - The id of the html-element
 */
function display(name) {
    let screen = document.getElementById(name);
    screen.style.display = 'unset';
}


/**
 * This function removes a html-element by the id.
 * @param {String} name - The id of the html-element
 */
function noDisplay(name) {
    let screen = document.getElementById(name);
    screen.style.display = 'none';
}


/**
 * This function sets the sound on or off in the game screen.
 */
function setVolumeGameScreen() {
    if (volumeOn == true) {
        soundOn('volumeIconGameScreen', 'noVolumeIconGameScreen');
    } else {
        soundOff('volumeIconGameScreen', 'noVolumeIconGameScreen');
    }
}


/**
 * This function is executed, when the start screen is shown.
 */
function showStartScreen() {
    pauseWinAndGameOverSound();
    displayStartScreen();
    setVolumeStartScreen();
}


/**
 * This function shows the start screen.
 */
function displayStartScreen() {
    display('startScreen');
    noDisplay('endScreen');
    noDisplay('gameScreenWrapper');
}


/**
 * This function sets the sound on or off in the start screen.
 */
function setVolumeStartScreen() {
    if (volumeOn == true) {
        soundOn('volumeIcon', 'noVolumeIcon');
    } else {
        soundOff('volumeIcon', 'noVolumeIcon');
    }
}


/**
 * This function shows the end screen, when the game is over.
 */
function showEndScreenLoose() {
    setSoundsForEndScreenLoose();
    display('endScreen');
    display('lostScreenWrapper');
    noDisplay('startScreen');
    noDisplay('winnerScreenWrapper');
    noDisplay('gameScreenWrapper');
}


/**
 * This function sets the sound for when the game is over.
 */
function setSoundsForEndScreenLoose() {
    pauseLoopSounds();
    playSound('gameOver_sound');
}


/**
 * This function shows the winning screen.
 */
function showEndScreenWin() {
    setSoundsForEndScreenWin();
    display('endScreen');
    display('winnerScreenWrapper');
    noDisplay('startScreen');
    noDisplay('lostScreenWrapper');
    noDisplay('gameScreenWrapper');
    calculateCoins();
}


/**
 * This function sets the sound for when the game is won.
 */
function setSoundsForEndScreenWin() {
    pauseLoopSounds();
    playSound('gameWin_sound');
}


/**
 * This function calculates the collected coins and gets the amount of all coins.
 */
function calculateCoins() {
    getCollectedCoins();
    getAmountOfCoins();
}


/**
 * This function gets the collected coins.
 */
function getCollectedCoins() {
    let collectedCoins = document.getElementById('collectedCoins');
    collectedCoins.innerHTML = '';
    collectedCoins.innerHTML = world.character.coinsInventar;
}


/**
 * This function gets the amount of all coins.
 */
function getAmountOfCoins() {
    let numberOfCoins = document.getElementById('numberOfCoins');
    numberOfCoins.innerHTML = '';
    numberOfCoins.innerHTML = world.amountOfCoins;
}


/**
 * This function adds event listener for when the keyboard-buttons are used with the finger.
 */
function touchStartEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
}


/**
 * This function adds event listener for when the keyboard-buttons are released.
 */
function touchEndEvents() {
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}


/**
 * This function adds event listener for when the keyboard-buttons are pressed with the mouse.
 */
function mouseDownEvents() {
    document.getElementById('btnRight').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnLeft').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnJump').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('btnThrow').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
}


/**
 * This function adds event listener for when the keyboard-buttons are released with the mouse.
 */
function mouseUpEvents() {
    document.getElementById('btnRight').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnJump').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnThrow').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}


/**
 * This function adds an event listener for the keyboard-keys when they are pressed.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});


/**
 * This function adds an event listener for the keyboard-keys, when they are released.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});