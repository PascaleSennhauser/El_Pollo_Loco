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
    displayScreen('gameScreenWrapper');
    noDisplayScreen('startScreen');
    noDisplayScreen('endScreen');
}

function displayScreen(name) {
    let screen = document.getElementById(name);
    screen.style.display = 'unset';
}

function noDisplayScreen(name) {
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
    displayScreen('startScreen');
    noDisplayScreen('endScreen');
    noDisplayScreen('gameScreenWrapper');
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
    displayScreen('endScreen');
    displayScreen('lostScreenWrapper');
    noDisplayScreen('startScreen');
    noDisplayScreen('winnerScreenWrapper');
    noDisplayScreen('gameScreenWrapper');
}


function setSoundsForEndScreenLoose() {
    pauseLoopSounds();
    playSound('gameOver_sound');
}

function showEndScreenWin() {
    setSoundsForEndScreenWin();
    displayScreen('endScreen');
    displayScreen('winnerScreenWrapper');
    noDisplayScreen('startScreen');
    noDisplayScreen('lostScreenWrapper');
    noDisplayScreen('gameScreenWrapper');
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
        keyboard.LEFT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
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


