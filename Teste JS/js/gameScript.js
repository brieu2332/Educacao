// Atualização do canvas cada frame
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
}

// Randomizar array
function shuffle(array) {
    let currentIndex = array.length;
    let aux;

    // Loop para embaralhar o array
    while (currentIndex > 0) {
        // Escolhe um índice aleatório entre 0 e currentIndex - 1
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        aux = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = aux;
    }

    return array;
}

// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

// Inicializa o loop
update();