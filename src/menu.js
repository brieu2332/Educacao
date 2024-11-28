// Configurações dos botões
const botoes = [];

function criarBotoes() {
    let targetX = (canvas.width / 2) - 75;
    let targetY = (canvas.height / 2) - 100;

    botoes.push({ x: targetX, y: targetY, width: 150, height: 50, texto: 'Jogar', cor: '#FF5733', corBotao: '#C70039', hoverCor: '#FF5733', action: () => {handleGameStart();}});
    targetY += 75;
    botoes.push({ x: targetX, y: targetY, width: 150, height: 50, texto: 'Regras', cor: '#28A745', corBotao: '#1E7E34', hoverCor: '#28A745', action: () => { window.location.href = '/public/index.html'; }})
    targetY += 75;
    botoes.push({ x: targetX, y: targetY, width: 150, height: 50, texto: 'Voltar', cor: '#6C757D', corBotao: '#495057', hoverCor: '#6C757D', action: () => { window.location.href = '/public/index.html';}})
}

// Função para desenhar um botão com bordas arredondadas
function desenharBotao(botao) {
    const radius = 10; // Raio das bordas arredondadas

    ctx.beginPath();
    ctx.moveTo(botao.x + radius, botao.y);
    ctx.lineTo(botao.x + botao.width - radius, botao.y);
    ctx.quadraticCurveTo(botao.x + botao.width, botao.y, botao.x + botao.width, botao.y + radius);
    ctx.lineTo(botao.x + botao.width, botao.y + botao.height - radius);
    ctx.quadraticCurveTo(botao.x + botao.width, botao.y + botao.height, botao.x + botao.width - radius, botao.y + botao.height);
    ctx.lineTo(botao.x + radius, botao.y + botao.height);
    ctx.quadraticCurveTo(botao.x, botao.y + botao.height, botao.x, botao.y + botao.height - radius);
    ctx.lineTo(botao.x, botao.y + radius);
    ctx.quadraticCurveTo(botao.x, botao.y, botao.x + radius, botao.y);
    ctx.closePath();

    // Aplica a cor do botão
    ctx.fillStyle = botao.cor;
    ctx.fill();

    // Desenha o texto
    ctx.fillStyle = '#FFFFFF'; // Cor do texto
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(botao.texto, botao.x + botao.width / 2, botao.y + botao.height / 2);
}

// Função para verificar se o mouse está sobre o botão
function mouseSobreBotao(xMouse, yMouse, botao) {
    return (
        xMouse >= botao.x &&
        xMouse <= botao.x + botao.width &&
        yMouse >= botao.y &&
        yMouse <= botao.y + botao.height
    );
}

// Função para desenhar todos os botões
function desenharBotoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    botoes.forEach(botao => desenharBotao(botao));    // Redesenha os botões
}

// Evento para detectar movimento do mouse e aplicar efeito de hover
canvas.addEventListener('mousemove', () => {
    botoes.forEach((botao) => {
        botao.cor = isColliding(mouseX, mouseY, botao) ? botao.corBotao : botao.hoverCor;
    });

    desenharBotoes(); // Redesenha os botões
});

// Evento para clique nos botões
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const xMouse = event.clientX - rect.left;
    const yMouse = event.clientY - rect.top;

    botoes.forEach(botao => {
        if (mouseSobreBotao(xMouse, yMouse, botao)) {
            botao.action();
        }
    });
});

// Desenha os botões inicialmente
botoes.forEach(botao => {
    botao.corBotaoOriginal = botao.corBotao; // Salva a cor original
});

criarBotoes();
desenharBotoes();
