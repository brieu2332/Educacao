// Atualização do Canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Desenha todos os slots
    for (let slot of slots) {
        drawSlot(slot);
    }

    // Desenha todas as cartas
    for (let card of cards) {
        drawCard(card);
    }

    // Espera o próximo frame para repetir o processo
    requestAnimationFrame(update);
}

// Checagem de colisão
function isColliding(x, y, obj) {
    // Caso (x, y, obj2) - Colisão de ponto com objeto
    if (arguments.length == 3) {
        return x > obj.x && x < obj.x + obj.width &&
               y > obj.y && y < obj.y + obj.height;
               
    // Caso (obj1, obj2) - Colisão de dois objetos
    } else if (arguments.length == 2) {
        let obj1 = x;
        let obj2 = y;

        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }

    // Sem argumentos suficientes
    return false;
}


// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

// Inicializa o loop
update();