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
    
    let newSlot = createSlot(
        (canvas.width / 2) - (slotWidth / 2),
        (canvas.height / 2) - (slotHeight / 2)
    )
    newSlot.word = currentSlots[0];
    slots.push(newSlot);

    newSlot = createSlot(
        (canvas.width / 2) + slotWidth ,
        (canvas.height / 2) - (slotHeight / 2)
    )
    newSlot.word = currentSlots[1];
    slots.push(newSlot);

    for (let i = currentCards.length - 1; i >= 0; i--) {
        let newCard = createCard(
            (canvas.width / 2) - (cardWidth / 2),
            canvas.height - (cardHeight * 3 / 2)
        );
        newCard.word = currentCards[i];
        cards.push(newCard);

        // let newSlot = createSlot(
        //     (canvas.width / 2) - (slotWidth / 2) ,
        //     (canvas.height / 2) - (slotHeight / 2)
        // )
        // newSlot.word = currentSlots[i];
        // slots.push(newSlot);
    }

    // Inicializa o loop de atualização do canvas
    update();

};

// // Randomizar array
// function shuffle(array) {
//     let i = array.length;
//     let aux;

//     // Loop para embaralhar o array
//     while (i > 0) {
//         let randIndex = Math.random() * 8;
//         aux = currentCards[i];
//         currentCards[i] = currentCards[randIndex]
//         currentCards[randIndex] = aux;
//         i--;
//     }
//     return array;
// };

// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

// Sequência de início
gameStartSequence();