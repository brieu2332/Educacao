const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Configurações dos botões
const botoes = [
    { x: 325, y: 150, width: 150, height: 50, texto: 'Continuar', corBotao: '#FF5733', hoverCor: '#C70039', link: '/public/game.html' },
    { x: 325, y: 250, width: 150, height: 50, texto: 'Regras', corBotao: '#28A745', hoverCor: '#1E7E34', link: '/public/index.html' },
    { x: 325, y: 350, width: 150, height: 50, texto: 'Voltar', corBotao: '#6C757D', hoverCor: '#495057', link: '/public/index.html' }
];

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
    ctx.fillStyle = botao.corBotao;
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
canvas.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    const xMouse = event.clientX - rect.left;
    const yMouse = event.clientY - rect.top;

    botoes.forEach(botao => {
        if (mouseSobreBotao(xMouse, yMouse, botao)) {
            botao.corBotao = botao.hoverCor; // Altera para a cor de hover
            botao.width = 170;              // Aumenta a largura
            botao.height = 60;              // Aumenta a altura
        } else {
            botao.corBotao = botao.corBotaoOriginal || botao.corBotao; // Restaura a cor original
            botao.width = 150;              // Largura padrão
            botao.height = 50;              // Altura padrão
        }
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
            window.location.href = botao.link; // Redireciona para o link do botão
        }
    });
});

// Desenha os botões inicialmente
botoes.forEach(botao => {
    botao.corBotaoOriginal = botao.corBotao; // Salva a cor original
});
desenharBotoes();
