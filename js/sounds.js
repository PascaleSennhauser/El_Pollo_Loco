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
sounds['walking_sound'].loop = true;
let volumeOn = true;


/**
 * This function is for when the sound for the game is on.
 * @param {String} volume - The id of the volume-img
 * @param {String} noVolume - The id of the noVolume-img
 */
function soundOn(volume, noVolume) {
    removeDisplayNone(volume);
    addDisplayNone(noVolume);
    setAudioVolume(1);
    volumeOn = true;
}


/**
 * This function is for when the sound for the game is off.
 * @param {String} volume - The id of the volume-img
 * @param {String} noVolume - The id of the noVolume-img
 */
function soundOff(volume, noVolume) {
    addDisplayNone(volume);
    removeDisplayNone(noVolume);
    setAudioVolume(0);
    volumeOn = false;
}


/**
 * This function sets the sound on or off.
 * @param {Number} volume - Number 1 for sound on and number 0 for sound off
 */
function setAudioVolume(volume) {
    Object.values(sounds).forEach((sound) => {
        sound.volume = volume;
    })
}


/**
 * This function sets all sounds to the start point.
 */
function setSoundsToStart() {
    Object.values(sounds).forEach((sound) => {
        sound.currentTime = 0;
    })
}


/**
 * This function pauses a sound.
 * @param {String} nameOfSound - The name of the sound
 */
function pauseSound(nameOfSound) {
    sounds[nameOfSound].pause();
}


/**
 * THis function plays a sound.
 * @param {String} nameOfSound - The name of the sound
 */
function playSound(nameOfSound) {
    sounds[nameOfSound].play();
}


/**
 * This function sets a specific sound to the start point.
 * @param {String} nameOfSound - The name of the sound
 */
function setSoundToStart(nameOfSound) {
    sounds[nameOfSound].currentTime = 0;
}


/**
 * This function pauses all loops from the loop-sounds.
 */
function pauseLoopSounds() {
    sounds['endboss_sound'].pause();
    sounds['background_sound'].pause();
    sounds['snoring_sound'].pause();
    sounds['walking_sound'].pause();
}