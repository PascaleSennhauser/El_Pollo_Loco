let isSoundOn = true; // Variable to track the sound state
let background_sound = new Audio('audio/music.mp3');
background_sound.loop = true;
let walking_sound = new Audio('audio/walking.mp3');
let snoring_sound = new Audio('audio/snoring.mp3');
snoring_sound.loop = true;
let jumping_sound = new Audio('audio/jumping.mp3');
let throwingBottle_sound = new Audio('audio/throw.mp3');
let collectingBottle_sound = new Audio('audio/bottle.mp3');
let chickenDead_sound = new Audio('audio/chicken.mp3');
let collectCoin_sound = new Audio('audio/coin.mp3');
let collision_sound = new Audio('audio/collision.mp3');
let endboss_sound = new Audio('audio/endboss.mp3');
endboss_sound.loop = true;
let gameWin_sound = new Audio('audio/win.mp3');
let gameOver_sound = new Audio('audio/game-over.mp3');

function soundOn() {
    isSoundOn = true;
    let volumeIcon = document.getElementById('volumeIcon');
    let noVolumeIcon = document.getElementById('noVolumeIcon');
    volumeIcon.classList.remove('d-none');
    noVolumeIcon.classList.add('d-none');
    setAudioVolume(1);
}

function soundOff() {
    let volumeIcon = document.getElementById('volumeIcon');
    let noVolumeIcon = document.getElementById('noVolumeIcon');
    volumeIcon.classList.add('d-none');
    noVolumeIcon.classList.remove('d-none');
    setAudioVolume(0);
}

function setAudioVolume(volume) {
    background_sound.volume = volume;
    walking_sound.volume = volume;
    snoring_sound.volume = volume;
    jumping_sound.volume = volume;
    throwingBottle_sound.volume = volume;
    collectingBottle_sound.volume = volume;
    chickenDead_sound.volume = volume;
    collectCoin_sound.volume = volume;
    collision_sound.volume = volume;
    endboss_sound.volume = volume;
    gameWin_sound.volume = volume;
    gameOver_sound.volume = volume;
}

function setSoundsToStart() {
    background_sound.currentTime = 0;
    walking_sound.currentTime = 0;
    snoring_sound.currentTime = 0;
    jumping_sound.currentTime = 0;
    throwingBottle_sound.currentTime = 0;
    collectingBottle_sound.currentTime = 0;
    chickenDead_sound.currentTime = 0;
    collectCoin_sound.currentTime = 0;
    collision_sound.currentTime = 0;
    endboss_sound.currentTime = 0;
    gameWin_sound.currentTime = 0;
    gameOver_sound.currentTime = 0;
}

function pauseSound(nameOfSound) {
    nameOfSound.pause();
}

function playSound(nameOfSound) {
    nameOfSound.play();
}

function setSoundToStart(nameOfSound) {
    nameOfSound.currentTime = 0;
}