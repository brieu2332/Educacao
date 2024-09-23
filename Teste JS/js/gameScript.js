// Atualização do Canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for (let card of cards) {
        drawCard(card);
    }
    
    for (let slot of slots) {
        drawSlot(slot);
    }

    requestAnimationFrame(update);
}

// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

update();  // Inicializa o loop