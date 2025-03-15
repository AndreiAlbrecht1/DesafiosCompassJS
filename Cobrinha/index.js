let cobra = [{x: 1, y: 1}]
let posicaoAtual = cobra[0]
let direcaoAtual = "direita"
let tecla = "ArrowRight"
const movimentacao = {
    cima: 'ArrowUp',
    baixo: 'ArrowDown',
    esquerda: 'ArrowLeft',
    direita: 'ArrowRight'
};

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
}

setInterval(movimentar, 2000)

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
    JSON.stringify(cobra[0]) == JSON.stringify(comida) ? gerarComida() : cobra.pop()
    console.log(cobra);
    console.log(cobra[0]);
    console.log(comida);
    testarPosicao()
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