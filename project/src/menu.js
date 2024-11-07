const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Função para desenhar um botão
function desenharBotao(x, y, width, height, texto, corBotao, corTexto) {
    ctx.fillStyle = corBotao;
    ctx.fillRect(x, y, width, height);

    // Estilo do texto
    ctx.fillStyle = corTexto;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, x + width / 2, y + height / 2);
}

// Função para verificar se o mouse está sobre o botão
function mouseSobreBotao(xMouse, yMouse, x, y, width, height) {
    return (
        xMouse >= x &&
        xMouse <= x + width &&
        yMouse >= y &&
        yMouse <= y + height
    );
}

// Definições dos botões
const botoes = [
    { x: 250, y: 300, width: 150, height: 50, texto: 'Voltar', corBotao: 'orange', link: '/amorin/index.html' },
    { x: 450, y: 300, width: 150, height: 50, texto: 'Continuar', corBotao: 'green', link: '/Teste JS/index.html' },
    { x: 350, y: 400, width: 150, height: 50, texto: 'Regras', corBotao: 'purple', link: '/regras.html' }
];

// Função para desenhar todos os botões
function desenharBotoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    botoes.forEach(botao => desenharBotao(botao.x, botao.y, botao.width, botao.height, botao.texto, botao.corBotao, 'white'));
}

// Evento de clique no botão
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const xMouse = event.clientX - rect.left;
    const yMouse = event.clientY - rect.top;

    // Verifica qual botão foi clicado
    botoes.forEach(botao => {
        if (mouseSobreBotao(xMouse, yMouse, botao.x, botao.y, botao.width, botao.height)) {
            window.location.href = botao.link; // Redireciona para o link do botão
        }
    });
});

// Desenha os botões inicialmente
desenharBotoes();
