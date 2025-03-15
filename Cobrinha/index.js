let cobra = [{x: 10, y: 10},{x: 11, y: 10}]
let posicaoAtual = cobra[0]
let direcaoAtual = "direita"
let tecla = "ArrowRight"
const movimentacao = {
    cima: 'ArrowDown',
    baixo: 'ArrowUp',
    esquerda: 'ArrowLeft',
    direita: 'ArrowRight'
};
let a = 7;

const mapa = document.getElementById('mapa')
const colunas = 20;
const linhas = 20;

criarMapa()

document.addEventListener('keydown', (event) => {
    if (Object.values(movimentacao).includes(event.key)) {
        tecla = event.key;
    }
});

gerarComida()
function gerarComida() {
    let x = Math.floor(Math.random() * (10 - 1) + 1)
    let y = Math.floor(Math.random() * (10 - 1) + 1)
    let z = {x:x, y:y}

    for (let i = 0; i < cobra.length; i++) {
        JSON.stringify(cobra[i]) == JSON.stringify(z) ? gerarComida() : comida = z
    }

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
}

setInterval(movimentar, 1000)

function movimentar() {
    posicaoAtual = cobra[0]
    
    switch (tecla) {
        case movimentacao.cima:
            upper()
            break;
        case movimentacao.baixo:
            down()
            break;
        case movimentacao.esquerda:
            left()
            break;
        case movimentacao.direita:
            right()
            break;
        default:
            break;
    }
    JSON.stringify(cobra[0]) == JSON.stringify(comida) ? comerComida() : cortarRabo()
    console.log(cobra);
    console.log(cobra[0]);
    console.log(comida);
    testarPosicao()
    mostrarCobra()
}

function testarPosicao() {
    if (cobra[0].x < 1 || cobra[0].x > 10 || cobra[0].y < 1 || cobra[0].y > 10) {
        gameOver()
    }
    for (let i = 1; i < cobra.length; i++) {
        if (JSON.stringify(cobra[i]) == JSON.stringify(cobra[0])){
            gameOver()
        } 
    }
}

function gameOver() {
    // alert("perdeu o jogo")
}

function upper() {
    if (direcaoAtual !== "baixo") {
        const xx = (posicaoAtual.x)
        const yy = (posicaoAtual.y) + 1
        cobra.unshift({x: xx, y: yy})
        direcaoAtual = "cima"
    } else{
        down()
    }
}
function down() {  
    if (direcaoAtual !== "cima") {
        const xx = (posicaoAtual.x)
        const yy = (posicaoAtual.y) - 1
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