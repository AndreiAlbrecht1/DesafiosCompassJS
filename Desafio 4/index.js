const input = "pedra"
const opcoes = ["pedra", "papel", "tesoura"]
const escolhaCpu = opcoes[Math.floor(Math.random() * 3)]
console.log(escolhaCpu);


switch (input) {
    case escolhaCpu:
        avisar("empatou")
        break;
    case opcoes[0]:
        escolhaCpu == opcoes[1] ? avisar("perdeu") : avisar("ganhou")
        break;
    case opcoes[1]:
        escolhaCpu == opcoes[2] ? avisar("perdeu") : avisar("ganhou")
        break;
    case opcoes[2]:
        escolhaCpu == opcoes[0] ? avisar("perdeu") : avisar("ganhou")
        break;
    default:
        console.log("Input inválido");    
}

function avisar(texto) {
    console.log("Você " + texto + "!");
}