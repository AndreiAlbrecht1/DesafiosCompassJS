let cobra = [{x: 10, y: 10},{x: 11, y: 10}];
let posicaoAtual = cobra[0]
let direcaoAtual = "direita"
let direcaoTecla = "cima"
let jogoAtivo
const movimentos = ['cima', 'baixo', 'esquerda', 'direita']
const teclasMovimentos = {
    'w': 'cima',
    'ArrowUp': 'cima',
    's': 'baixo',
    'ArrowDown': 'baixo',
    'a': 'esquerda',
    'ArrowLeft': 'esquerda',
    'd': 'direita',
    'ArrowRight': 'direita'
};
const mapa = document.getElementById('mapa')
const colunas = 20;
const linhas = 20;
let score = 0;
let record = 0;
let velocidade = 200;

criarMapa()
document.getElementById('gameRestart').style.display = 'none';
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

document.addEventListener('keydown', (event) => {
    if (teclasMovimentos[event.key]) {
        direcaoTecla = teclasMovimentos[event.key]
        event.preventDefault();
    }
});

function startGame() {
    document.getElementById('gameStart').style.display = 'none';
    gerarComida()
    jogoAtivo = setInterval(movimentar, velocidade)
}

function restartGame() {
    limparMapa()
    score = 0
    atualizarScore()
    velocidade = 200;
    cobra = [{x: 10, y: 10}, {x: 11, y: 10}]
    posicaoAtual = cobra[0]
    direcaoAtual = "direita"
    direcaoTecla = "cima"
    document.getElementById('gameRestart').style.display = 'none';
    startGame();
}

function gameOver() {
    clearInterval(jogoAtivo)
    if (score > record) {
        record = score
        document.getElementById('scoreRecord').textContent = `Record: ${record}`;
    }
    document.getElementById('gameRestart').style.display = 'flex';
    document.getElementById('scoreFinal').textContent = `Seu Score Final: ${score}`
}

function limparMapa() {
    let frutas = document.querySelectorAll('.fruta__mapa')
    frutas.forEach(fruta => {
        fruta.classList.remove('fruta__mapa')
        fruta.classList.add('casa__mapa')
    });

    let partesCobra = document.querySelectorAll('.cobra__mapa'); 
    partesCobra.forEach(parte => {
        parte.classList.remove('cobra__mapa')
        parte.classList.add('casa__mapa')
    });
}

function gerarComida() {
    let x = Math.floor(Math.random() * (20 - 1) + 1)
    let y = Math.floor(Math.random() * (20 - 1) + 1)
    let z = {x:x, y:y}

    for (let i = 0; i < cobra.length; i++) {
        if (JSON.stringify(cobra[i]) === JSON.stringify(z)) {
            return gerarComida();
        }
    }

    comida = z;

    let aux = `${comida.x},${comida.y}`
    let aux2 = document.getElementById(`${aux}`)
    aux2.classList.remove('casa__mapa')
    aux2.classList.add('fruta__mapa')    
}

function comerComida() {
    let aux = `${comida.x},${comida.y}`
    let aux2 = document.getElementById(`${aux}`)
    aux2.classList.remove('fruta__mapa')
    aux2.classList.add('casa__mapa')
    gerarComida()
    score += 1
    atualizarScore()
    aumentarVelocidade()
}

function atualizarScore() {
    document.getElementById('scoreAtual').textContent = `Score atual: ${score}`;
}

function aumentarVelocidade() {
        velocidade *= 0.9
        clearInterval(jogoAtivo)
        jogoAtivo = setInterval(movimentar, velocidade)
}

function movimentar() {
    posicaoAtual = cobra[0]
    switch (direcaoTecla) {
        case movimentos[0]:
            upper()
            break;
        case movimentos[1]:
            down()
            break;
        case movimentos[2]:
            left()
            break;
        case movimentos[3]:
            right()
            break;
        default:
            break;
    }
    JSON.stringify(cobra[0]) == JSON.stringify(comida) ? comerComida() : cortarRabo()
    testarPosicao()
}

function testarPosicao() {
    if (cobra[0].x < 1 || cobra[0].x > colunas || cobra[0].y < 1 || cobra[0].y > linhas) {
        gameOver()
        return
    }
    for (let i = 1; i < cobra.length; i++) {
        if (JSON.stringify(cobra[i]) == JSON.stringify(cobra[0])){
            gameOver()
            return
        } 
    }
    mostrarCobra()
}

function upper() {
    if (direcaoAtual !== "baixo") {
        const xx = (posicaoAtual.x)
        const yy = (posicaoAtual.y) - 1
        cobra.unshift({x: xx, y: yy})
        direcaoAtual = "cima"
    } else{
        down()
    }
}
function down() {  
    if (direcaoAtual !== "cima") {
        const xx = (posicaoAtual.x)
        const yy = (posicaoAtual.y) + 1
        cobra.unshift({x: xx, y: yy})
        direcaoAtual = "baixo"
    } else{
        upper()
    }
}
function right() {
    if (direcaoAtual !== "esquerda") {
        const xx = (posicaoAtual.x) + 1
        const yy = (posicaoAtual.y) 
        cobra.unshift({x: xx, y: yy})
        direcaoAtual = "direita"
    } else {
        left()
    }
}
function left() {
    if (direcaoAtual !== "direita") {
        const xx = (posicaoAtual.x) - 1
        const yy = (posicaoAtual.y) 
        cobra.unshift({x: xx, y: yy})
        direcaoAtual = "esquerda"
    } else {
        right()
    }
}

function criarMapa() {
    let idY = 1
    for (let i = 0; i < linhas; i++) {
        let idX = 1
        for (let i = 0; i < colunas; i++) {
            const casa = document.createElement('div')
            casa.classList.add('casa__mapa')
            casa.id = `${idX},${idY}`
            // casa.textContent = `${idX} , ${idY}`
            mapa.appendChild(casa)
            idX++;
        }
        idY++;
    }
}

function mostrarCobra() {
    let aux = `${cobra[0].x},${cobra[0].y}`
    let aux2 = document.getElementById(`${aux}`)
    aux2.classList.remove('casa__mapa')
    aux2.classList.add('cobra__mapa')
}

function cortarRabo() {
    let aux = `${cobra[cobra.length - 1].x},${cobra[cobra.length - 1].y}`
    let aux2 = document.getElementById(`${aux}`)
    aux2.classList.remove('cobra__mapa')
    aux2.classList.add('casa__mapa')
    cobra.pop()
}