//#region Vars

    let mouseX = -1;
    let mouseY = -1;

    const cards = [];
    const cardWidth = 200;
    const cardHeight = 200;
    let draggedCard = null;
    let isDragging = false;
    // Palavras das cartas azuis (18)
    const cardWords = [
        "ALHO", "UVA", "BOLA", "FADA", "LEÃO", "CANO", "PIÃO", "BOIA", "DADO", 
        "EMA", "PATO", "MÃO", "ASA", "COLA", "OLHO", "VELA", "SOL", "LINHA"
    ];
    
    const slots = [];
    const slotWidth = 200;
    const slotHeight = 200;
    // Palavras dos slots (18)
    const slotWords = [
        "BARALHO", "LUVA", "CARAMBOLA", "ALMOFADA", "CAMALEÃO", "TUCANO", "ESCORPIÃO", "JIBOIA", "SOLDADO", 
        "SIRIEMA", "SAPATO", "LIMÃO", "CASA", "SACOLA", "REPOLHO", "FIVELA", "GIRASSOL", "GALINHA"
    ];
    
    let loaderCounter = 0;
    const loaderSpeed = Math.PI * (3/2);

//#endregion

//#region Constructor

    // Criar carta
    function createCard(x, y, word) {
        return {
            x: x,
            y: y,
            width: cardWidth,
            height: cardHeight,
            offset_x: 0,
            offset_y: 0,
            drag: false,
            rot: 0,
            word: word
        };
    }

    // Criar slot
    function createSlot(x, y, word) {
        return {
            color: "rgb(246, 227, 148)",
            x: x,
            y: y,
            width: slotWidth,
            height: slotHeight,
            word: word,
            loaderCounter: 0
        };
    }

//#endregion

//#region Updates

    // Função de update dos slots
    function slotsUpdate(deltaTime) {
        for (let slot of slots) {
            if (isColliding(mouseX, mouseY, slot) && isDragging) {
                slot.loaderCounter += loaderSpeed * deltaTime;
                if (slot.loaderCounter >= 2 * Math.PI) slot.loaderCounter = 2 * Math.PI; // Limita o loader a 360°
                drawLoader(slot);
            } else if (slot.loaderCounter !== 0) {
                slot.loaderCounter = 0;
            }
        }
    }    

//#endregion

//#region Draws

    // Desenhar carta
    function drawCard(card) {
        // Salva o contexto atual (padrão)
        ctx.save();
        
        ctx.translate(card.x + card.width / 2, card.y + card.height / 2);   // Seta origem para o centro da carta
        ctx.rotate(card.rot * Math.PI / 180);                               // Rotaciona a partir da origem
        ctx.translate(-card.width / 2, -card.height / 2);                   // Seta origem cara o canto superior esquerdo

        // Desenha sombra e carta a partir da origem (card.x, card.y)
        ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
        ctx.fillRect(0, 2, card.width, card.height);

        ctx.fillStyle = "rgb(60, 175, 157)";
        ctx.fillRect(0, 0, card.width, card.height);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(card.word, card.width / 2, card.height / 2);

        // Retorna ao contexto padrão:
        // Devolve o translate para o canto superior esquerdo do canvas, define a rotação de volta para 0, 
        // restaura as valores de cor do fillStyle, etc.
        ctx.restore();
    }

    // Desenhar slot
    function drawSlot(slot) {
        ctx.save();  
    
        ctx.translate(slot.x, slot.y);
    
        ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
        ctx.fillRect(0, 2, slot.width, slot.height);
    
        ctx.fillStyle = slot.color;
        ctx.fillRect(0, 0, slot.width, slot.height);
        
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(slot.word, slot.width / 2, slot.height / 2);
    
        ctx.restore();
    }

    function drawLoader(slot) {
        ctx.save();
        ctx.beginPath();
        
        ctx.arc(
            slot.x + slot.width / 2, 
            slot.y - 30, 
            10, 
            1.5 * Math.PI, 
            1.5 * Math.PI + slot.loaderCounter
        );
        
        ctx.strokeStyle = '#FDFEFE';
        ctx.lineWidth = 10;
        ctx.stroke();
        
        ctx.restore();
    }
    

//#endregion

//#region  Events

    // EventListener para o movimento do mouse
    canvas.addEventListener('mousemove', (e) => {
        // Pega as coordenadas do mouse
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Se esta arrastando e existe uma carta arrastável
        if (isDragging && draggedCard) {
            draggedCard.x = mouseX + draggedCard.offset_x;
            draggedCard.y = mouseY + draggedCard.offset_y;
        }
        
    });
    
    // EventListener para o click do mouse
    canvas.addEventListener('mousedown', () => {
        // Checa cada carta atrás de uma arrastável
        for (let card of cards) {
            if (isColliding(mouseX, mouseY, card)) {
                isDragging = true;
                draggedCard = card;
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
        if (isDragging && draggedCard) {
            for (let i = slots.length - 1; i >= 0; i--) {
                if (isColliding(mouseX, mouseY, slots[i]) && slots[i].loaderCounter >= 2 * Math.PI && checkWord(draggedCard, slots[i])) {
                    slots[i].color = "rgb(153, 201, 158)";
                    cards.splice(cards.indexOf(draggedCard), 1);
                    break
                }
            }
            draggedCard.drag = false;
            isDragging = false;
            draggedCard.rot = Math.random() * 12 - 6;
            draggedCard = null;
        }
    });

//#endregion

//#region Functions

    // Checagem de colisão
    function isColliding(x, y, obj = null) {
        // Caso (x, y, obj2) - Colisão de ponto com objeto
        if (obj != null) {
            return x > obj.x && x < obj.x + obj.width &&
                y > obj.y && y < obj.y + obj.height;
                
        // Caso (obj1, obj2) - Colisão de dois objetos
        } else {
            let obj1 = x;
            let obj2 = y;

            return obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y;
        }
    };

    function pickCards() {
        let i = 0;
        let usedIndex = [];

        while (i < 8) {
            let randIndex = Math.floor(Math.random() * 18);
            if (!usedIndex.includes(randIndex)) {
                currentSlots.push(slotWords[randIndex]);
                currentCards.push(cardWords[randIndex]);
                usedIndex.push(randIndex);
                i++;
            }
        }
    }

    function checkWord(card, slot) {
        let sword = slot.word;
        let cword = card.word;
        let j = 0;
    
        for (let i = 0; i < sword.length; i++) {
            if (sword[i] === cword[j]) {
                j++;
                if (j === cword.length) {
                    return true;
                }
            } else {
                j = 0;
            }
        }
    
        return false;
    }    

//#endregion

