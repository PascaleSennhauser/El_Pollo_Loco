let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
    touchEvents();
    init();
    setSoundsForStartingGame();
    displayGameScreen();
    setVolumeGameScreen();
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function setSoundsForStartingGame() {
    pauseWinAndGameOverSound();
    setSoundsToStart();
    playSound('background_sound');
}


function pauseWinAndGameOverSound() {
    pauseSound('gameOver_sound');
    pauseSound('gameWin_sound');
}


function displayGameScreen() {
    display('gameScreenWrapper');
    noDisplay('startScreen');
    noDisplay('endScreen');
}

function display(name) {
    let screen = document.getElementById(name);
    screen.style.display = 'unset';
}

function noDisplay(name) {
    let screen = document.getElementById(name);
    screen.style.display = 'none';
}


function setVolumeGameScreen() {
    if (volumeOn == true) {
        soundOn('volumeIconGameScreen', 'noVolumeIconGameScreen');
    } else {
        soundOff('volumeIconGameScreen', 'noVolumeIconGameScreen');
    }
}


function showStartScreen() {
    pauseWinAndGameOverSound();
    displayStartScreen();
    setVolumeStartScreen();
}


function displayStartScreen() {
    display('startScreen');
    noDisplay('endScreen');
    noDisplay('gameScreenWrapper');
}


function setVolumeStartScreen() {
    if (volumeOn == true) {
        soundOn('volumeIcon', 'noVolumeIcon');
    } else {
        soundOff('volumeIcon', 'noVolumeIcon');
    }
}


function showEndScreenLoose() {
    setSoundsForEndScreenLoose();
    display('endScreen');
    display('lostScreenWrapper');
    noDisplay('startScreen');
    noDisplay('winnerScreenWrapper');
    noDisplay('gameScreenWrapper');
}


function setSoundsForEndScreenLoose() {
    pauseLoopSounds();
    playSound('gameOver_sound');
}

function showEndScreenWin() {
    setSoundsForEndScreenWin();
    display('endScreen');
    display('winnerScreenWrapper');
    noDisplay('startScreen');
    noDisplay('lostScreenWrapper');
    noDisplay('gameScreenWrapper');
    calculateCoins();
}


function setSoundsForEndScreenWin() {
    pauseLoopSounds();
    playSound('gameWin_sound');
}


function calculateCoins() {
    getCollectedCoins();
    getAmountOfCoins();
}


function getCollectedCoins() {
    let collectedCoins = document.getElementById('collectedCoins');
    collectedCoins.innerHTML = '';
    collectedCoins.innerHTML = world.character.coinsInventar;
}


function getAmountOfCoins() {
    let numberOfCoins = document.getElementById('numberOfCoins');
    numberOfCoins.innerHTML = '';
    numberOfCoins.innerHTML = world.amountOfCoins;
}


function touchEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

}


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


