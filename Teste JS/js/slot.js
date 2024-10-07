let slotColor = "rgb(246, 227, 148)";
const slots = [];
const slotWidth = 100;
const slotHeight = 150;

// Palavras dos slots
const slotWords = [
    "BARALHO", "LUVA", "CARAMBOLA", "ALMOFADA", "CAMALEÃO", "TUCANO", "ESCORPIÃO", "JIBOIA", "SOLDADO", 
    "SIRIEMA", "SAPATO", "LIMÃO", "CASA", "SACOLA", "REPOLHO", "FIVELA", "GIRASSOL", "GALINHA"
];

// Criar slot
function createSlot(x, y) {
    return {
        x: x,
        y: y,
        width: slotWidth,
        height: slotHeight,
        word: ""
    };
}

// Desenhar slot
function drawSlot(slot) {
    ctx.save();  

    ctx.translate(slot.x, slot.y);

    ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
    ctx.fillRect(0, 2, slot.width, slot.height);

    ctx.fillStyle = "rgb(246, 227, 148)";
    ctx.fillRect(0, 0, slot.width, slot.height);

    ctx.restore();
}

// EventListener para soltar o mouse
canvas.addEventListener('mouseup', () => {
    if (isDragging && draggableCard) {
        for (let slot of slots) {
            if (checkCard(draggableCard, slot) && draggableCard.word == slot.word) {
                draggableCard.draggable = false;
            }
        }
    }
});

function checkCard(card, slot) {
    let offset = 10;
    return  card.x < slot.x + offset &&
            card.x + offset > slot.x &&
            card.y < slot.y + offset &&
            card.y + offset > slot.y;
}

// Cria um slot no centro
const newSlot = createSlot(
    (document.getElementById("gameCanvas").width / 2) - (slotWidth / 2),    // Centro horizontal da tela
    (document.getElementById("gameCanvas").height / 2) - (slotHeight / 2)   // Centro vertical da tela
)
slots.push(newSlot);