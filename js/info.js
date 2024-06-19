let infoText = [
    `Hola, Amigo/a! Welcome to "El Pollo Loco"! I am Pepe, and I need your help. The evil chicken "El Pollo Loco" has stolen the magical Salsa Bottle, and without it, we can't have a proper fiesta.`,
    `In this crazy adventure, you have to jump over chickens and chicks or on them or shoot them with a Salsa Bottle and fight your way to El Pollo Loco to get the magical Salsa Bottle back. El Pollo Loco must be hit 3 times before it is defeated.`,
    `Use the arrow keys to move and press the spacebar to throw a bottle. Collect as many coins and bottles as you can along the way. Pepe can carry a maximum of 5 bottles at a time. Be careful not to get caught by the chickens and chicks, or you will lose a life. While Pepe is hurt, you cannot collect any bottles or coins.`,
    `Are you ready for this adventure? Then let's get started. Good luck, Amigo/a!`
];
let pageNumber = 0;


/**
 * This function shows the information to the game.
 */
function showGameInfo() {
    removeDisplayNone('infoContainerWrapper');
    removeDisplayNone('infoContainer');
    renderInfoText();
}


/**
 * This function removes a html-element by the id.
 * @param {String} name - The id of the html-element
 */
function removeDisplayNone(name) {
    let tag = document.getElementById(name);
    tag.classList.remove('d-none');
}


/**
 * This function displays a html-element by the id.
 * @param {String} name - The id of the html-element
 */
function addDisplayNone(name) {
    let tag = document.getElementById(name);
    tag.classList.add('d-none');
}


/**
 * This function closes the game information.
 */
function closeGameInfo() {
    pageNumber = 0;
    addDisplayNone('infoContainerWrapper');
    addDisplayNone('infoContainer');
}


/**
 * This function renders the information text.
 */
function renderInfoText() {
    let textBox = document.getElementById('textBox');
    textBox.innerHTML = '';
    textBox.innerHTML = infoText[pageNumber];
}


/**
 * This function renders the next page of the information text.
 */
function nextPage() {
    pageNumber++;
    if (pageNumber < infoText.length) {
        renderInfoText();
    } else {
        closeGameInfo();
    }
}


/**
 * This function opens the keyboard instruction.
 */
function openInstruction() {
    removeDisplayNone('infoContainerWrapper');
    removeDisplayNone('instructionContainer');
}


/**
 * This function closes the keyboard instruction.
 */
function closeInstruction() {
    addDisplayNone('infoContainerWrapper');
    addDisplayNone('instructionContainer');
}