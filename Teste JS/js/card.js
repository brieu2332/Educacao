const cards = [];
const cardWidth = 100;
const cardHeight = 150;
let isDragging = false;

// Criar carta
function createCard(x, y) {
    return {
        x: x,
        y: y,
        width: cardWidth,
        height: cardHeight,
        offset_x: 0,
        offset_y: 0,
        draggable: true,
        drag: false,
        rot: Math.random() * 8 - 4
    };
}

// EventListener para o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    if (isDragging && draggableCard) {
        draggableCard.x = mouseX + draggableCard.offset_x;
        draggableCard.y = mouseY + draggableCard.offset_y;
    }
    
});

// EventListener para o click do mouse
canvas.addEventListener('mousedown', () => {
    for (let card of cards) {
        if (isColliding(mouseX, mouseY, card) && card.draggable) {
            isDragging = true;
            draggableCard = card;
            card.drag = true;
            card.offset_x = card.x - mouseX;
            card.offset_y = card.y - mouseY;
            card.rot = 0;
            break;
        }
    }
});

// EventListener para soltar o mouse
canvas.addEventListener('mouseup', () => {
    if (isDragging && draggableCard) {
        draggableCard.drag = false;
        isDragging = false;
        draggableCard.rot = Math.random() * 12 - 6;
        draggableCard = null;
    }
});

// Checagem de colisão com a carta
function isColliding(x, y, card) {
    return x > card.x && x < card.x + card.width &&
           y > card.y && y < card.y + card.height;
}

// Desenhar carta
function drawCard(card) {
    ctx.save();
    
    ctx.translate(card.x + card.width / 2, card.y + card.height / 2);   // Seta origem para o centro da carta
    ctx.rotate(card.rot * Math.PI / 180);   // Rotaciona a partir da origem
    ctx.translate(-card.width / 2, -card.height / 2);   

    ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
    ctx.fillRect(0, 2, card.width, card.height);

    ctx.fillStyle = (card.draggable) ? "rgb(60, 175, 157)" : "rgb(29, 146, 126)";
    ctx.fillRect(0, 0, card.width, card.height);

    ctx.restore();
}

// Botao pra criar carta
canvas.addEventListener("keydown", (event) => {
    // Verifica se a barra de espaço foi pressionada e não esta segurando uma carta
    if (event.code === "Space" && !isDragging) {
        const newCard = createCard(
            (document.getElementById("gameCanvas").width / 2) - (cardWidth / 2),    // Centro horizontal da tela
            (document.getElementById("gameCanvas").height / 2) - (cardHeight / 2)   // Centro vertical da tela
        );

        // Desabilita todas as cartas
        if (cards.length > 0) {
            for (let card of cards) {
                ard.draggable = false;
            }
        }
        
        // Cria uma carta habilitada
        newCard.draggable = true;
        cards.push(newCard);
    }
});
