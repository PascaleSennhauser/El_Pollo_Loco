let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
    init();
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let endScreen = document.getElementById('endScreen');
    endScreen.style.display = 'none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'unset';
}

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function showStartScreen() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'unset';
    let endScreen = document.getElementById('endScreen');
    endScreen.style.display = 'none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
}

function showEndScreenLoose() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let endScreen = document.getElementById('endScreen');
    endScreen.style.display = 'unset';
    let lostScreenWrapper = document.getElementById('lostScreenWrapper');
    lostScreenWrapper.style.display = 'unset';
    let winnerScreenWrapper = document.getElementById('winnerScreenWrapper');
    winnerScreenWrapper.style.display = 'none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
}

function showEndScreenWin() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    let endScreen = document.getElementById('endScreen');
    endScreen.style.display = 'unset';
    lostScreenWrapper.style.display = 'none';
    let winnerScreenWrapper = document.getElementById('winnerScreenWrapper');
    winnerScreenWrapper.style.display = 'unset';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
    calculateCoins();
}

function calculateCoins() {
    let collectedCoins = document.getElementById('collectedCoins');
    collectedCoins.innerHTML = '';
    collectedCoins.innerHTML = world.character.coinsInventar;
    let numberOfCoins = document.getElementById('numberOfCoins');
    numberOfCoins.innerHTML = '';
    numberOfCoins.innerHTML = world.amountOfCoins;
}


document.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});


document.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

function soundOn() {
    let volumeIcon = document.getElementById('volumeIcon');
    let noVolumeIcon = document.getElementById('noVolumeIcon');
    volumeIcon.classList.remove('d-none');
    noVolumeIcon.classList.add('d-none');
}

function soundOff() {
    let volumeIcon = document.getElementById('volumeIcon');
    let noVolumeIcon = document.getElementById('noVolumeIcon');
    volumeIcon.classList.add('d-none');
    noVolumeIcon.classList.remove('d-none');
}