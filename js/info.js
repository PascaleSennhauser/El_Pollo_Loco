let infoText = [
    `Hola, Amigo/a! Welcome to "El Pollo Loco"! I am Pepe, and I need your help. The evil chicken "El Pollo Loco" has stolen the magical Salsa Bottle, and without it, we can't have a proper fiesta.`,
    `In this crazy adventure, you have to jump over chickens and chicks or on them or shoot them with a Salsa Bottle and fight your way to El Pollo Loco to get the magical Salsa Bottle back. El Pollo Loco must be hit 3 times before it is defeated.`,
    `Use the arrow keys to move and press the spacebar to throw a bottle. Collect as many coins and bottles as you can along the way. Pepe can carry a maximum of 5 bottles at a time. Be careful not to get caught by the chickens and chicks, or you will lose a life. While Pepe is hurt, you cannot collect any bottles or coins.`,
    `Are you ready for this adventure? Then let's get started. Good luck, Amigo/a!`
];
let pageNumber = 0;

function showGameInfo() {
    let infoContainerWrapper = document.getElementById('infoContainerWrapper');
    infoContainerWrapper.classList.remove('d-none');
    let infoContainer = document.getElementById('infoContainer');
    infoContainer.classList.remove('d-none');
    renderInfoText();
}

function closeGameInfo() {
    pageNumber = 0;
    let infoContainerWrapper = document.getElementById('infoContainerWrapper');
    infoContainerWrapper.classList.add('d-none');
    let infoContainer = document.getElementById('infoContainer');
    infoContainer.classList.add('d-none');
}

function renderInfoText() {
    let textBox = document.getElementById('textBox');
    textBox.innerHTML = '';
    textBox.innerHTML = infoText[pageNumber];
}

function nextPage() {
    pageNumber++;
    if(pageNumber < infoText.length) {
        renderInfoText();
    } else {
        closeGameInfo();
    }
}


function openInstruction() {
    let infoContainerWrapper = document.getElementById('infoContainerWrapper');
    infoContainerWrapper.classList.remove('d-none');
    let instructionContainer = document.getElementById('instructionContainer');
    instructionContainer.classList.remove('d-none');
}

function closeInstruction() {
    let infoContainerWrapper = document.getElementById('infoContainerWrapper');
    infoContainerWrapper.classList.add('d-none');
    let instructionContainer = document.getElementById('instructionContainer');
    instructionContainer.classList.add('d-none');
}