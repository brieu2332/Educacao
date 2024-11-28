const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Função geral de desenho
function draw() {
    // Limpa o canvas para evitar sobreposição de desenhos anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Desenha todas as cartas e slots
    for (let slot of slots) {
        drawSlot(slot);
    }
    
    for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i] !== draggedCard) {
            drawCard(cards[i]);
        }
    }

    if (draggedCard) {
        drawCard(draggedCard);
    }

};

