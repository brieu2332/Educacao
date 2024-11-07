let currentSlots = [];
let currentCards = [];
let lastTime = 0;

function update(currentTime) {
    // Calcula o tempo decorrido em segundos
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    draw();

    slotsUpdate(deltaTime);
    
    // Solicita o próximo frame para continuar a atualização
    requestAnimationFrame(update);
}


// Sequência de início do jogo
function gameStartSequence() {
    
    pickCards();
    let targetX = 250;
    let paddingX = 100;
    let targetY = 100;

    for (let i = currentCards.length - 1; i >= 0; i--) {
        let newCard = createCard(
            (canvas.width / 2) - (cardWidth / 2),
            canvas.height - (cardHeight * 3 / 2)
        );
        newCard.word = currentCards[i];
        cards.push(newCard);

        let newSlot = i < 4 ? createSlot(
            targetX + (paddingX + slotWidth) * i,
            targetY
        ) : createSlot(
            targetX + (paddingX + slotWidth) * (i - 4),
            slotHeight + (targetY * 3/2)
        ) 
        newSlot.word = currentSlots[i];
        slots.push(newSlot);
    }

    // Inicializa o loop de atualização do canvas
    update();

};

// Randomizar array
function shuffle(array) {
    let aux;

    // Loop para embaralhar o array
    for (let i = 0; i < array.length; i++) {
        let randIndex = Math.random() * (array.length - 1);
        aux = currentCards[i];
        currentCards[i] = currentCards[randIndex];
        currentCards[randIndex] = aux;
    }
    return array;
};

// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

// Sequência de início
gameStartSequence();