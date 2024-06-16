let sounds = {
    background_sound : new Audio('audio/music.mp3'),
    walking_sound : new Audio('audio/walking.mp3'),
    snoring_sound : new Audio('audio/snoring.mp3'),
    jumping_sound : new Audio('audio/jumping.mp3'),
    throwingBottle_sound : new Audio('audio/throw.mp3'),
    collectingBottle_sound : new Audio('audio/bottle.mp3'),
    chickenDead_sound : new Audio('audio/chicken.mp3'),
    collectCoin_sound : new Audio('audio/coin.mp3'),
    collision_sound : new Audio('audio/collision.mp3'),
    endboss_sound : new Audio('audio/endboss.mp3'),
    gameWin_sound : new Audio('audio/win.mp3'),
    gameOver_sound : new Audio('audio/game-over.mp3')
};
sounds['background_sound'].loop = true;
sounds['snoring_sound'].loop = true;
sounds['endboss_sound'].loop = true;

function soundOn() {
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
    Object.values(sounds).forEach((sound) => {
        sound.volume = volume;
    })
}

function setSoundsToStart() {
    Object.values(sounds).forEach((sound) => {
        sound.currentTime = 0;
    })
}

function pauseSound(nameOfSound) {
    sounds[nameOfSound].pause();
}

function playSound(nameOfSound) {
    sounds[nameOfSound].play();
}

function setSoundToStart(nameOfSound) {
    sounds[nameOfSound].currentTime = 0;
}

function pauseLoopSounds() {
    sounds['endboss_sound'].pause();
    sounds['background_sound'].pause();
    sounds['snoring_sound'].pause();
}