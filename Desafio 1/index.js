function somarVetor(vetor) {
    let somaDoVetor = 0
    for (let i = 0; i < vetor.length; i++) {
        if (typeof vetor[i] !== 'number') {
            return 'Valor inválido detectado'
        } else {
            somaDoVetor += vetor[i]
        }
    }
    return somaDoVetor
}

console.log(somarVetor([1, 2, 3, 4, 5]))
console.log(somarVetor([-1, 10, 20]))
console.log(somarVetor([[45, 5, "xpto"]]))