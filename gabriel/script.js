const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Desenha um retângulo
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 150, 100);

// Desenha uma linha
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(200, 200);
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.stroke();

// Desenha um círculo
ctx.beginPath();
ctx.arc(300, 200, 50, 0, Math.PI * 2, false);
ctx.fillStyle = 'green';
ctx.fill();

// Desenha um retângulo preenchido
ctx.fillStyle = "red";
ctx.fillRect(500, 100, 100, 100);

//-------------------------------------------------------------------------------------------------------------------
// Botão com efeito de hover
const botao = {
    x: 350,
    y: 300,
    width: 200,
    height: 50,
    texto: 'Voltar',
    corBotao: 'blue',
    corHover: 'red',
    corTexto: 'white'
};

// Função para desenhar o botão
function desenharBotao(cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(botao.x, botao.y, botao.width, botao.height);

    // Estilo do texto
    ctx.fillStyle = botao.corTexto;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Desenhar o texto no centro do botão
    ctx.fillText(botao.texto, botao.x + botao.width / 2, botao.y + botao.height / 2);
}

// Função para desenhar a sombra do botão
function desenharSombra(xSombra, ySombra) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas antes de desenhar
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(xSombra, ySombra, botao.width, botao.height); // Sombra deslocada
}

// Função para verificar se o mouse está sobre o botão
function mouseSobreBotao(xMouse, yMouse) {
    return (
        xMouse >= botao.x &&
        xMouse <= botao.x + botao.width &&
        yMouse >= botao.y &&
        yMouse <= botao.y + botao.height
    );
}

// Evento de movimento do mouse para hover
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const xMouse = event.clientX - rect.left;
    const yMouse = event.clientY - rect.top;

    // Limpa o canvas e redesenha a sombra e os elementos
    if (mouseSobreBotao(xMouse, yMouse)) {
        desenharSombra(botao.x - 5, botao.y - 5); // Sombra ajustada ao hover
        desenharBotao(botao.corHover);
    } else {
        desenharSombra(botao.x + 5, botao.y + 5); // Sombra normal
        desenharBotao(botao.corBotao);
    }
});

// Evento de clique no botão
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const xMouse = event.clientX - rect.left;
    const yMouse = event.clientY - rect.top;

    // Verificar se o clique foi no botão
    if (mouseSobreBotao(xMouse, yMouse)) {
        window.location.href = '/web/index.html'; // Redireciona para outra página
    }
});

// Desenhar o botão e a sombra inicial
desenharSombra(botao.x + 5, botao.y + 5); // Sombra inicial
desenharBotao(botao.corBotao);
