const vetor = [1, 2, 3, 4, 5]
let somaDoVetor = 0

for (let i = 0; i < vetor.length; i++) {
    if (typeof vetor[i] !== 'number') {
        informarValorInvalido()
        return
    } else {
        calcularSomaVetor(vetor[i])
    }
}
function informarValorInvalido() {
    console.log("Valor invalido detectado");
}

function calcularSomaVetor(item) {
    somaDoVetor += item
}

console.log(somaDoVetor)
